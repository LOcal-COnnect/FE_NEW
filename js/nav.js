// // nav.js
// document.addEventListener('DOMContentLoaded', function () {
//     fetch('nav.html')
//         .then((response) => response.text())
//         .then((data) => {
//             document.getElementById('navbar').innerHTML = data
//             // 내비게이션 바가 로드된 후에 이벤트를 설정합니다.
//             setupNavigationEvents()
//         })
//         .catch((error) => {
//             console.error('Error fetching navbar:', error)
//         })
// })

// window.addEventListener('load', createNavbar)


var homeBtn = document.getElementById('homeButton');
var loginBtn = document.getElementById('loginButton');
var registerBtn = document.getElementById('registerButton');

homeBtn.addEventListener('click', function () {
    window.location.href = 'mainpage.html';
});

loginBtn.addEventListener('click', function () {
    window.location.href = 'login.html';
});

registerBtn.addEventListener('click', function () {
    window.location.href = 'selectJoin.html';
});

// 카테고리 버튼에 대한 참조를 저장합니다.
var categoryBtn = document.getElementById('categoryButton');

// 숨겨진 카테고리 요소에 대한 참조를 저장합니다.
var hiddenCategory = document.getElementById("hiddenCategory");

// 숨겨진 카테고리를 보여주는 함수를 정의합니다.
function toggleHiddenCategory() {
    if (hiddenCategory.style.display === "none") {
        hiddenCategory.style.display = "block";
    } else {
        hiddenCategory.style.display = "none";
    }
}

// 초기에 버튼에 이벤트 리스너를 추가합니다.
categoryBtn.addEventListener("click", toggleHiddenCategory);


//버튼에 대한 참조를 저장합니다.
var mypageBtn = document.getElementById('usermypageButton');

// 숨겨진 버튼 요소에 대한 참조를 저장합니다.
var buttonContainer = document.getElementById("buttonContainer");

// 숨겨진 버튼을 보여주는 함수를 정의합니다.
function togglebuttonContainer() {
    if (buttonContainer.style.display === "none") {
        buttonContainer.style.display = "block";
    } else {
        buttonContainer.style.display = "none";
    }
}

// 초기에 카테고리 버튼에 이벤트 리스너를 추가합니다.
mypageBtn.addEventListener("click", function() {
    togglebuttonContainer(); // 이 부분에서 괄호를 붙이지 않습니다.
});

var usermypageBtn = document.getElementById('usermypageButton');
var logoutmypageBtn = document.getElementById('logoutButton');

usermypageBtn.addEventListener('click', function () {
    window.location.href = 'userMypage.html';
});



//카테고리 버튼들//

//promotionList를 카테고리에 따라 보내줌//

function gotopromotionList(category) {
    localStorage.setItem('postNum', category);
    window.location.href = 'promotionList.html?id=' + category;
}

// // 음식 1//
// var smallfood1Btn = document.getElementById('smallfood1Button')
// smallfood1Btn.addEventListener('click', function () {
// })
// // 음식 2//
// var smallfood2Btn = document.getElementById('smallfood2Button')
// smallfood2Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 3//
// var smallfood3Btn = document.getElementById('smallfood3Button')
// smallfood3Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 4//
// var smallfood4Btn = document.getElementById('smallfood4Button')
// smallfood4Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 5//
// var smallfood5Btn = document.getElementById('smallfood5Button')
// smallfood5Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 6//
// var smallfood6Btn = document.getElementById('smallfood6Button')
// smallfood6Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 7//
// var smallfood7Btn = document.getElementById('smallfood7Button')
// smallfood7Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 8//
// var smallfood8Btn = document.getElementById('smallfood8Button')
// smallfood8Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 9//
// var smallfood9Btn = document.getElementById('smallfood9Button')
// smallfood9Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 음식 10//
// var smallfood10Btn = document.getElementById('smallfood10Button')
// smallfood10Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })

// // 비음식 1//
// var smallnonfood1Btn = document.getElementById('smallnonfood1Button')
// smallnonfood1Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 비음식 2//
// var smallnonfood2Btn = document.getElementById('smallnonfood2Button')
// smallnonfood2Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 비음식 3//
// var smallnonfood3Btn = document.getElementById('smallnonfood3Button')
// smallnonfood3Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 비음식 4//
// var smallnonfood4Btn = document.getElementById('smallnonfood4Button')
// smallnonfood4Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 비음식 5//
// var smallnonfood5Btn = document.getElementById('smallnonfood5Button')
// smallnonfood5Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })
// // 비음식 6//
// var smallnonfood6Btn = document.getElementById('smallnonfood6Button')
// smallnonfood6Btn.addEventListener('click', function () {
//     function moveDetail(category) {
//         localStorage.setItem('category', category);
//         window.location.href = 'promotionDetail.html?id=' + category;
//     }
// })