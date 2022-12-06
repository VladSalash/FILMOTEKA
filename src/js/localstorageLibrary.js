const STORAGE_WATCHED_KEY = 'watched-films-lib';
const STORAGE_QUEUE_KEY = 'queue-films-lib';
export const refs = {
  watched: document.querySelector('.data-watched'),
  queue: document.querySelector('.data-queue'),
  gallery: document.querySelector('.card__list-library'),
  emptyWrap: document.querySelector('.library__empty-wrap'),
};
let watchedLibraryList =
  JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY)) ?? [];
let queueLibraryList =
  JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY)) ?? [];
if (refs.watched) {
  refs.watched.addEventListener('click', onLibraryWatchedClick);
}
if (refs.queue) {
  refs.queue.addEventListener('click', onLibraryQueueClick);
}
export function renderLibraryGallery(data) {
  const markupGallery = data
    .map(card => {
      const date = new Date(card.release_date).getFullYear();
      const genre = card.genres.length
        ? card.genres.map(genre => genre.name).join(', ')
        : 'Unknown';
      return `
      <li class="card__item" data-id="${card.id}">
      <img class="card__img"  src="https://image.tmdb.org/t/p/w500/${
        card.poster_path
      }" alt="${card.title}" data-id="${card.id}"/>
       
       <h2 class="card__title"data-id="${card.id}">${card.title}</h2>
        <p class="card__text"data-id="${card.id}">${
        genre.length ? genre : 'Unknown'
      } | ${date} </p>
    </li>`;
    })
    .join('');
  if (refs.gallery) {
    refs.gallery.innerHTML = markupGallery;
  }
}
if (refs.gallery) {
  if (watchedLibraryList.length !== 0) {
    renderLibraryGallery(watchedLibraryList);
    if (refs.emptyWrap) {
      refs.emptyWrap.classList.add('hidden-nothing');
    } else {
      refs.gallery.innerHTML = '';
      refs.emptyWrap.classList.remove('hidden-nothing');
    }
  }
}
function onLibraryWatchedClick(evt) {
  refs.watched.classList.add('active_btn');
  refs.queue.classList.remove('active_btn');
  // watchedLibraryList =
  //   JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY)) ?? [];
  if (watchedLibraryList.length !== 0) {
    renderLibraryGallery(watchedLibraryList);
    refs.emptyWrap.classList.add('hidden-nothing');
  } else {
    refs.gallery.innerHTML = '';
    refs.emptyWrap.classList.remove('hidden-nothing');
  }
}
function onLibraryQueueClick(evt) {
  refs.watched.classList.remove('active_btn');
  refs.queue.classList.add('active_btn');
  // queueLibraryList = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
  if (queueLibraryList.length !== 0) {
    renderLibraryGallery(queueLibraryList);
    refs.emptyWrap.classList.add('hidden-nothing');
  } else {
    refs.gallery.innerHTML = '';
    refs.emptyWrap.classList.remove('hidden-nothing');
  }
}
