export default function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error status ${response.status}`);
    })
    .then(data => data);
}