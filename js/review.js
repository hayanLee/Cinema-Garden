let query = window.location.search;
let param = new URLSearchParams(query);
let movieId = param.get('id');

// console.log(id);    // 693134



// 리뷰 form 을 변수에 저장
const reviewForm = document.getElementById('review-form');
// 리뷰 list 을 변수에 저장
const reviewList = document.getElementById('review-list');

// 페이지가 로드될 때 기존 리뷰 불러오기
window.onload = function () {
    loadReviews();
};

// 리뷰 작성 폼 제출 시 실행될 함수
reviewForm.onsubmit = function (e) {
    // 새로고침 막기위해 이벤트 취소
    e.preventDefault();

    // 입력된 이름과 리뷰 내용 가져오기
    let userId = this['user-id'].value;
    let userPw = this['user-pw'].value;
    let userText = this['user-text'].value;

    // 비밀번호 4글자이상되도록 alert
    if (userPw.length < 4) {
        alert("비밀번호는 4글자 이상이어야 합니다.");
        return; //제출을 막고 함수 종료
    }
    
    // 리뷰 객체 생성
    let newReview = {
        user: userId,
        pw: userPw,
        review: userText,
        date: new Date(),
    };  
    
    // 기존 리뷰 배열 가져오기
    let reviews = getReviews();
    
    // 새로운 리뷰 추가
    reviews.push(newReview);
    
    // 변경된 리뷰 배열 저장
    saveReviews(reviews);
    
    // 리뷰 목록 다시 불러오기
    loadReviews();


    
    // 폼 초기화
    reviewForm.reset();

};

// 엔터 누르면 제출
reviewForm.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터키의 기본 동작 방지
      this.onsubmit(e); // 폼 제출 함수 호출
    }
  });

// 수정, 삭제 버튼 눌렀을 때
document.addEventListener('click', (e) => {
    // 만약 누른 버튼이 수정버튼이면
    if (e.target.classList.contains('review-user-edit')) {
        // 눌린 버튼 정보를 저장
        const target = e.target;
        // 리뷰 수정 함수에 전달
        reviewEdit(target);
    }
    // 만약 누른 버튼이 삭제버튼이면
    if (e.target.classList.contains('review-user-delete')) {
        // 눌린 버튼 정보를 저장
        const target = e.target;
        // 리뷰 삭제 함수에 전달
        reviewDelete(target);
    }
});

// 로컬 스토리지에서 리뷰 배열 가져오기
function getReviews() {
    let reviews = localStorage.getItem(`${movieId}`);

    if (reviews) {
        return JSON.parse(reviews);
    } else {
        return [];
    }
}

// 로컬 스토리지에 리뷰 배열 저장하기
function saveReviews(reviews) {
    localStorage.setItem(`${movieId}`, JSON.stringify(reviews));              //693134
}

// 리뷰 목록 불러오기
function loadReviews() {
    // 리뷰 목록 영역을 변수에 저장
    let reviewList = document.getElementById('review-list');
    // 리뷰 목록 영억을 공백으로 바꿈 // 기존 리뷰 모두 지우기
    reviewList.innerHTML = "";

    // 로컬 스토리지에서 리뷰 배열 가져오기
    let reviews = getReviews();  

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i];

        let listItem = document.createElement('li');
        listItem.setAttribute('data-id', i);
        listItem.className = 'review-inner-wrap';
        listItem.innerHTML = '<p class="review-user-id">' + review.user + '</p><p class="review-user-text">' + review.review + '</p><p class="review-user-date">' + new Date(review.date).toLocaleString() + '</p>';
        listItem.innerHTML += '<a class="review-user-edit">Edit</a><a class="review-user-delete">Delete</a>';

        reviewList.appendChild(listItem);
    }
}

function reviewEdit(el) {
    let listItem = el.parentElement;
    let reviews = getReviews();
    let review = reviews[listItem.getAttribute('data-id')];
    
    const passwordTry = prompt('패스워드를 입력해주세요.')
    if (passwordTry === review.pw) {
        if (confirm(`수정하려는 리뷰가 맞습니까?\n\n작성자: ${review.user}\n내용: ${review.review}`)) {
            review.review = prompt(`새로운 리뷰를 입력해주세요.`);
            reviews[listItem.getAttribute('data-id')] = review;
            saveReviews(reviews);
            alert('수정되었습니다.');
        } else {
            alert('취소되었습니다.');
        }
    } else if (passwordTry !== review.pw && passwordTry) {
        alert('비밀번호가 틀렸습니다.\n다시 시도해주세요.');
    }
    
    loadReviews();
}

function reviewDelete(el) {
    let listItem = el.parentElement;
    let reviews = getReviews();
    let review = reviews[listItem.getAttribute('data-id')];
    
    const passwordTry = prompt('패스워드를 입력해주세요.')
    if (passwordTry === review.pw) {
        if (confirm(`삭제하려는 리뷰가 맞습니까?\n\n작성자: ${review.user}\n내용: ${review.review}`)) {
            reviews.splice(listItem.getAttribute('data-id'), 1);
            saveReviews(reviews);
            alert('삭제되었습니다.');
        } else {
            alert('취소되었습니다.');
        }
    } else if (passwordTry !== review.pw && passwordTry) {
        alert('비밀번호가 틀렸습니다.\n다시 시도해주세요.');
    }
    
    loadReviews();
}