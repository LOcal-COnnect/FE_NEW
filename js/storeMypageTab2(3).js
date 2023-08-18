const tabList = Array.from(document.querySelectorAll('.tab'))

tabList.forEach((button) => {
    button.addEventListener('click', handleSortButtonClick)
})

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
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // tab2를 처음에 활성화
    handleSortButtonClick({ target: document.getElementById('tab2') })
})

// Function to update character count for contentInput
function updateCharCount() {
    const contentInput = document.querySelector('.contentInput')
    const charCount = document.querySelector('#charCount')
    const maxLength = parseInt(contentInput.getAttribute('maxlength'))
    const currentLength = contentInput.value.length
    charCount.textContent = `${currentLength} / ${maxLength}`
}

// Attach event listener to the contentInput to update the character count on input
const contentInput = document.querySelector('.contentInput')
contentInput.addEventListener('input', updateCharCount)

/*
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

function selectCategory(category) {
    var selection = document.querySelector('.category-selection')
    selection.textContent = category + ' '
    var arrow = document.createElement('span')
    arrow.className = 'arrow-down'
    selection.appendChild(arrow)
    var options = document.getElementById('categoryOptions')
    options.style.display = 'none'
}

// 게시글 1000자 이내
const introText = document.getElementById('introductionText2')
const charCountDisplay = document.getElementById('charCount2')

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
})*/

// 페이지 이동 (수정 완료 버튼)
function completeCreatePromotion() {
    window.location.href = 'storeMypageTab2(4).html' // b.html로 이동
}
/*
document
    .getElementById('moveEditMyBt')
    .addEventListener('click', completeCreatePromotion)
*/
// 게시물 삭제 버튼
function deletePromotion() {
    window.location.href = 'storeMypage.html' // b.html로 이동
}

document.getElementById('deleteBt').addEventListener('click', deletePromotion)

// 내 정보 수정하기
document.addEventListener('DOMContentLoaded', function () {
    const moveEditMyBt = document.querySelector('.moveEditMyBt')
    const tab1 = document.querySelector('#tab1')
    const myInfo = document.querySelector('.myInfo')
    let editing = false // To track whether user is editing or not

    moveEditMyBt.addEventListener('click', function () {
        if (!editing) {
            // 내 정보 수정하기 버튼을 클릭하여 편집 모드로 전환
            tab1.classList.add('active') // tab1 활성화

            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const text = item.textContent

                const input = document.createElement('input')
                input.type = 'text'
                input.value = text

                item.innerHTML = ''
                item.append(img)
                item.appendChild(input)
            })

            moveEditMyBt.textContent = '수정 완료'
            editing = true
        } else {
            // 수정 완료 버튼을 클릭하여 저장하고 편집 모드 종료
            const infoItems = myInfo.querySelectorAll('div')

            infoItems.forEach((item) => {
                const img = item.querySelector('img')
                const input = item.querySelector('input')
                const text = input.value

                item.innerHTML = ''
                item.append(img)
                item.appendChild(document.createTextNode(text))
            })

            moveEditMyBt.textContent = '내 정보 수정하기'
            editing = false
        }
    })
})
