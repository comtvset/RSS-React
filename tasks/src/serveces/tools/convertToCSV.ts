import { Person } from 'src/pages/mainPage/MainPage';

export const convertToCSV = (data: Person[]): string => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(', '));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header as keyof Person]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(', '));
  }

  return csvRows.join('\n');
};
