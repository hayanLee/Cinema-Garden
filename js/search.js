//원하는 제목의 영화만 검색(필터링)
const filterResults = [];

export function handleForm(e) {
  e.preventDefault();
  let text = e.target[0].value;

  if (text.trim() === "") return; // 빈 검색어 제거
  filterResults.length = 0;

  const $cards = document.querySelectorAll(".card");
  $cards.forEach((card) => {
    let search = card.children[1].textContent.toLowerCase();

    if (search.includes(text.toLowerCase())) {
      card.style.display = "block";
      filterResults.push(card);
    } else card.style.display = "none";
  });
}

//라디오 필터링
let sortChoice = document.querySelector(".sortForm");
function sortClick(event) {
  if (event.target.classList.contains("form-check-input")) {
    sortFilter(event.target.id);
  }
}
sortChoice.addEventListener("click", sortClick);
//라디오그룹1 클릭이벤트

function sortFilter(value) {
  switch (value) {
    case "RadioDefaultFirst1":
      let tempArr1 = [];
      filterResults.forEach((item) => {
        let tempValue = item.querySelector(".popularity").textContent;
        tempArr1.push({ value: tempValue, movieName: item });
      });
      tempArr1.sort((a, b) => {
        return b.value - a.value;
      });
      let tempResult1 = tempArr1.map((item) => {
        return item.movieName;
      });
      tempResult1.forEach((item) => {
        return item.parentNode.appendChild(item);
      });
      break;
    //인기순

    case "RadioDefaultFirst2":
      let tempArr2 = [];
      filterResults.forEach((item) => {
        let tempValue = item
          .querySelector(".movieContent")
          .textContent.split("/")[0]
          .slice(0, 3)
          .split(".")
          .join("");
        tempArr2.push({ value: tempValue, movieName: item });
      });
      tempArr2.sort((a, b) => {
        return b.value - a.value;
      });
      let tempResult2 = tempArr2.map((item) => {
        return item.movieName;
      });
      tempResult2.forEach((item) => {
        return item.parentNode.appendChild(item);
      });
      break;
    //평점순

    case "RadioDefaultFirst3":
      let tempArr3 = [];
      filterResults.forEach((item) => {
        let tempValue = item.querySelector(".movieTitle").textContent;
        tempArr3.push({ value: tempValue, movieName: item });
      });
      tempArr3.sort((a, b) => {
        return a.value.localeCompare(b.value);
      });
      let tempResult3 = tempArr3.map((item) => {
        return item.movieName;
      });
      tempResult3.forEach((item) => {
        return item.parentNode.appendChild(item);
      });
      break;
    //제목순
  }
}
//라디오그룹1 정렬순 필터링

let yearChoice = document.querySelector(".yearForm");
function yearClick(event) {
  if (event.target.classList.contains("form-check-input")) {
    yearFilter(event.target.id);
  }
}
yearChoice.addEventListener("click", yearClick);
//라디오그룹2 클릭이벤트

function yearFilter(value) {
  switch (value) {
    case "RadioDefaultSecond1":
      filterResults.forEach((item) => {
        item.style.display = "block";
      });
      break;
    //전체년도

    case "RadioDefaultSecond2":
      filterResults.forEach((item) => {
        let tempValue = item
          .querySelector(".movieReleaseDate")
          .textContent.slice(0, 4);
        if (tempValue >= 2024) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
      break;
    //2024년 이후

    case "RadioDefaultSecond3":
      filterResults.forEach((item) => {
        let tempValue = item
          .querySelector(".movieReleaseDate")
          .textContent.slice(0, 4);
        if (tempValue < 2024) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
      break;
    //2024년 이전
  }
}
//라디오그룹2 년도순 필터링!
