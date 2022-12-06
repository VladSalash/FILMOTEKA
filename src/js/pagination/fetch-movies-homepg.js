import axios from 'axios';

const KEY = '77e7936073a1f82fbc0d3a17a985fb5b';
const URL = 'https://api.themoviedb.org';

export default class NewApi {
  constructor() {
    this.page = 1;
  }

  async fetchMovies() {
    const response = await axios.get(
      `${URL}/3/trending/movie/week?api_key=${KEY}&page=1`
    );
    this.incrementPage();

    return response;
  }
  incrementPage() {
    this.page += 1;
  }
}
