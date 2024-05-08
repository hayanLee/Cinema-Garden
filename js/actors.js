const $actors = document.querySelector('.actors');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
    },
};

async function getActorsImg() {
    try {
        // const response = await fetch(
        //     'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
        //     options
        // );
        const response = await fetch('../assets/actors.json');
        const { results } = await response.json();
        const data = results.map((person) => {
            return {
                name: person.name,
                profile: person.profile_path,
            };
        });
        return data;
    } catch (e) {
        console.error('Error of getActorsImg :', e);
    }
}

async function displayActors() {
    try {
        const actors = await getActorsImg();
        actors.forEach((actor) => {
            createActorCard(actor);
        });
    } catch (e) {
        console.error('Error of displayActors:', e);
    }
}

const createActorCard = ({ name, profile }) => {
    const card = document.createElement('div');
    card.classList.add('actor');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${profile}`;
    img.alt = '배우이미지';
    img.classList.add('actorImg');

    const actorName = document.createElement('h4');
    actorName.textContent = name;
    actorName.classList.add('name');

    card.appendChild(img);
    card.appendChild(actorName);

    $actors.appendChild(card);
};

displayActors();
