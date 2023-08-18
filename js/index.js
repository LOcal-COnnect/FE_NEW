var host = 'http://localhost:8080';
var userInfo = JSON.parse(localStorage.getItem('user'))
var storeInfo = JSON.parse(localStorage.getItem('seller'))
var token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
    var name = document.querySelector('.mainProfileName')
    var text = document.querySelector('.mainProfileText')
    var loginBtn = document.querySelector('.loginBtn')
    var signupBtn = document.querySelector('.signupBtn')

    if (userInfo != null) {
        name.style.display = 'block'
        name.outerText = userInfo.userName
        text.style.display = 'block'
        loginBtn.style.display = 'none'
        signupBtn.style.display = 'none'
    } else if (storeInfo != null) {
        name.style.display = 'block'
        name.outerText = storeInfo.seller.sellerName
        text.style.display = 'block'
        loginBtn.style.display = 'none'
        signupBtn.style.display = 'none'
    } else {
        name.style.display = 'none'
        text.style.display = 'none'
        loginBtn.style.display = 'block'
        signupBtn.style.display = 'block'
    }


    // 홈, 로그인, 회원가입 버튼의 이벤트 위임
    document.addEventListener('click', function (event) {
        if (event.target.id === 'homeButton') {
            window.location.href = 'index.html'
        } else if (event.target.id === 'loginButton') {
            window.location.href = 'login.html'
        } else if (event.target.id === 'registerButton') {
            window.location.href = 'selectJoin.html'
        } else if (event.target.id === 'categoryButton') {
            // 카테고리 버튼 클릭 시 숨겨진 카테고리를 보이거나 숨깁니다.
            var hiddenCategory = document.getElementById('hiddenCategory')
            if (hiddenCategory) {
                toggleHiddenCategory(hiddenCategory)
            }
        } else if (event.target.id === 'mypageButton') {
            window.location.href = 'login.html'
            // 마이페이지 버튼 클릭 시 로그인 상태에 따라 동작을 처리합니다.
            const isLoggedIn = false // 실제 로그인 상태 확인으로 변경해야 합니다.
            if (!isLoggedIn) {
                window.location.href = 'login.html'
            }
        }
    })
    // document.getElementById("searchInput").addEventListener("keydown", function (event) {
    //     if (event.key === "Enter") {
    //         search();
    //     }
    // });
})

// 카테고리 버튼에 대한 참조를 저장합니다.
var categoryBtn = document.getElementById('categoryButton');

var hiddenCategory = document.querySelector("#hiddenCategory");

function toggleHiddenCategory(hiddenCategory) {
    if (hiddenCategory.style.display === 'none') {
        hiddenCategory.style.display = 'block';
        console.log('왜 안돼?')
    } else {
        hiddenCategory.style.display = 'none';
    }
}

function search() {
    var searchText = document.getElementById('searchInput').value;
    console.log('검색어: ' + searchText);

    localStorage.setItem('search', toString(searchText));
    window.location.href = 'promotionList.html?search=' + searchText;
}

function gotopromotionList(category) {
    localStorage.setItem('category', category);
    window.location.href = 'promotionList.html?id=' + category;
}

function logout(){
    $.ajax({
        url: host + '/users/logout',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function(data){
            localStorage.clear();
            alert('로그아웃 되었습니다.');
            window.location.href = 'index.html';
        },error: function(){
            alert('로그아웃 할 수 없습니다. ');
        }
    })
}

const logoImages = [
    "img/loco1.svg",
    "img/loco2.svg"
]
const footerLogo = document.getElementById("footerLogo");
let imageIndex = 0;

function changeLogo() {
    footerLogo.src = logoImages[imageIndex];
    imageIndex = (imageIndex + 1) % logoImages.length;
}

setInterval(changeLogo, 1500);

function moveMypage(){
    if(userInfo != null){
        window.location.href='userMypage.html'
    }else if(storeInfo != null){
        window.location.href='storeMyPage.html'
    }
}
