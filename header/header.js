import { getTopFiveMovie } from '../js/movie.js';

const $swiper = new Swiper('.swiper-container', {
    // direction: 'vertical',
    loop: true,
    speed: 200,
    pagination: {
        el: '.swiper-pagination',
        // type: 'bullets',
    },
    disableOnInteraction: false,
    allowTouchMove: false,
    autoplay: {
        delay: 2000,
    },
});

const movies = getTopFiveMovie();
movies.then((movies) => {
    movies.forEach((movie) => {
        const {
            backdrop_path: imgSrc,
            title,
            id,
            overview: content,
            vote_average: review,
            release_date: release,
        } = movie;
        createMovieBanner({ imgSrc, title, id, content, review, release });
    });
});

const createMovieBanner = ({ imgSrc, title, id, content, review, release }) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.id = id;

    // imgUrl = baseURl + fileSize + filepath
    //https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original/${imgSrc}`;
    img.alt = '영화이미지';
    img.classList.add('header__movieImg');

    // 이미지 제외 담기
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('contentWrapper');

    const titleElem = document.createElement('h2');
    titleElem.textContent = title;
    titleElem.classList.add('header__movieTitle');

    const reviewElem = document.createElement('p');
    reviewElem.textContent = `⭐️ ${review.toFixed(1)} / 10`;
    reviewElem.classList.add('header__review');

    const contentElem = document.createElement('p');
    contentElem.textContent = content;
    contentElem.classList.add('header__movieContent');

    const releaseDateElem = document.createElement('p');
    releaseDateElem.textContent = release;
    releaseDateElem.classList.add('header__movieReleaseDate');

    slide.appendChild(img);

    contentWrapper.appendChild(titleElem);
    contentWrapper.appendChild(releaseDateElem);
    contentWrapper.appendChild(reviewElem);
    contentWrapper.appendChild(contentElem);

    slide.appendChild(contentWrapper);
    $swiper.appendSlide(slide);
};
