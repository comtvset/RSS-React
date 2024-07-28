import { describe, it, expect, vi } from 'vitest';
import { downloadCSV } from 'src/serveces/tools/downloadCSV';

describe('downloadCSV', () => {
  it('should create a hidden link and trigger a download', () => {
    const createObjectURLMock = vi.fn(() => 'blob:url');
    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    const clickMock = vi.fn();

    window.URL.createObjectURL = createObjectURLMock;
    document.body.appendChild = appendChildMock;
    document.body.removeChild = removeChildMock;

    const aMock = {
      setAttribute: vi.fn(),
      click: clickMock,
    } as unknown as HTMLAnchorElement;

    vi.spyOn(document, 'createElement').mockReturnValueOnce(aMock);

    const csvContent = 'name,age\nJohn,30\nDoe,25';
    const filename = 'test.csv';

    downloadCSV(csvContent, filename);

    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(aMock.setAttribute).toHaveBeenCalledWith('hidden', '');
    expect(aMock.setAttribute).toHaveBeenCalledWith('href', 'blob:url');
    expect(aMock.setAttribute).toHaveBeenCalledWith('download', filename);
    expect(appendChildMock).toHaveBeenCalledWith(aMock);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalledWith(aMock);
  });
});
