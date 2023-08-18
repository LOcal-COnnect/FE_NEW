const tabList = Array.from(document.querySelectorAll('.tab'))
var storeInfo = JSON.parse(localStorage.getItem('seller'))
var token = localStorage.getItem('token')
const newInfoArray = []
tabList.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})


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
                document.getElementById('roadAddress').value = addr
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress
                localStorage.setItem('selectedCity', addr)
                document.getElementById('roadAddress').value = addr
            }
        },
    }).open()
}

function handleSortButtonClick(event) {
    const clickedTab = event.target

    tabList.forEach((button) => {
        button.classList.remove('active')
        if (button === clickedTab) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    var tab1 = document.getElementsByClassName('tab1')[0]
    var tab2 = document.getElementsByClassName('tab2')[0]
    var tab3 = document.getElementsByClassName('tab3')[0]
    if (clickedTab.id === 'tab1') {
        tab1.style.display = 'block'
        tab2.style.display = 'none'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab2') {
        tab1.style.display = 'none'
        tab2.style.display = 'block'
        tab3.style.display = 'none'
    } else if (clickedTab.id === 'tab3') {
        tab1.style.display = 'none'
        tab2.style.display = 'none'
        tab3.style.display = 'block'
        displayStore();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // tab1을 처음에 활성화
    handleSortButtonClick({ target: document.getElementById('tab1') })
})

// Function to update character count for contentInput
function updateCharCount() {
    const contentInput = document.querySelector('.contentInput')
    const charCount = document.querySelector('#charCount')
    const maxLength = parseInt(contentInput.getAttribute('maxlength'))
    const currentLength = contentInput.value.length
    charCount.textContent = `${currentLength} / ${maxLength}`
}

/*
// Attach event listener to the contentInput to update the character count on input
const contentInput = document.querySelector('.contentInput')
contentInput.addEventListener('input', updateCharCount) 

// 500자 글자 제한
const introductionText = document.getElementById('introductionText')
const charCount = document.getElementById('charCount')

introductionText.addEventListener('input', function () {
    const maxChars = 500
    const currentChars = introductionText.value.length
    charCount.textContent = `${currentChars} / ${maxChars} characters`

    if (currentChars > maxChars) {
        introductionText.value = introductionText.value.slice(0, maxChars)
        charCount.textContent = `${maxChars} / ${maxChars} characters`
    }
}) */

const photoInput = document.getElementById('photoInput')
const photoLabel = document.querySelector('.photo')

photoLabel.addEventListener('click', function () {
    photoInput.click()
})

photoInput.addEventListener('change', function () {
    const files = photoInput.files
    if (files.length > 0) {
        const fileName = files[0].name
        photoLabel.textContent = fileName
    }
})

function toggleOptions() {
    var options = document.getElementById('categoryOptions')
    options.style.display = options.style.display === 'block' ? 'none' : 'block'
}

// 게시글 1000자 이내
const introText = document.getElementById('introductionText2')
const charCountDisplay = document.getElementById('charCount2')

var selectedCategory; // 선택된 카테고리 변수 추가
introText.addEventListener('input', function () {
    const maxChars = 1000
    const currentChars = introText.value.length
    charCountDisplay.textContent = `${currentChars} / ${maxChars} characters`

    if (currentChars > maxChars) {
        introText.value = introText.value.slice(0, maxChars)
        charCountDisplay.textContent = `${maxChars} / ${maxChars} characters`
    }
})

// 홍보글 새 페이지
// Get a reference to the "작성하기" button
const writeButton = document.getElementById('writeButton')

// Get a reference to the "tab2" element
const tab2 = document.getElementById('tab2')

/*
// Add an event listener to the "작성하기" button
writeButton.addEventListener('click', function () {
    // Hide the entire tab2 element
    tab2.style.display = 'none'
}) */

// function moveDetail(num) {
//     window.location.href = 'storeMypageTab2(3).html' // b.html로 이동
// }

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    getMyInfo();
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            // 내 정보 수정하기 버튼을 클릭하여 편집 모드로 전환
            tab1.classList.add('active') // tab1 활성화

            var infoItems = myInfo.querySelectorAll('div')
            var infoItemsInput = myInfo.querySelectorAll('input')
            infoItemsInput = [... infoItemsInput]

            infoItems.forEach((item, index, originArr) => {
                const img = item.querySelector('img')
                const value = infoItemsInput[index].value
                const input = document.createElement('input')
                input.type = 'text'
                input.value = value

                if (index === 0) {
                    input.id = 'roadAddress'
                    input.setAttribute('readonly', 'true')
                    input.setAttribute('onclick', 'searchAddress()')
                }
                item.innerHTML = ''
                item.append(img)
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            moveEditMyBt.setAttribute('onClick', 'editMyInfo();')
            editing = true
        } else {
            let infoItems = myInfo.querySelectorAll('div')
            infoItems = [...infoItems]
            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                newInfoArray.push(input.value)
                item.innerHTML = ''
                item.append(img)
                item.appendChild(document.createTextNode(text))
            })

            editMyInfo()
            moveEditMyBt.textContent = '내 정보 수정하기'
            moveEditMyBt.removeAttribute('onClick')
            editing = false
        }
    })
})

function getMyInfo(){
    $.ajax({
        url: host + '/users/sellers/' + storeInfo.seller.sellerIdx,
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function(data){
            pushMyInfo(data);
        }, error: function(){
            alert('회원정보를 가져올 수 없습니다.');
        }
    })
}

function pushMyInfo(datas){
    var data = datas.seller;
    var infoInput = document.querySelector('.myInfo')
    var infoItems = infoInput.querySelectorAll('.myInfo > div')
    infoItems = [...infoItems]

    infoItems.forEach((item, index, originArr) => {
        const img = item.querySelector('img')
        const input = document.createElement('input')
        {
            index === 0 ? input.value = data.sellerAddress
            : index === 1 ? input.value = data.sellerDetailAddress
            : index === 2 ? input.value = data.sellerName
            : index === 3 ? input.value = data.sellerId
            : index === 4 ? input.value = data.sellerPassword
            : index === 5 ? input.value = data.sellerEmail
            : input.value = data.sellerPhone
        }
        input.type = 'text'
        item.innerHTML = ''
        item.append(img)
        item.appendChild(input)
    })
}

function editMyInfo() {
    $.ajax({
        url: host + '/users/sellers/' + storeInfo.seller.sellerIdx,
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify({
            sellerId: newInfoArray[3],
            sellerName: newInfoArray[2],
            sellerPassword: newInfoArray[4],
            sellerEmail: newInfoArray[5],
            sellerPhone: newInfoArray[6],
            sellerAddress: newInfoArray[0],
            sellerDetailAddress: newInfoArray[1],
        }),
        success: function () {
            alert('회원정보가 수정되었습니다.')
            window.location.reload()
        },
        error: function () {
            alert('회원정보를 수정하지 못했습니다.')
        },
    })
}


// 카테고리 선택 함수
function selectCategory(category) {
    selectedCategory = category; // 선택한 카테고리 저장
    $(".category-selection").text(category);
    $("#categoryOptions").hide();
}

// 최대 메뉴 카드 수
var maxMenuCards = 11;

// 플러스 버튼 클릭 이벤트
$("#plus").click(function () {
    if ($(".menuShow").length < maxMenuCards) {
        var newMenuCard = `
                <div class="menuShow">
                    <div class="pic">
                        <label for="menuPhotoInput" class="menuPhoto">
                            <h3 class="menuPhotoMent">
                                사진첨부를 위해 클릭해주세요.
                            </h3>
                        </label>
                    </div>
                    <div class="product-info">
                        <input type="text" placeholder="상품명" />
                        <input type="text" placeholder="가격" />
                    </div>
                    <input type="file" class="menuPhotoInput" style="display: none" />
                </div>
            `;
        $(".menus").append(newMenuCard);
        $(".menus").append($("#plus"));
    } else {
        alert("최대 " + (maxMenuCards-1) + "개까지 추가할 수 있습니다.");
    }
});


// tab3
function displayStore(){

    // 이미지 첨부 input change 이벤트 처리
    $(document).on("change", ".menuPhotoInput", function () {
        var inputIndex = $(".menuPhotoInput").index(this);
        // 사진 첨부 처리
        console.log("Image attached for menu at index: " + inputIndex);
    });



    // 가게 등록 버튼 클릭 이벤트
    $("#registerBtn").click(function () {
        // 메뉴 정보 수집
        var menuInfoArray = [];
        $(".menuShow").each(function () {
            var productName = $(this).find("input[type='text']:eq(0)").val();
            var productPrice = $(this).find("input[type='text']:eq(1)").val();
            // 메뉴별로 처리해야 할 작업 수행

            var menuInfo = {
                productName: productName,
                productPrice: productPrice
            };
            menuInfoArray.push(menuInfo);
        });


        var storeInputs = {
            'sellerIdx': storeInfo.seller.sellerIdx,
            'storeLocation': $("#storeLocation").val(),
            'storePhone': $("#storePhone").val(),
            'storeTel': $("#storeTel").val(),
            'businessNumber': $("#businessNumber").val(),
            'Category': selectedCategory,
            'storeDesc': $("#introductionText2").val(),
            'productList': menuInfoArray
        };
        // 서버로 storeInfo JSON 전송
        $.ajax({
            type: "POST",
            url: host + '/stores',
            data: JSON.stringify(storeInputs),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // 서버 응답 처리
            },
            error: function (error) {
                // 에러 처리
                console.log('error')
            }
        });
    });
}


