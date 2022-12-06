import axios from 'axios';

const KEY = '77e7936073a1f82fbc0d3a17a985fb5b';
const URL = 'https://api.themoviedb.org';





export class FetchMoviesAPI {
  constructor(endPoint, query = '') {
    this.apiKey = KEY;
    axios.defaults.baseURL = URL;
    this._endPoint = endPoint;
    this._query = query;
    this._page = 1;
  }
  

  async fetchMovies() {
    const defaultQueryParams = `?api_key=${KEY}&page=${this._page}&qery=${this._query}&include_adult=false`;

    const response = await axios(`${this._endPoint}${defaultQueryParams}`);

    return response;
  }

  incrementPage() {
    this._page++;
  }

  decrementPage() {
    this._page--;
  }

  get endPoint() {
    return this._endPoint;
  }

  set endPoint(newEndPoint) {
    this._endPoint = newEndPoint;
  }

  get query() {
    return this._query;
  }

  set query(newQuery) {
    this._query = newQuery;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
