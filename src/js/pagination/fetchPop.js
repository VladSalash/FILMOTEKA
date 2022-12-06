import NewApi from './fetch-movies-homepg';
import { markupMovies } from './ddd';
import { pagination } from './pagination';
import { FetchMoviesAPI } from './fetchMoviesAPI';
import { onSearchPaginationClick } from './search-movies';

export const APIEndPoints = {
  trendingMovie: '/3/trending/movie/day',
  searchMovie: '/3/search/movie',
  movieDetails: `/3/movie/`,
};

const fetchTrandingMovieAPI = new FetchMoviesAPI(APIEndPoints.trendingMovie);

const newApi = new NewApi();
const refs = {
  gallery: document.querySelector('.card__list'),
};

export async function appendMarkupMovies() {
  let response;

  try {
    response = await newApi.fetchMovies();
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      markupMovies(response.data.results)
    );
  } catch (error) {
    console.log(error.message);
  }
  return response.data;
}

appendMarkupMovies().then(data => {
  const paginationItemsContainer = document.querySelector(
    '.pagination-container'
  );

  paginationItemsContainer.innerHTML = '';

  paginationItemsContainer.removeEventListener(
    'click',
    onSearchPaginationClick
  );
  paginationItemsContainer.addEventListener('click', onTrendingPaginationClick);
  pagination(data.page, data.total_pages);
});

export async function onTrendingPaginationClick({ target }) {
  if (
    target.nodeName === 'UL' ||
    target.classList.contains('disabled') ||
    Number(target.textContent) === fetchTrandingMovieAPI.page
  ) {
    return;
  }

  fetchTrandingMovieAPI.page = globalCurrentPage;
  let response;

  try {
    response = await fetchTrandingMovieAPI.fetchMovies();
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  const galleryMarkup = markupMovies(response.data.results);
  // clearGalleryMarkup();
  renderGalleryMarkup(galleryMarkup);

  pagination(response.data.page, response.data.total_pages);
}

function renderGalleryMarkup(markup) {
  refs.gallery.innerHTML = markup;
}

// ---------------------not open

//   refs.gallery.insertAdjacentHTML('beforeend', markup);

// -------Функция удаления разметки галлереи-------

// function clearGalleryMarkup() {
//   refs.gallery.innerHTML = '';
// }
