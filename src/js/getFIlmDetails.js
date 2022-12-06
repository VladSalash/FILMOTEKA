import axios from 'axios';

export async function getApiDetails(id) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${id}`;
  const params = {
    api_key: '7f524807c48f906ff0108130fa25f727',
    append_to_response: 'videos',
  };

  const resolve = await axios(BASE_URL, { params });
  return resolve;
}
