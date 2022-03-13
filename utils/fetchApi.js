import axios from 'axios';

export const baseURL = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '6d9a1cfaa6msh12b311709eef649p1d5cffjsn7eb8641e8078',
    },
  });
  return data;
};
