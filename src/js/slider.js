const refs = {
  lisrTopFilms: document.querySelector('.swiper-wrapper'),
  // item: document.querySelectorAll('.glide__slide'),
};

if (!refs.lisrTopFilms) {
  return;
}

const API_KEY = '77e7936073a1f82fbc0d3a17a985fb5b';
const URL = 'https://api.themoviedb.org/3';
const API_URL = `${URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG = 'https://image.tmdb.org/t/p/w500';

async function getMovies() {
  await fetch(API_URL)
    .then(res => {
      return res.json();
    })
    .then(res => {
      render(res.results);
    });
}
getMovies();

async function render(data) {
  const listCardMovies = data
    .map(item => {
      const cardMovies = !item.poster_path
        ? `<div class="swiper-slider__wrapper swiper-slide">
  <img
    class="slide-img"
    src="./image/card.jpg" alt="${item.title}" data-id='${item.id}'
    width="200"
  />
</div>`
        : `<div class="swiper-slider__wrapper swiper-slide">
  <img
    class="slide-img"
   src="${IMG}${item.poster_path}" alt="${item.title}" data-id='${item.id}'
    width="200"
  />
</div>`;
      return cardMovies;
    })
    .join(' ');

  refs.lisrTopFilms.insertAdjacentHTML('beforeend', listCardMovies);

  new Swiper('.swiper', {
    disableOnInteraction: true,
    slidesPerView: 9,
    slidesPerGroup: 1,
    spaceBetween: 65,
    speed: 4000,
    centralSlides: true,
    loop: true,

    grabCursor: true,
    effect: 'coverflow',
    coverflowEffect: {
      depth: 70,
      rotate: 8,
      stretch: 50,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      deley: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed: 800,
    freeMode: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    loopedSlides: 12,
    preloadImages: false,
    lazy: {
      loadOnTransitionStart: false,
      loadPrewNext: false,
    },

    breakpoints: {
      768: {
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 60,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1200: {
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 65,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1500: {
        loop: true,
        slidesPerView: 6,
        slidesPerGroup: 1,
        spaceBetween: 58,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
    },
  });
}
