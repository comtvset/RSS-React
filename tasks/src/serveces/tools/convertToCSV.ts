import { Person } from 'src/pages/mainPage/MainPage';

export const convertToCSV = (data: Person[]): Blob => {
  if (data.length === 0) return new Blob([], { type: 'text/csv;charset=utf-8;' });

  const header = `${Object.keys(data[0]).join(',')}\n`;
  const information = data.map((item) => Object.values(item).join(',')).join('\n');
  const wholeInfo = header + information;

  return new Blob([wholeInfo], { type: 'text/csv;charset=utf-8;' });
};
