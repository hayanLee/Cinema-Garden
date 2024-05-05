//원하는 제목의 영화만 검색(필터링)
const filterResults = [];

export function handleForm(e) {
    e.preventDefault();
    let text = e.target[0].value;

    if (text.trim() === '') return; // 빈 검색어 제거
    filterResults.length = 0

    const $cards = document.querySelectorAll('.card');
    $cards.forEach((card) => {
        let search = card.children[1].textContent.toLowerCase();
        
        if (search.includes(text.toLowerCase())) {
            card.style.display = 'block';
            filterResults.push(card);
        }
        else card.style.display = 'none';
    });
    // console.log(filterResults);
    // console.log(getFilterResult());
    // console.log(filterResults);
    // console.log(filterResults[1]);
    // console.log(filterResults[0]["id"]); 
    // console.log(filterResults[2].querySelector('.movieTitle').textContent;
    // console.log(filterResults[0].querySelector('.popularity').textContent);
    // console.log(filterResults[0].querySelector('.movieContent').textContent.split("/")[0].slice(0,3).split(".").join(""));
    // console.log(filterResults[0].querySelector('.movieReleaseDate').textContent.split("-").join(""));
   
}
// function getFilterResult(){
//     return filterResults;
// }
// getFilterResult();





//라디오 필터링
let radioChoice = document.querySelector(".sortForm");
    function radioClick(event){
        if(event.target.classList.contains("form-check-input")) {
            filterMovie(event.target.id);
        };
    };
radioChoice.addEventListener("click", radioClick);

function filterMovie(value){
    // console.log(value)
    switch (value){
        case "RadioDefaultFirst1":
            let tempArr1 = [];
            filterResults.forEach((item)=>{
                let tempValue = item.querySelector('.popularity').textContent;
                tempArr1.push({value: tempValue, movieName: item});
            });
            tempArr1.sort((a,b)=>{
                return b.value - a.value;
            })
            // console.log(tempArr1);
            let tempResult1 = tempArr1.map((item)=>{
                return item.movieName;
            });
            tempResult1.forEach((item)=>{
                return item.parentNode.appendChild(item);
            });
        break;

        case "RadioDefaultFirst2":
            let tempArr2 = [];
            filterResults.forEach((item)=>{
                let tempValue = item.querySelector('.movieContent').textContent.split("/")[0].slice(0,3).split(".").join("");
                tempArr2.push({value: tempValue, movieName: item});
            });
            tempArr2.sort((a,b)=>{
                return b.value - a.value;
            });
            // console.log(tempArr2);
            let tempResult2 = tempArr2.map((item)=>{
                return item.movieName;
            });
            tempResult2.forEach((item)=>{
                return item.parentNode.appendChild(item);
            });
        break;

        case "RadioDefaultFirst3":
            let tempArr3 = [];
            filterResults.forEach((item)=>{
                let tempValue = item.querySelector('.movieTitle').textContent;
                tempArr3.push({value: tempValue, movieName: item});
            });
            tempArr3.sort((a,b)=>{
                return a.value.localeCompare(b.value);
            });
            // console.log(tempArr3);
            let tempResult3 = tempArr3.map((item)=>{
                return item.movieName;
            });
            tempResult3.forEach((item)=>{
                return item.parentNode.appendChild(item);
            });
        break;
    }
}