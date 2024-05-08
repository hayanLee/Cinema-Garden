const searchParams = new URLSearchParams(window.location.search);
const movieId = searchParams.get('id');
const $title = document.querySelector('.title');

$title.addEventListener('click', () => {
    history.back();
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjk3N2Y3YTQ3Yzk3NmUxYTVmNWU2Y2I4ZDBlNjAwYyIsInN1YiI6IjY2Mjc4NjhiN2E5N2FiMDE3ZDkwNzQ2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOqSjl5d1Kbsca643s7j_azxcKsFEZ4lOjo_Fz__6UY',
    },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options) // id값 바꾸기
    .then((response) => response.json())
    .then((movie) => {
        // 영화 정보 채우기
        const moviePhoto = document.querySelector('.movie-photo');
        moviePhoto.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`; // 영화 사진

        const movieTitle = document.querySelector('.movie-title');
        movieTitle.textContent = movie.title; // 영화 제목

        const storyline = document.querySelector('.storyline');
        storyline.textContent = movie.overview; // 영화 개요

        const movieContent = document.querySelector('.movie-content');
        movieContent.textContent = `${movie.vote_average} / 10`; // 평점

        const movieGenre = document.querySelector('.movie-genre');
        movieGenre.textContent = movie.genres.map((genre) => genre['name']); // 장르 name 꺼내야함

        const releaseYear = document.querySelector('.release-year');
        releaseYear.textContent = movie.release_date; // 개봉 년도
    })
    .catch((err) => console.error(err));
