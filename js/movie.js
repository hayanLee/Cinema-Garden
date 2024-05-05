//영화 정보를 가져와서 ui에 리스팅
// const $cardContainer = document.querySelector('.cardContainer');
const $main_cards = document.querySelector('.main__cards');
const $videos = document.querySelector('.videos');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
    },
};

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
    // const response = await fetch('./assets/popularMovies.json'); // main index
    const response = await fetch('../assets/popularMovies.json'); // header 확인하려면 이거로 하시면 됩니다
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

    const review = document.createElement('p');
    review.textContent = `⭐️ ${content.toFixed(1)} / 10`;
    review.classList.add('review');

    const releaseDateElem = document.createElement('p');
    releaseDateElem.textContent = releaseDate;
    releaseDateElem.classList.add('movieReleaseDate');

    const popularityElem = document.createElement('p');
    popularityElem.textContent = popularity;
    popularityElem.classList.add('popularity');
    popularityElem.style.display = "none";

    card.appendChild(img);
    card.appendChild(titleElem);
    card.appendChild(review);
    card.appendChild(releaseDateElem);
    card.appendChild(popularityElem);

    // $cardContainer.appendChild(card);
    $main_cards.appendChild(card);

    card.addEventListener('click', clickCard); // 이벤트 버블링
};

// 개봉예정 영화 영상
async function getUpcommingVideoIDs() {
    // const response = await fetch(
    //     `https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1`,
    //     options
    // );
    const response = await fetch('../assets/upcomming.json');
    const { results } = await response.json();
    const videoIDs = results.map((video) => video.id);
    return videoIDs;
}

async function getMovieVideos(movieId) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko`,
        options
    );
    const { results } = await response.json();
    const teaser = results.filter(
        (data) => data.type === 'Teaser' || data.type === 'Trailer'
    );

    if (teaser.length > 0) {
        // console.log(teaser[teaser.length - 1]);
        createVideoCard(teaser[teaser.length - 1].key);
    }
}

const videoIDs = getUpcommingVideoIDs(); // 비디오 아이디 배열
videoIDs.then((arr) => {
    arr.forEach((movieId) => getMovieVideos(movieId));
});

const createVideoCard = (videoId) => {
    const videoCard = document.createElement('iframe');
    videoCard.src = `https://www.youtube.com/embed/${videoId}`;
    videoCard.classList.add('videoCard');
    $videos.appendChild(videoCard);
};

const clickCard = (e) => {
    //카드 이벤트
    alert(e.currentTarget.id);
};
