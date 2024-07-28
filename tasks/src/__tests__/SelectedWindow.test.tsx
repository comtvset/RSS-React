import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectedWindow } from 'src/components/SelectedWindow/SelectedWindow';
import { useSelector } from 'react-redux';
import { convertToCSV } from 'src/serveces/tools/convertToCSV';
import { downloadCSV } from 'src/serveces/tools/downloadCSV';
import { ThemeContext } from 'src/context/ThemeContext';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('src/store/checkedCardSlice', () => ({
  clearCheckedCard: vi.fn(),
}));

vi.mock('src/serveces/tools/convertToCSV', () => ({
  convertToCSV: vi.fn().mockReturnValue('mock-csv'),
}));

vi.mock('src/serveces/tools/downloadCSV', () => ({
  downloadCSV: vi.fn(),
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
  it('should call convertToCSV and downloadCSV when "Download" button is clicked', () => {
    vi.mocked(useSelector).mockReturnValue(['item1', 'item2', 'item3']);

    const mockConvertToCSV = vi.mocked(convertToCSV);
    const mockDownloadCSV = vi.mocked(downloadCSV);

    render(
      <ThemeContext.Provider
        value={{
          theme: 'dark',
          themeStyles: {
            selectedContainer: 'mock-selected-container',
            btn: 'mock-btn',
          },
          toggleTheme: vi.fn(),
        }}
      >
        <SelectedWindow />
      </ThemeContext.Provider>,
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(mockConvertToCSV).toHaveBeenCalledWith(['item1', 'item2', 'item3']);
    expect(mockDownloadCSV).toHaveBeenCalledWith('mock-csv', '3_items(StarWars).csv');
  });
});
