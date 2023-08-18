function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            const pictureWrap = event.target.parentElement.parentElement // .pictureInputWrap
            pictureWrap.style.backgroundImage = `url(${imgDataUrl})`
            pictureWrap.textContent = ''
        }

        reader.readAsDataURL(selectedFile)
    }
}

const stars = document.querySelectorAll('.star')
const ratingValue = document.querySelector('.rating-value')

let selectedRating = 0

stars.forEach((star) => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'))

        if (selectedRating === value) {
            selectedRating = 0
        } else {
            selectedRating = value
        }

        updateStars()
        updateRatingValue()
    })
})

function updateStars() {
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.src = 'svg/icon _star_.svg'
        } else {
            star.src = 'svg/starOut.svg'
        }
    })
}

function updateRatingValue() {
    ratingValue.textContent = selectedRating
}

/*
// 페이지 이동 (수정 완료 버튼)
function completeCreatePromotion() {
    window.location.href = 'aboutStoreMore.html'
}
*/

function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            console.log(imgDataUrl) // 이미지 데이터 확인
            const pictureWrap = event.target.parentElement // .pictureInputBox
            pictureWrap.style.backgroundImage = `url(${imgDataUrl})`
            pictureWrap.textContent = ''
        }

        reader.readAsDataURL(selectedFile)
    }
}

// 리뷰 수정 ajax
var token = localStorage.getItem('token')

document.querySelector('.completeBt').addEventListener('click', function () {
    completeUpdateReview()
})

function completeUpdateReview() {

    const content = document.querySelector('.contentInput').value
    const rating = parseFloat(
        document.querySelector('.rating-value').textContent
    )
    /*
    const selectedFileInput = document.querySelector(
        '.pictureInputBox input[type="file"]'
    ) */
    const selectedFileInput = document.querySelector('#pictureInput')

    console.log(content)
    console.log(rating)
    console.log(selectedFileInput)

    if (!content || !rating) {
        console.error('내용과 별점을 모두 입력해주세요.')
        return
    }

    const formData = new FormData()
    formData.append('reviewContent', content)
    formData.append('reviewStar', rating.toFixed(1))

    if (
        selectedFileInput &&
        selectedFileInput.files &&
        selectedFileInput.files.length > 0
    ) {
        const selectedFile = selectedFileInput.files[0]
        formData.append('reviewImage', selectedFile)
    }

    // 여기서 AJAX 요청 수행
    $.ajax({
        url: `/reviews/${reviewIdx}`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            Authorization: 'Bearer ' + token,
        },
        success: function (response) {
            if (response.code === 200) {
                console.log('리뷰 수정 성공:', response.message)
                handleReviewUpdateSuccess()
            } else {
                console.error('리뷰 수정 실패:', response.message)
            }
        },
        error: function (xhr, status, error) {
            console.error('리뷰 수정 오류:', error)
        },
    })
}

// 리뷰 수정 성공 시 처리 로직
function handleReviewUpdateSuccess() {
    const successPopup = document.createElement('div')
    successPopup.className = 'successPopup'
    successPopup.textContent = '리뷰가 성공적으로 수정되었습니다.'

    document.body.appendChild(successPopup)
    setTimeout(() => {
        document.body.removeChild(successPopup)
    }, 3000)
}
