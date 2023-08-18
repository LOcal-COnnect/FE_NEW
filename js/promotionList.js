var host = 'http://localhost:8080';
var token = localStorage.getItem('token');

var changeWord; // 전역 변수로 선언

function changeCategory(word){
    if(word === 'food1'){
        changeWord = '곡물류';
    } else if(word === 'food2'){
        changeWord = '김치류';
    } else if(word === 'food3'){
        changeWord = '발효식품';
    } else if(word === 'food4'){
        changeWord = '면류';
    } else if(word === 'food5'){
        changeWord = '떡류';
    } else if(word === 'food6'){
        changeWord = '생선과 해산물';
    } else if(word === 'food7'){
        changeWord = '과일';
    } else if(word === 'food8'){
        changeWord = '차류';
    } else if(word === 'food9'){
        changeWord = '과자류';
    } else if(word === 'food10'){
        changeWord = '한약류';
    } else if(word === 'nonfood1'){
        changeWord = '의류와 직물';
    } else if(word === 'nonfood2'){
        changeWord = '도자기와 세라믹';
    } else if(word === 'nonfood3'){
        changeWord = '목공예품';
    } else if(word === 'nonfood4'){
        changeWord = '기타 공예품';
    } else if(word === 'nonfood5'){
        changeWord = '화장품';
    } else if(word === 'nonfood6'){
        changeWord= '금속 공예품'
    }
}

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    window.postId = urlParams.get('id');
    window.searchText = urlParams.get('search');

    if (window.postId != null) {
        changeCategory(window.postId);
        showCategory(0, changeWord, window.postId);
    } else if (window.searchText != null) {
        getSearchResult(0, searchText);
    } else {
        showData(0, 'createdAt,desc');
    }


};


// 페이지가 언로드되기 전에 실행되는 이벤트
window.onbeforeunload = function () {
    var newUrl = window.location.href.split('?')[0]
    history.replaceState({}, document.title, newUrl)
}

// 최신순, 조회수순, 좋아요순 버튼
const sortButtons = Array.from(document.querySelectorAll('.sortButton'))

sortButtons.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})

function handleSortButtonClick(event) {
    const clickedButton = event.target

    sortButtons.forEach((button) => {
        button.classList.remove('active')
        if (button === clickedButton) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    if (clickedButton.id === 'recentSort') {
        localStorage.setItem('sort', 'createdAt,desc')
        showData(0, 'createdAt,desc')
    } else if (clickedButton.id === 'likeSort') {
        localStorage.setItem('sort', 'like,desc')
        showData(0, 'like,desc')
    } else if (clickedButton.id === 'viewSort') {
        localStorage.setItem('sort', 'viewCount,desc')
        showData(0, 'viewCount,desc')
    }
}

function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = '' // 주소 변수
            var extraAddr = '' // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress
                localStorage.setItem('selectedCity', addr)
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress
                localStorage.setItem('selectedCity', addr)
            }
            showNearPlace()
        },
    }).open()
}

function moveDetail(num) {
    localStorage.setItem('postNum', num)
    window.location.href = 'promotionDetail.html'
}

function showNearPlace() {
    var city = localStorage.getItem('selectedCity')
    var promotionBtWrap = document.getElementsByClassName(
        'promotionFilterBtWrap'
    )[0]
    var selectedCityBt = document.getElementsByClassName('selectedCityBt')[0]

    if (city) {
        selectedCityBt.innerText = '선택 지역: ' + city
        selectedCityBt.style.display = 'block'
        promotionBtWrap.style.display = 'none'
    } else {
        selectedCityBt.style.display = 'none'
        promotionBtWrap.style.display = 'block'
    }
}

function showCategory(pagenum, changeName, name) {
    var promotionSelectWrap = document.querySelector('.promotionSelectBtWrap')
    var promotionSearchWrap = document.querySelector('.promotionSearchBtWrap')
    var searchTitle = document.querySelector('.searchTitle')
    var searchName = document.querySelector('.searchName')

    promotionSelectWrap.style.display = 'none'
    promotionSearchWrap.style.display = 'block'

    searchTitle.innerText = '카테고리 >'
    searchName.innerText = changeName

    var data = {
        storeList: [
            {
                storeIdx: 1,
                storeName:
                    '가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명',
                storeLocation:
                    '서울시 한국구 한국동 12번지 한국구 한국동 12번지 한국 한국구 한국동 12번지구 한국동 12번지',
            },
            {
                storeIdx: 2,
                storeName: '가게명',
                storeLocation: '서울시 한국구 한국동 12번지',
            },
            {
                storeIdx: 3,
                storeName: '가게명',
                storeLocation: '서울시 한국구 한국동 12번지',
            },
        ],
    }

    var newcontainer = document.querySelector('.promotionListWrap')
    var length = data.storeList.length

    newcontainer.innerHTML = ''
    for (var i = 0; i < length; i++) {
        var card = document.createElement('div')
        card.className = 'promotionCard'
        card.id = data.storeList[i].storeIdx
        card.setAttribute(
            'onclick',
            'moveIntroDetail(' + data.storeList[i].storeIdx + ');'
        )

        card.innerHTML = `
                    <img class="promotionImg" src="img/storeImgSample.svg"/>
                    <h3>${data.storeList[i].storeName}</h3>
                    <div class="storeIntro">
                        <p>${data.storeList[i].storeLocation}</p>
                    </div>
                `
        newcontainer.appendChild(card)
    }
    cardEffect()
    $.ajax({
        url: host + '/stores/' + name + '/page=' + pagenum + '&size=8',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            localStorage.setItem('data', data)
        },
        error: function () {
            alert('카테고리에 해당하는 내용을 가져올 수 없습니다.')
        },
    })
    showButtons()
}

function showData(pagenum, sort) {
    localStorage.setItem('sort', sort)
    console.log(sort)
    $.ajax({
        url: host + '/promotion?page=' + pagenum + '&size=8&sort=' + sort,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            localStorage.setItem('data', data)
        },error: function(){
            alert('정보를 가져올 수 없습니다.')
        }
    })
    var data = {
        promotionList: [
            {
                promotionIdx: 1,
                promotionTitle:
                    '제목입니다.제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
                promotionContent:
                    '게시글내용입니다.제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
                storeName: '도라메옹1'
            },
            {
                promotionIdx: 2,
                promotionTitle: '제목입니다.',
                promotionContent: '게시글내용입니다.',
                storeName: '도라메2옹'
            },
            {
                promotionIdx: 3,
                promotionTitle: '제목입니다.',
                promotionContent: '게시글내용입니다.',
                storeName: '도라메3옹'
            },
            {
                promotionIdx: 3,
                promotionTitle: '제목입니다.',
                promotionContent: '게시글내용입니다.',
                storeName: '도라4메옹'
            },
            {
                promotionIdx: 3,
                promotionTitle: '제목입니다.',
                promotionContent: '게시글내용입니다.',
                storeName: '도라메옹'
            },
            {
                promotionIdx: 3,
                promotionTitle: '제목입니다.',
                promotionContent: '게시글내용입니다.',
                storeName: '도라메옹'
            },
        ],
    }

    var container = document.querySelector('.promotionListWrap')
    var length = data.promotionList.length

    container.innerHTML = ''

    for (var i = 0; i < length; i++) {
        var card = document.createElement('div')
        card.className = 'promotionCard'
        card.id = data.promotionList[i].promotionIdx
        card.setAttribute(
            'onclick',
            'moveDetail(' + data.promotionList[i].promotionIdx + ');'
        )

        card.innerHTML = `
            <img class="promotionImg" src="img/storeImgSample.svg"/>
            <h3>${data.promotionList[i].promotionTitle}</h3>
            <div class="storeIntro">
                <p>${data.promotionList[i].promotionContent}</p>
            </div>
            <div class="promotionInfo">
                <img src="img/good.svg"/>
                <div class="storeInfo">
                    <img src="img/store.svg"/>
                    <p class="storeName">${data.promotionList[i].storeName}</p>
                </div>
            </div>
        `
        container.appendChild(card)
    }
    cardEffect()
    showButtons()
}

function cardEffect() {
    var promotionCards = document.querySelectorAll('.promotionCard')

    promotionCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)'
            this.style.transition = 'transform 0.2s ease'
        })

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)'
            this.style.transition = 'transform 0.2s ease'
        })
    })
}

function moveDetail(num) {
    localStorage.setItem('postNum', num)
    window.location.href = 'promotionDetail.html?id=' + num
}

function moveIntroDetail(num) {
    localStorage.setItem('storeNum', num)
    window.location.href = 'aboutStoreBuyer.html?id=' + num
}

function showButtons() {
    var urlParams = new URLSearchParams(window.location.search)
    window.postId = urlParams.get('id')
    window.searchText = urlParams.get('search')

    const buttonContainer = document.getElementById('buttonContainer')

    // buttonCount는 추후 백엔드에서 넘겨주는 페이지 수
    // totalPages : 10/4 = 2 보여줘야 하는 총 페이지수 (현재 페이지가 1이라 -1 해줌)
    const buttonCount = 5
    const buttonSize = 10

    let currentPage = 1
    let totalPages = buttonCount / 4

    function renderButton() {
        buttonContainer.innerHTML = ''

        if (currentPage > 1) {
            const prevButton = createButton('<')
            prevButton.addEventListener('click', () => {
                currentPage--
                renderButton()
            })
            buttonContainer.appendChild(prevButton)
        }

        const startButton = (currentPage - 1) * 4
        let endButton = startButton + 4
        if (endButton > buttonCount) {
            endButton = buttonCount
        }

        for (let i = startButton; i < endButton; i++) {
            console.log(window.postId, window.searchText, localStorage.getItem('sort'))
            const button = createButton(i + 1)
            if (window.postId != null) {
                button.setAttribute(
                    'onclick',
                    'showCategory(' + (i) + ',' + window.postId + ')'
                )
            } else if (window.searchText != null) {
                button.setAttribute(
                    'onclick',
                    'getSearchResult(' + (i) + ',' + window.searchText + ')'
                )
            } else {
                button.setAttribute(
                    'onclick',
                    'showData(' +
                    (i) +
                    ', ' +
                    "'" + localStorage.getItem('sort') + "'" +
                    ')'
                )
            }
            buttonContainer.appendChild(button)
        }

        if (currentPage < totalPages) {
            const nextButton = createButton('>')
            nextButton.addEventListener('click', () => {
                currentPage++
                renderButton()
            })
            buttonContainer.appendChild(nextButton)
        }
    }

    function createButton(number) {
        const button = document.createElement('div')
        button.classList.add('button')
        button.id = number
        button.style.cursor = 'pointer'
        button.style.width = buttonSize + 'px'
        button.style.height = buttonSize + 'px'
        button.style.margin = '0 10px'
        button.innerText = number
        return button
    }

    renderButton()
}


function getSearchResult(num, name) {
    var promotionSelectWrap = document.querySelector('.promotionSelectBtWrap')
    var promotionSearchWrap = document.querySelector('.promotionSearchBtWrap')
    var searchTitle = document.querySelector('.searchTitle')
    var searchName = document.querySelector('.searchName')

    promotionSelectWrap.style.display = 'none'
    promotionSearchWrap.style.display = 'block'

    searchTitle.innerText = '검색어'
    searchName.innerText = name

    $.ajax({
        url: host + '/stores/' + name + '/page=' + num + '&size=8',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            localStorage.setItem('data', data)
        },
        error: function () {
            alert('검색 결과 못가져왔지롱 ㅋㅋ')
        },
    })
    var data = {
        storeList: [
            {
                storeIdx: '스토어아이디',
                storeName: '가게명검색결과',
                storeLocation: '서울시 한국구 한국동 12번지',
            },
            {
                storeIdx: '스토어아이디',
                storeName: '가게명검색결과',
                storeLocation: '서울시 한국구 한국동 12번지',
            },
            {
                storeIdx: '스토어아이디',
                storeName: '가게명검색결과',
                storeLocation: '서울시 한국구 한국동 12번지',
            },
        ],
    }

    var container = document.querySelector('.promotionListWrap')
    var length = data.storeList.length

    container.innerHTML = ''
    for (var i = 0; i < length; i++) {
        var card = document.createElement('div')
        card.className = 'promotionCard'
        card.id = data.storeList[i].storeIdx
        card.setAttribute(
            'onclick',
            'moveIntroDetail(' + data.storeList[i].storeIdx + ');'
        )

        card.innerHTML = `
                    <img class="promotionImg" src="img/storeImgSample.svg"/>
                    <h3>${data.storeList[i].storeName}</h3>
                    <div class="storeIntro">
                        ${data.storeList[i].storeLocation}
                    </div>
                `
        container.appendChild(card)
    }
    cardEffect()
}
