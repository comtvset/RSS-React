export const fetchData = async (query: string) => {
  const url = `https://swapi.dev/api/people/?search=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    error;
    // console.error('Error fetching data:', error);
  }
};
