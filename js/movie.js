//영화 정보를 가져와서 ui에 리스팅
const $cardContainer = document.querySelector('.cardContainer');

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization:
//             'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
//     },
// };

// 영화 데이터만 가져옴 (API)
// export async function fetchMovies() {
//     const response = await fetch(
//         'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
//         options
//     );
//     const { results } = await response.json();
//     return results;
// }

// 영화 데이터만 가져옴 (mockData)
async function fetchMovies() {
    const response = await fetch('./assets/popularMovies.json');
    const { results } = await response.json();
    return results;
}

// 영화(array) 가져와서 html에 뿌려주기
export async function printMovieCard() {
    try {
        const movies = await fetchMovies(); // array(20)
        movies.forEach((movie) => {
            const {
                poster_path: imgSrc,
                title,
                vote_average: content,
                id,
                release_date: releaseDate,
                popularity,
            } = movie;
            createMovieCard({ imgSrc, title, content, id, releaseDate, popularity});
            // console.log(movie);
        });
    } catch (e) {
        console.log('error of createMovieCard : ', e);
    }
}

// header에 사용할 최신 영화 5가지
export async function getTopFiveMovie() {
    try {
        const movies = await fetchMovies();
        return movies.slice(0, 5);
    } catch (e) {
        console.log('error of getTopFiveMovie :', e);
    }
}

const createMovieCard = ({ imgSrc, title, content, id, releaseDate, popularity}) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = id;

    // imgUrl = baseURl + fileSize + filepath
    //https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original/${imgSrc}`;
    img.alt = '영화이미지';
    img.classList.add('movieImg');

    const titleElem = document.createElement('h2');
    titleElem.textContent = title;
    titleElem.classList.add('movieTitle');

    const contentElem = document.createElement('p');
    contentElem.textContent = `${content.toFixed(1)} / 10`;
    contentElem.classList.add('movieContent');

    const releaseDateElem = document.createElement('p');
    releaseDateElem.textContent = releaseDate;
    releaseDateElem.classList.add('movieReleaseDate');

    const popularityElem = document.createElement('p');
    popularityElem.textContent = popularity;
    popularityElem.classList.add('popularity');
    popularityElem.style.display = "none";

    card.appendChild(img);
    card.appendChild(titleElem);
    card.appendChild(contentElem);
    card.appendChild(releaseDateElem);
    card.appendChild(popularityElem);

    $cardContainer.appendChild(card);

    card.addEventListener('click', clickCard); // 이벤트 버블링
};

const clickCard = (e) => {
    console.log(e);
    alert(e.currentTarget.id);
};