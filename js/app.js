import { getMovies } from './movie.js';
import { handleForm } from './search.js';
const $searchForm = document.querySelector('.searchForm');
const $input = document.querySelector('.searchForm__input');
const $header = document.querySelector('.header > h1');
const $uptoBtn = document.querySelector('.uptoBtn');

getMovies(); // movie module

document.addEventListener('DOMContentLoaded', () => $input.focus());
$header.addEventListener('click', () => {
    window.location.reload();
});
$uptoBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
$searchForm.addEventListener('submit', handleForm);
