const tabList = Array.from(document.querySelectorAll('.tab'))
var storeInfo = JSON.parse(localStorage.getItem('seller'))
var token = localStorage.getItem('token')

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
})
*/

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
/*
const writeButton = document.getElementById('writeButton')
const tab2 = document.getElementById('tab2')
writeButton.addEventListener('click', function () {
    tab2.style.display = 'none'
}) */

// function completeCreatePromotion() {
//     window.location.href = 'storeMypage.html' // b.html로 이동
// }
//
// // 내 정보 수정하기
// document.addEventListener('DOMContentLoaded', function () {
//     const moveEditMyBt = document.querySelector('.moveEditMyBt')
//     const tab1 = document.querySelector('#tab1')
//     const myInfo = document.querySelector('.myInfo')
//     let editing = false
//
//     moveEditMyBt.addEventListener('click', function () {
//         if (!editing) {
//             tab1.classList.add('active')
//
//             var infoItems = myInfo.querySelectorAll('div')
//             var infoItemsInput = myInfo.querySelectorAll('input')
//             infoItemsInput = [... infoItemsInput]
//
//             infoItems.forEach((item, index, originArr) => {
//                 const img = item.querySelector('img')
//                 const value = infoItemsInput[index].value
//                 const input = document.createElement('input')
//                 console.log(value)
//                 input.type = 'text'
//                 input.value = value
//
//                 if (index === 0) {
//                     input.id = 'roadAddress'
//                     input.setAttribute('readonly', 'true')
//                     input.setAttribute('onclick', 'searchAddress()')
//                 }
//                 item.innerHTML = ''
//                 item.append(img)
//                 item.appendChild(input)
//             })
//
//             moveEditMyBt.textContent = '수정 완료'
//             editing = true
//         } else {
//             let infoItems = myInfo.querySelectorAll('div')
//             infoItems = [...infoItems]
//             infoItems.forEach((item) => {
//                 const img = item.querySelector('img')
//                 const input = item.querySelector('input')
//                 const text = input.value
//
//                 newInfoArray.push(input.value)
//                 item.innerHTML = ''
//                 item.append(img)
//                 item.appendChild(document.createTextNode(text))
//             })
//
//             editMyInfo()
//             moveEditMyBt.textContent = '내 정보 수정하기'
//             moveEditMyBt.removeAttribute('onClick')
//             editing = false
//         }
//     })
// })
//
// // 사진 등록
// function handleImageSelection(event) {
//     const selectedFile = event.target.files[0]
//
//     if (selectedFile) {
//         const reader = new FileReader()
//
//         reader.onload = function () {
//             const imgDataUrl = reader.result
//             const pictureWrap = event.target.parentElement.parentElement // .pictureInputWrap
//             pictureWrap.style.backgroundImage = `url(${imgDataUrl})`
//
//             const pictureInputBox = event.target.parentElement
//             pictureInputBox.style.display = 'none'
//         }
//
//         reader.readAsDataURL(selectedFile)
//     }
// }

function handleImageSelection2(event) {
    const selectedFile = event.target.files[0]
    const photoPreview = document.getElementById('photoPreview')

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            photoPreview.src = imgDataUrl
            photoPreview.style.display = 'block'

            // Hide the photoMent
            const photoMent = document.querySelector('.photoMent')
            photoMent.style.display = 'none'
        }

        reader.readAsDataURL(selectedFile)
    }
}

function handleImageSelection2(event) {
    const selectedFile = event.target.files[0]
    const photoPreview = document.getElementById('photoPreview')

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            photoPreview.style.backgroundImage = `url(${imgDataUrl})`
            photoPreview.style.display = 'block'

            // Hide the photoMent
            const photoMent = document.querySelector('.photoMent')
            photoMent.style.display = 'none'
        }

        reader.readAsDataURL(selectedFile)
    }
}

