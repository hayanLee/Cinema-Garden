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

// API
// export function getMovies() {
//     return fetch(
//         'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
//         options
//     )
//         .then((response) => response.json())
//         .then((res) => res.results)
//         .then((movies) => {
//             movies.forEach((movie) => {
//                 const { backdrop_path: imgSrc, title, overview: content, id } = movie;
//                 createMovieCard(imgSrc, title, content, id);
//             });
//         })
//         .catch((err) => console.error(err));
// }

// mockData
export function getMovies() {
    return fetch('./assets/popularMovies.json')
        .then((response) => response.json())
        .then((response) => response.results)
        .then((movies) => {
            movies.forEach((movie) => {
                console.log(movie);
                const { backdrop_path: imgSrc, title, vote_average: content, id, release_date: releaseDate } = movie;
                // console.log(content);
                createMovieCard({ imgSrc, title, content, id , releaseDate});
            });
        })
        .catch((err) => console.error(err));
}

const createMovieCard = ({ imgSrc, title, content, id ,releaseDate}) => {
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
    contentElem.textContent = content;
    contentElem.classList.add('movieContent');

    const releaseDateElem = document.createElement('p');
    releaseDateElem.textContent = releaseDate;
    releaseDateElem.classList.add('releaseDate');

    card.appendChild(img);
    card.appendChild(titleElem);
    card.appendChild(contentElem);
    card.appendChild(releaseDateElem);

    $cardContainer.appendChild(card);

    card.addEventListener('click', clickCard); // 이벤트 버블링
};

const clickCard = (e) => {
    alert(e.currentTarget.id);
};
