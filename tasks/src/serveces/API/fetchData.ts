export const fetchData = async (query: string = '', page: string = '1') => {
  const url = `https://swapi.dev/api/people/?search=${query}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    error;
  }
};
