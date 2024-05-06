import { printMovieCard } from './movie.js';
import { handleForm } from './search.js';
const $searchForm = document.querySelector('.searchForm');
const $input = document.querySelector('.searchForm__input');
const $logo = document.querySelector('.header__head > .title');
const $header = document.querySelector('.header__head');
const $uptoBtn = document.querySelector('.uptoBtn');
// const $uptoBtn = document.querySelector('.uptoBtn');

printMovieCard(); // movie module

// document.addEventListener('DOMContentLoaded', () => $input.focus());
$logo.addEventListener('click', () => {
    window.location.reload();
});

$uptoBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

function scrollEvent(e) {
    const STANDARD = 600;

    if (window.scrollY > STANDARD) {
        // 내려갈 때
        $uptoBtn.classList.add('show');
        $header.classList.add('bg');
    } else {
        // 올라갈 때
        $uptoBtn.classList.remove('show');
        $header.classList.remove('bg');
    }
}

window.addEventListener('scroll', scrollEvent);
$searchForm.addEventListener('submit', handleForm);
