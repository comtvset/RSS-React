import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectedWindow } from 'src/components/SelectedWindow/SelectedWindow';
import { useDispatch, useSelector } from 'react-redux';
import { convertToCSV } from 'src/serveces/tools/convertToCSV';

window.URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
window.URL.revokeObjectURL = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: vi.fn().mockReturnValue(vi.fn()),
  useSelector: vi.fn(),
}));

vi.mock('src/serveces/tools/convertToCSV', () => ({
  convertToCSV: vi
    .fn()
    .mockReturnValue(new Blob(['mock-csv'], { type: 'text/csv;charset=utf-8;' })),
}));

vi.mock('src/context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({
    themeStyles: {
      selectedContainer: 'mock-selected-container',
      btn: 'mock-btn',
    },
  }),
}));

describe('SelectedWindow component', () => {
  it('should call convertToCSV and set CSV URL when "Download" link is rendered', () => {
    const mockCheckedCard = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' },
      { id: 3, name: 'item3' },
    ];
    vi.mocked(useSelector).mockReturnValue(mockCheckedCard);

    const mockDispatch = vi.mocked(useDispatch);
    const mockClearCheckedCard = vi.fn();
    mockDispatch.mockReturnValue(mockClearCheckedCard);

    const mockConvertToCSV = vi.mocked(convertToCSV);

    render(<SelectedWindow />);

    expect(mockConvertToCSV).toHaveBeenCalledWith(mockCheckedCard);

    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toHaveAttribute('href', 'mock-url');
    expect(downloadLink).toHaveAttribute(
      'download',
      `${mockCheckedCard.length}_items(StarWars).csv`,
    );
  });

  it('should call clearCheckedCard when "Unselect all" button is clicked', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    const mockDispatch = vi.mocked(useDispatch);
    const mockClearCheckedCard = vi.fn();
    mockDispatch.mockReturnValue(mockClearCheckedCard);

    render(<SelectedWindow />);

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(mockClearCheckedCard).toHaveBeenCalled();
  });
});
