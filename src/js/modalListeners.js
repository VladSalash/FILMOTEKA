import { modal } from './modalRender';
import { getApiDetails } from './getFIlmDetails';
import { renderLibraryGallery } from './localstorageLibrary';
import { refs } from './localstorageLibrary';
export const STORAGE_WATCHED_KEY = 'watched-films-lib';
export const STORAGE_QUEUE_KEY = 'queue-films-lib';
const cardList = document.querySelector('.card__list');
const cardListSlider = document.querySelector('.swiper-wrapper');
const emptyWrap = document.querySelector('.library__empty-wrap');
const cardListLibrary = document.querySelector('.card__list-library');
let responseCardDetails = null;
let watchedStorage = [];
let queueStorage = [];
if (JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY))) {
  watchedStorage = JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY));
}
if (JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY))) {
  queueStorage = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
}

if (cardList) {
  cardList.addEventListener('click', onClickCard);
}
if (cardListSlider) {
  cardListSlider.addEventListener('click', onClickCard);
}
if (cardListLibrary) {
  cardListLibrary.addEventListener('click', onClickCard);
}
export async function onClickCard(evt) {
  const cardId = evt.target.dataset.id;
  if (cardId) {
    responseCardDetails = await getApiDetails(cardId);

    modal(responseCardDetails.data);

    document.body.style.overflow = 'hidden';

    const buttonWatched = document.querySelector('#library-wathed');
    const buttonQueue = document.querySelector('#library-queue');
    const firebaseAcces = JSON.parse(localStorage.getItem('my-loginUser'));

    if (!firebaseAcces) {
      buttonWatched.style.display = 'none';
      buttonQueue.style.display = 'none';
    }
    if (
      watchedStorage.length !== 0 &&
      watchedStorage.find(film => {
        return +responseCardDetails.data.id === +film.id;
      })
    ) {
      buttonWatched.textContent = 'REMOVE FROM WATCHED';
      buttonWatched.classList.add('remove');
    }
    if (
      queueStorage.length !== 0 &&
      queueStorage.find(film => {
        return +responseCardDetails.data.id === +film.id;
      })
    ) {
      buttonQueue.textContent = 'REMOVE FROM QUEUE';
      buttonQueue.classList.add('remove');
    }
    const modalOverlay = document.querySelector('.backdrop');
    modalOverlay.addEventListener('click', onClickModal);
    document.addEventListener('keydown', keyDown);
  }
}
export function onClickModal(evt) {
  const modalOverlay = document.querySelector('.backdrop');
  if (evt.target === modalOverlay) {
    modalOverlay.remove();
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', keyDown);
  }
}
export function onBtnCloseClick() {
  const modalBackdrop = document.querySelector('.backdrop');
  modalBackdrop.remove();
  document.body.style.overflow = 'visible';
}
export function keyDown(evt) {
  const modalOverlay = document.querySelector('.backdrop');
  document.addEventListener('keydown', keyDown);
  if (evt.key === 'Escape') {
    modalOverlay.remove();
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', keyDown);
  }
}
export function onWatchedClick(evt) {
  const button = evt.currentTarget;
  button.textContent = 'REMOVE FROM WATCHED';
  button.classList.add('remove');

  if (watchedStorage.length !== 0) {
    let findFilm = watchedStorage.find(film => {
      return +responseCardDetails.data.id === +film.id;
    });
    if (findFilm) {
      const filtredFilms = watchedStorage.filter(film => {
        return +responseCardDetails.data.id !== +film.id;
      });
      watchedStorage = filtredFilms;
      if (
        watchedStorage.length !== 0 &&
        refs.watched.classList.contains('active_btn')
      ) {
        renderLibraryGallery(watchedStorage);
      } else if (watchedStorage.length !== 0 || watchedStorage.length === 0) {
        renderLibraryGallery(queueStorage);
      } else {
        if (cardListLibrary) {
          cardListLibrary.innerHTML = '';
          emptyWrap.classList.remove('hidden-nothing');
        }
      }
      localStorage.setItem(STORAGE_WATCHED_KEY, JSON.stringify(watchedStorage));
      const buttonWatched = document.querySelector('#library-wathed');
      buttonWatched.textContent = 'ADD TO WATCHED';
      buttonWatched.classList.remove('remove');
      return;
    }
    watchedStorage.push(responseCardDetails.data);
    localStorage.setItem(STORAGE_WATCHED_KEY, JSON.stringify(watchedStorage));
    return;
  }
  watchedStorage.push(responseCardDetails.data);
  localStorage.setItem(STORAGE_WATCHED_KEY, JSON.stringify(watchedStorage));
}
export function onQueueClick(evt) {
  const button = evt.currentTarget;
  button.textContent = 'REMOVE FROM QUEUE';
  button.classList.add('remove');
  if (queueStorage.length !== 0) {
    let findFilm = queueStorage.find(film => {
      return +responseCardDetails.data.id === +film.id;
    });
    if (findFilm) {
      const filtredFilms = queueStorage.filter(film => {
        return +responseCardDetails.data.id !== +film.id;
      });
      queueStorage = filtredFilms;
      if (
        queueStorage.length !== 0 &&
        refs.queue.classList.contains('active_btn')
      ) {
        renderLibraryGallery(queueStorage);
      } else if (queueStorage.length !== 0 || queueStorage.length === 0) {
        renderLibraryGallery(watchedStorage);
      } else {
        if (cardListLibrary) {
          cardListLibrary.innerHTML = '';
          emptyWrap.classList.remove('hidden-nothing');
        }
      }
      localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queueStorage));
      const buttonQueue = document.querySelector('#library-queue');
      buttonQueue.textContent = 'ADD TO QUEUE';
      buttonQueue.classList.remove('remove');
      return;
    }
    queueStorage.push(responseCardDetails.data);
    localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queueStorage));
    return;
  }
  queueStorage.push(responseCardDetails.data);
  localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queueStorage));
}
