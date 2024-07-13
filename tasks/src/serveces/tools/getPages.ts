export const getPages = (count: number) => {
  const totalPages = Math.ceil(count / 10);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  return pageNumbers;
};
