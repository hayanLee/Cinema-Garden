const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const buttonText = document.querySelector('.button-text');
const box = document.getElementById('box');
const icon = document.querySelector('.icon');

function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  box.classList.toggle('dark-mode');
  darkModeToggle.classList.toggle('toggled');
  icon.classList.toggle('light-mode');
  icon.classList.toggle('dark-mode');

  // 클릭시 모드 이름 적용
if (body.classList.contains('dark-mode')) {
    buttonText.textContent = 'Light Mode On';
  } else {
    buttonText.textContent = 'Dark Mode On';
  }
}

// 클릭시 다크모드 혹은 라이트모드로 적용
darkModeToggle.addEventListener('click', toggleDarkMode);