const $videos = document.querySelector('.videos');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
    },
};

// 개봉예정 영화 영상
async function getUpcommingVideoIDs() {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
        options
    );
    // const response = await fetch('../assets/upcomming.json');
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

getUpcommingVideoIDs().then((arr) => {
    arr.forEach((movieId) => getMovieVideos(movieId));
});

const createVideoCard = (videoId) => {
    const videoCard = document.createElement('iframe');
    videoCard.src = `https://www.youtube.com/embed/${videoId}`;
    videoCard.classList.add('videoCard');
    $videos.appendChild(videoCard);
};
