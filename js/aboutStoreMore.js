var userIdx = 1
var token = localStorage.getItem('token')
var host = 'http://43.200.4.52:8080'
// 가게 대표사진
window.addEventListener('load', function () {
    const storePhotoElement = document.querySelector('#storePhoto img')
    const imageUrl = 'http://example.com/path/to/storePhotoImage.jpg'

    fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob)
            storePhotoElement.src = url
        })
        .catch((error) => {
            console.error('Failed to fetch the image:', error)
        })
})

// 가게 소개 박스
const introBox = document.querySelector('.introBox')
const introScript = document.querySelector('.introScript')

function adjustIntroBoxHeight() {
    const lineHeight = parseInt(window.getComputedStyle(introScript).lineHeight)
    const numLines = Math.ceil(introScript.clientHeight / lineHeight)

    if (numLines > 5) {
        introBox.style.height = `${lineHeight * 5}px`
    }
}

window.addEventListener('load', adjustIntroBoxHeight)
window.addEventListener('resize', adjustIntroBoxHeight)

// 가게 사진 하단 찜하기
window.addEventListener('load', function () {
    const heartOutIcon = document.querySelector('.heartOut img')

    const fullHeart = 'svg/icon _heart_.svg'
    const originHeart = 'svg/icon _heart outline_.svg'

    let isFullHeart = false

    heartOutIcon.addEventListener('click', function () {
        if (isFullHeart) {
            heartOutIcon.src = originHeart
            heartOutIcon.alt = 'Heart Outline Image'
        } else {
            heartOutIcon.src = fullHeart
            heartOutIcon.alt = 'Heart Image'
        }

        isFullHeart = !isFullHeart
    })

    $.ajax({
        url: host + `/mine/${userIdx}/store/${window.postId}`,
        method: 'GET',
        success: function (data) {
            // 서버에서 받아온 찜하기 여부 값으로 isFullHeart 업데이트
            isFullHeart = data.isFullHeart
        },
        error: function () {
            // 에러 처리
            console.error('찜하기 여부를 불러오는 데 실패했습니다.')
        },
    })
})

$('#Heartnum').click(function () {
    const heartCountElement = $('#HeartCount')

    // 찜하기 여부 서버 요청 (GET 요청 등)
    $.ajax({
        url: host + `/mine/${userIdx}/store/${window.postId}`,
        method: 'GET',
        success: function (data) {
            isFullHeart = data.isFullHeart // 서버에서 받아온 찜하기 여부 값으로 업데이트

            if (!isFullHeart) {
                $.ajax({
                    url:
                        host +
                        `/mine/${userIdx}/store/${window.postId}` +
                        window.postId,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        haartnum: $('#Heartnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/mine/store/${window.postId}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                heartnum: $('#heartnum').val(),
                            }),
                            success: function (data) {
                                heartCountElement.text(data.heartCount) // 서버에서 받은 찜하기 수로 화면 업데이트
                            },
                            error: function () {
                                alert('찜하기 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('찜하기가 입력되지 않았습니다.')
                    },
                })
            } else {
                $.ajax({
                    url: host + `/mine/${userIdx}/store/${window.postId}`,
                    method: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        goodnum: $('#Heartnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/mine/store/${window.postId}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                heartnum: $('#heartnum').val(),
                            }),
                            success: function (data) {
                                heartCountElement.text(data.heartCount) // 서버에서 받은 찜하기 수로 화면 업데이트
                            },
                            error: function () {
                                alert('찜하기 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('찜하기 삭제에 실패했습니다.')
                    },
                })
            }
        },
        error: function () {
            console.error('찜하기 여부를 불러오는 데 실패했습니다.')
        },
    })
})
// 해시태그 길이 조정
function adjustHashtagBoxSize() {
    const hashtagBox = document.querySelector('.HashtagBox')
    const hashtagText = hashtagBox.querySelector('h3')
    const hashtagWidth = hashtagText.clientWidth + 14

    hashtagBox.style.width = `${hashtagWidth}px`
}

window.addEventListener('load', adjustHashtagBoxSize)
window.addEventListener('resize', adjustHashtagBoxSize)

/*
// 리뷰 확인
const reviews = [
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User4', ---> reviewer
        rating: 5, ---> reviewStar
        date: '2023.07.15', ---> createAt
        comment: '맛있다 \n A+' ---> reviewContent
        photo: 'svg/storePhoto.svg',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User3',
        rating: 3,
        date: '2023.07.15',
        comment: '그냥그랬다 \n B+',
        photo: 'svg/storePhoto.svg',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User2',
        rating: 1,
        date: '2023.07.15',
        comment: '별로다 \n C+',
        photo: 'svg/storePhoto.svg',
    },
    {
        profilePictureUrl: 'svg/profile.svg',
        nickname: 'User1',
        rating: 5,
        date: '2023.07.15',
        comment: '맛있다 \n A+',
        photo: 'svg/storePhoto.svg',
    },
]

function generateStarRating(rating) {
    const fullStarIcon = 'svg/icon _star_.svg'

    const starRatingContainer = document.createElement('div')
    starRatingContainer.classList.add('star-rating')

    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
        const starImage = document.createElement('img')
        starImage.src = i < fullStars ? fullStarIcon : ''
        starImage.alt = ''

        if (i < fullStars) {
            starImage.classList.add('filled')
        } else {
            starImage.classList.add('empty')
        }

        starRatingContainer.appendChild(starImage)
    }

    return starRatingContainer
}

function addReview(review) {
    const reviewBox = document.querySelector('.review-box')

    const reviewElement = document.createElement('div')
    reviewElement.classList.add('review')

    const profilePicture = document.createElement('img')
    profilePicture.src = review.profilePictureUrl
    profilePicture.alt = 'Profile Picture'
    profilePicture.classList.add('profile-picture')

    const nicknameElement = document.createElement('h3')
    nicknameElement.textContent = review.nickname
    nicknameElement.classList.add('nickname')

    const ratingElement = generateStarRating(review.rating)
    ratingElement.classList.add('star-rating')

    const commentElement = document.createElement('p')
    commentElement.textContent = review.comment
    commentElement.innerHTML = review.comment.replace(/\n/g, '<br>')
    commentElement.classList.add('comment')

    const dateElement = document.createElement('span')
    dateElement.textContent = review.date
    dateElement.classList.add('date')

    const photoElement = document.createElement('img')
    photoElement.src = review.photo
    photoElement.alt = 'Review Photo'
    photoElement.classList.add('photo')

    reviewElement.appendChild(profilePicture)
    reviewElement.appendChild(nicknameElement)
    reviewElement.appendChild(ratingElement)
    reviewElement.appendChild(commentElement)
    reviewElement.appendChild(dateElement)
    reviewElement.appendChild(photoElement)

    reviewBox.appendChild(reviewElement)
}

for (let i = reviews.length - 1; i >= Math.max(reviews.length - 3, 0); i--) {
    addReview(reviews[i])
}
*/

// 게시판 페이지 번호
window.addEventListener('DOMContentLoaded', (event) => {
    const buttonContainer = document.getElementById('buttonContainer')

    const buttonCount = 5
    const buttonSize = 30

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
            const button = createButton(i + 1)
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
        button.style.width = buttonSize + 'px'
        button.style.height = buttonSize + 'px'
        button.innerText = number
        return button
    }

    renderButton()
})

// 게시판 페이지 번호 업데이트 함수
function updatePagination(totalPages) {
    const buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        const button = createButton(i)
        buttonContainer.appendChild(button)
    }
}

// 페이지 버튼 생성 함수
function createButton(number) {
    const button = document.createElement('div')
    button.classList.add('button')
    button.id = number
    button.innerText = number

    button.addEventListener('click', () => {
        currentPage = number
        fetchAndDisplayReviews()
    })

    return button
}

/*
window.addEventListener('load', function () {
    fetchAndDisplayReviews()
}) */

// 페이지 이동
function modifyButton() {
    window.location.href = 'makeReivew.html'
}

function generateStarRating(rating) {
    const fullStarIcon = 'svg/icon _star_.svg'

    const starRatingContainer = document.createElement('div')
    starRatingContainer.classList.add('star-rating')

    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
        const starImage = document.createElement('img')
        starImage.src = i < fullStars ? fullStarIcon : ''
        starImage.alt = ''

        if (i < fullStars) {
            starImage.classList.add('filled')
        } else {
            starImage.classList.add('empty')
        }

        starRatingContainer.appendChild(starImage)
    }

    return starRatingContainer
}

const reviews = [
    {
        storeIdx: 1,
        storeName: '강남구고기짱',
        reviewer: 'test',
        review: {
            createdAt: '2023-08-17T01:27:41.029339',
            updatedAt: null,
            reviewIdx: 1,
            reviewContent: 'test',
            reviewStar: 3,
        },
    },
    {
        storeIdx: 1,
        storeName: '강남구고기짱',
        reviewer: 'test',
        review: {
            createdAt: '2023-08-17T01:27:50.478057',
            updatedAt: null,
            reviewIdx: 2,
            reviewContent: '쵝오',
            reviewStar: 4,
        },
    },
    {
        storeIdx: 1,
        storeName: '강남구고기짱',
        reviewer: 'asd',
        review: {
            createdAt: '2023-08-17T01:30:45.856244',
            updatedAt: null,
            reviewIdx: 3,
            reviewContent: '별로',
            reviewStar: 1,
        },
    },
]

function addReview(review) {
    const reviewBox = document.querySelector('.review-box')

    const reviewElement = document.createElement('div')
    reviewElement.classList.add('review')

    // const profilePicture = document.createElement('img')
    // profilePicture.src = review.review.profilePictureUrl
    // profilePicture.alt = 'Profile Picture'
    // profilePicture.classList.add('profile-picture')

    const nicknameElement = document.createElement('h3')
    nicknameElement.textContent = review.review.nickname
    nicknameElement.classList.add('nickname')

    const ratingElement = generateStarRating(review.review.rating)
    ratingElement.classList.add('star-rating')

    const commentElement = document.createElement('p')
    commentElement.textContent = review.review.comment
    commentElement.innerHTML = review.review.comment.replace(/\n/g, '<br>')
    commentElement.classList.add('comment')

    const dateElement = document.createElement('span')
    dateElement.textContent = review.review.date
    dateElement.classList.add('date')

    // reviewElement.appendChild(profilePicture)
    reviewElement.appendChild(nicknameElement)
    reviewElement.appendChild(ratingElement)
    reviewElement.appendChild(commentElement)
    reviewElement.appendChild(dateElement)

    reviewBox.appendChild(reviewElement)
}

// 더보기 이동
function moveToB() {
    window.location.href = 'aboutStoreMore.html' // b.html로 이동
}
/*
document.getElementById('MoreButton').addEventListener('click', moveToB)
*/

function fetchReviews(storeIdx) {
    $.ajax({
        url: host + `/reviews/stores/${storeIdx}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        success: function (response) {
            displayReviews(response)
        },
        error: function (xhr, status, error) {
            console.log('리뷰 목록 가져오기 오류:', error)
        },
    })
}

// 리뷰 목록 표시 함수
function displayReviews(reviews) {
    const reviewBox = document.querySelector('.review-box')

    reviews.forEach((review) => {
        const reviewElement = document.createElement('div')
        reviewElement.classList.add('review')

        // const profilePicture = document.createElement('img')
        // profilePicture.src = review.profilePictureUrl
        // profilePicture.alt = 'Profile Picture'
        // profilePicture.classList.add('profile-picture')

        const nicknameElement = document.createElement('h3')
        nicknameElement.textContent = review.reviewer
        nicknameElement.classList.add('nickname')

        const ratingElement = generateStarRating(review.review.reviewStar)
        ratingElement.classList.add('star-rating')

        const commentElement = document.createElement('p')
        commentElement.innerHTML = review.review.reviewContent.replace(
            /\n/g,
            '<br>'
        )
        commentElement.classList.add('comment')

        const dateElement = document.createElement('span')
        dateElement.textContent = review.review.createdAt.substr(0, 10)
        dateElement.classList.add('date')

        console.log(reviewElement)
        console.log(nicknameElement)
        console.log(ratingElement)

        // reviewElement.appendChild(profilePicture)
        reviewElement.appendChild(nicknameElement)
        reviewElement.appendChild(ratingElement)
        reviewElement.appendChild(commentElement)
        reviewElement.appendChild(dateElement)

        reviewBox.appendChild(reviewElement)
        console.log(reviewBox)
    })
}

// 초기화 함수
function initialize() {
    fetchReviews(window.storeIdx)
}

// 페이지 로드 시 초기화 함수 실행
window.addEventListener('load', initialize)

console.log(displayReviews(reviews))