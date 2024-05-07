//원하는 제목의 영화만 검색(필터링)
const $main_cards = document.querySelector('.main__cards');
const filterResults = [];

export function handleForm(e) {
    e.preventDefault();
    let text = e.target[0].value;

    if (text.trim() === '') return; // 빈 검색어 제거
    filterResults.length = 0;

    const $cards = document.querySelectorAll('.card');
    $cards.forEach((card) => {
        let search = card.children[1].textContent.toLowerCase();

        if (search.includes(text.toLowerCase())) {
            card.style.display = 'block';
            filterResults.push(card);
        } else card.style.display = 'none';
    });
}

//라디오 필터링


let sortChoice = document.querySelector('.sortForm');
function sortClick(event) {
    if (event.target.classList.contains('form-check-input')) {
        sortFilter(event.target.id);

    }
}
sortChoice.addEventListener('click', sortClick);
//라디오그룹1 클릭이벤트

function compareMovie(compareTarget) {
    if (filterResults.length === 0) {
        filterResults.push(...Array.from($main_cards.querySelectorAll('.card')));
    }

    const sortedMovieArr = filterResults.slice().sort((a, b) => {
        const targetA = a.querySelector(`${compareTarget}`).textContent.toLowerCase();
        const targetB = b.querySelector(`${compareTarget}`).textContent.toLowerCase();

        if (compareTarget === '.review') {
            // 내림차순(평점순)
            if (targetA > targetB) return -1;
            if (targetA < targetB) return 1;
            return 0;
        } else {
            // 오름차순(인기, 이름)
            // console.log(compareTarget + '1');
            if (targetA < targetB) return -1;
            if (targetA > targetB) return 1;
            return 0;
        }
    });
    return sortedMovieArr;
}

//라디오그룹1
function sortFilter(value) {
    switch (value) {
        //인기순
        case 'RadioDefaultFirst1':
            let tempArr1 = compareMovie('.popularity');
            document.querySelectorAll('.card').forEach((card) => {
                card.parentNode.removeChild(card);
            });
            tempArr1.forEach((card) => {
                $main_cards.appendChild(card);
            });
            break;

        //평점순
        case 'RadioDefaultFirst2':
            let tempArr2 = compareMovie('.review');
            document.querySelectorAll('.card').forEach((card) => {
                card.parentNode.removeChild(card);
            });
            tempArr2.forEach((card) => {
                $main_cards.appendChild(card);
            });
            break;

        //제목순
        case 'RadioDefaultFirst3':
            let tempArr3 = compareMovie('.movieTitle');
            document.querySelectorAll('.card').forEach((card) => {
                card.parentNode.removeChild(card);
            });
            tempArr3.forEach((card) => {
                $main_cards.appendChild(card);
            });
            break;
    }
}

//라디오그룹2
let yearChoice = document.querySelector('.yearForm');
function yearClick(event) {
    if (event.target.classList.contains('form-check-input')) {
        yearFilter(event.target.id);
    }
}
yearChoice.addEventListener('click', yearClick);

function yearFilter(value) {
    switch (value) {
        case 'RadioDefaultSecond1':
            filterResults.forEach((item) => {
                item.style.display = 'block';
            });
            break;
        //전체년도

        case 'RadioDefaultSecond2':
            filterResults.forEach((item) => {
                let tempValue = item
                    .querySelector('.movieReleaseDate')
                    .textContent.slice(0, 4);
                if (tempValue >= 2024) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            break;
        //2024년 이후

        case 'RadioDefaultSecond3':
            filterResults.forEach((item) => {
                let tempValue = item
                    .querySelector('.movieReleaseDate')
                    .textContent.slice(0, 4);
                if (tempValue < 2024) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            break;
        //2024년 이전
    }
}
//라디오그룹2 년도순 필터링!
