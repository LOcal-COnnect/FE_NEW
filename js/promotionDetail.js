var token = localStorage.getItem('token')
var host = '43.200.4.52:8080'
// var userIdx = 1

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search)
    window.postId = urlParams.get('id')
    getPromotionDetail(window.postId)
    console.log(postId)
}

const image = document.getElementById('goodnum')
let isClicked = false

var imgElement = document.getElementById('goodnum')

image.addEventListener('click', () => {
    if (isClicked) {
        image.classList.remove('active')
        imgElement.src = 'img/goodinversion.svg'
    } else {
        image.classList.add('active')
        imgElement.src = 'img/good.svg'
    }
    isClicked = !isClicked

    // 좋아요 여부 서버 요청 (GET 요청 등)
    $.ajax({
        url: host + `/like/${userIdx}/promotion/${promotionIdx}`,
        method: 'GET',
        success: function (data) {
            // 서버에서 받아온 좋아요 여부 값으로 isClicked 업데이트
            isClicked = data.isLiked
            //True,False값
        },
        error: function () {
            // 에러 처리
            console.error('좋아요 여부를 불러오는 데 실패했습니다.')
        },
    })
})

$('#goodnum').click(function () {
    const likeCountElement = $('#likeCount')

    // 좋아요 여부 서버 요청 (GET 요청 등)
    $.ajax({
        url: host + `/like/${userIdx}/promotion/${promotionIdx}`,
        method: 'GET',
        success: function (data) {
            isClicked = data.isLiked // 서버에서 받아온 좋아요 여부 값으로 업데이트

            if (!isClicked) {
                $.ajax({
                    url:
                        host +
                        `/like/${userIdx}/promotion/${promotionIdx}`,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        goodnum: $('#goodnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/like/promotion/${promotionIdx}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                goodnum: $('#goodnum').val(),
                            }),
                            success: function (data) {
                                likeCountElement.text(data.likeCount) // 서버에서 받은 좋아요 수로 화면 업데이트
                            },
                            error: function () {
                                alert('좋아요 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('좋아요가 입력되지 않았습니다.')
                    },
                })
            } else {
                $.ajax({
                    url:
                        host +
                        `/like/${userIdx}/promotion/${promotionIdx}`,
                    method: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postid: 1, // 게시물 ID
                        goodnum: $('#goodnum').val(),
                    }),
                    success: function (data) {
                        $.ajax({
                            url: host + `/like/promotion/${promotionIdx}`,
                            method: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                postid: 1, // 게시물 ID
                                goodnum: $('#goodnum').val(),
                            }),
                            success: function (data) {
                                likeCountElement.text(data.likeCount) // 서버에서 받은 좋아요 수로 화면 업데이트
                            },
                            error: function () {
                                alert('좋아요 수를 받아오지 않았습니다.')
                            },
                        })
                    },
                    error: function () {
                        alert('좋아요 삭제에 실패했습니다.')
                    },
                })
            }
        },
        error: function () {
            console.error('좋아요 여부를 불러오는 데 실패했습니다.')
        },
    })
})

function getPromotionDetail(postId) {
    $.ajax({
        url: host + '/stores/promotion/' + postId,
        method: 'GET',
        success: function (data) {},
    })

    var data = {
        promotionTitle: '제목입니다.',
        promotionContent: '내용입니다.',
        promotionImageList: [],
    }
    var title = document.querySelector('.postTitle')
    var content = document.querySelector('.postContentWrap')

    title.innerText = data.promotionTitle
    content.innerText = data.promotionContent
}

// 작성한 댓글 하단에 불러오기
document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.querySelector('.commentInput input')
    const commentList = document.querySelector('.commentList')

    commentInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const commentContent = commentInput.value
            if (commentContent.trim() !== '') {
                const commentItem = document.createElement('div')
                commentItem.className = 'commentItem'

                const commentProfile = document.createElement('img')
                commentProfile.src = 'img/commentProfile.svg'
                commentProfile.className = 'commentProfile'

                const commentContentDiv = document.createElement('div')
                commentContentDiv.className = 'commentContent'

                const commentInfoDiv = document.createElement('div')
                commentInfoDiv.className = 'commentInfo'

                const commentTitle = document.createElement('div')
                commentTitle.className = 'commentTitle'
                commentTitle.textContent = '요를레히호'

                const commentTime = document.createElement('div')
                commentTime.className = 'commentTime'
                commentTime.textContent = '방금'

                const commentText = document.createElement('div')
                commentText.className = 'comment'
                commentText.textContent = commentContent

                const buttonContainer = document.createElement('div')
                buttonContainer.className = 'buttonTwo'

                const editButton = document.createElement('button')
                editButton.className = 'editButton'
                editButton.textContent = '수정하기'
                editButton.addEventListener('click', function () {
                    const updatedContent = inputField.value
                    const commentIdx = commentItem.dataset.commentId
                    commentText.textContent = updatedContent

                    saveButton.style.display = 'none'

                    editButton.style.display = 'block'
                    deleteButton.style.display = 'block'
                })

                const deleteButton = document.createElement('button')
                deleteButton.className = 'deleteButton'
                deleteButton.textContent = '삭제하기'
                deleteButton.addEventListener('click', function () {
                    commentList.removeChild(commentItem)
                })

                buttonContainer.appendChild(editButton)
                buttonContainer.appendChild(deleteButton)

                commentInfoDiv.appendChild(commentTitle)
                commentInfoDiv.appendChild(commentTime)

                commentContentDiv.appendChild(commentInfoDiv)
                commentContentDiv.appendChild(commentText)

                commentItem.appendChild(commentProfile)
                commentItem.appendChild(commentContentDiv)
                commentItem.appendChild(buttonContainer)

                commentList.appendChild(commentItem)

                commentInput.value = ''
            }
        }
    })
})

// 댓글 등록 ajax
var token = localStorage.getItem('token')
document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.querySelector('#commentInput')
    const commentList = document.querySelector('.commentList')

    console.log(commentInput)

    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            console.log('enter')
            const commentContent = commentInput.value
            console.log(commentContent)
            if (commentContent.trim() !== '') {
                const url = `/comment/${window.postId}/users/${userIdx}`
                const requestData = {
                    content: commentContent,
                }

                $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(requestData),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                    success: function (data) {
                        const commentItem = document.createElement('div')
                        commentItem.className = 'commentItem'

                        const commentContentDiv = document.createElement('div')
                        commentContentDiv.className = 'commentContent'

                        const commentInfoDiv = document.createElement('div')
                        commentInfoDiv.className = 'commentInfo'

                        const commentText = document.createElement('div')
                        commentText.className = 'comment'
                        commentText.textContent = commentContent

                        const buttonContainer = document.createElement('div')
                        buttonContainer.className = 'buttonTwo'

                        const editButton = document.createElement('button')
                        editButton.className = 'editButton'
                        editButton.textContent = '수정하기'
                        editButton.addEventListener('click', function () {
                            const updatedContent = inputField.value
                            const commentIdx = commentItem.dataset.commentId
                            commentText.textContent = updatedContent

                            saveButton.style.display = 'none'

                            editButton.style.display = 'block'
                            deleteButton.style.display = 'block'
                        })

                        const deleteButton = document.createElement('button')
                        deleteButton.className = 'deleteButton'
                        deleteButton.textContent = '삭제하기'
                        deleteButton.addEventListener('click', function () {
                            commentList.removeChild(commentItem)
                        })

                        buttonContainer.appendChild(editButton)
                        buttonContainer.appendChild(deleteButton)

                        commentInfoDiv.appendChild(commentTitle)
                        commentInfoDiv.appendChild(commentTime)
                        commentContentDiv.appendChild(commentInfoDiv)
                        commentContentDiv.appendChild(commentText)
                        commentContentDiv.appendChild(buttonContainer)

                        commentItem.appendChild(commentProfile)
                        commentItem.appendChild(commentContentDiv)

                        commentList.appendChild(commentItem)

                        commentInput.value = ''
                    },
                    error: function (xhr, status, error) {
                        console.error('댓글 등록 오류:', error)
                        console.log(xhr.responseText)
                    },
                })
            }
        }
    })
})

// 댓글 조회 ajax
var token = localStorage.getItem('token')
document.addEventListener('DOMContentLoaded', function () {

    function getComments(promotionIdx) {
        return new Promise((resolve, reject) => {
            const url = `/comment/promotion/${promotionIdx}`

            $.ajax({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                success: function (data) {
                    resolve(data)
                },
                error: function (error) {
                    reject(error)
                },
            })
        })
    }

    getComments(promotionIdx)
        .then(function (commentList) {
            console.log(commentList)

            const commentContainer = document.querySelector('.commentContainer')
            commentList.forEach(function (comment) {
                const commentItem = document.createElement('div')
                commentItem.className = 'commentItem'

                const createdAt = new Date(comment.createdAt).toLocaleString()
                const commentContent = comment.commentContent

                commentItem.innerHTML = `<p>${createdAt} - ${commentContent}</p>`

                commentContainer.appendChild(commentItem)
            })
        })
        .catch(function (error) {
            console.log('Error fetching comments:', error)
        })
})

// 댓글 수정 ajax
function updateComment(commentIdx, content) {
    return new Promise((resolve, reject) => {
        const url = `/comment/${commentIdx}`
        const requestData = {
            content: content,
        }

        $.ajax({
            url: url,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            success: function () {
                resolve()
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const commentList = document.querySelector('.commentList')

    commentList.addEventListener('click', function (event) {
        const editButton = event.target.closest('.editButton')
        if (editButton) {
            const commentItem = editButton.closest('.commentItem')
            const commentText = commentItem.querySelector('.comment')
            const deleteButton = commentItem.querySelector('.deleteButton')
            const saveButton = document.createElement('button')
            saveButton.className = 'saveButton'
            saveButton.textContent = '수정 완료'

            // 현재 댓글 내용 저장
            const currentContent = commentText.textContent

            const inputField = document.createElement('input')
            inputField.type = 'text'
            inputField.value = currentContent

            commentText.innerHTML = ''
            commentText.appendChild(inputField)
            commentItem.appendChild(saveButton)

            editButton.style.display = 'none'
            deleteButton.style.display = 'none'

            saveButton.addEventListener('click', function () {
                const updatedContent = inputField.value

                console.log(updatedContent)
                console.log(commentIdx)

                updateComment(commentIdx, updatedContent)
                    .then(() => {
                        commentText.textContent = updatedContent

                        editButton.style.display = 'block'
                        deleteButton.style.display = 'block'

                        commentItem.removeChild(saveButton)
                    })
                    .catch((error) => {
                        console.log('댓글 수정 실패:', error)
                    })
            })
        }
    })
})

/*
// 댓글 수정 API 호출 함수 (가정)
function updateComment(commentId, content) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = true
            if (isSuccess) {
                resolve()
            } else {
                reject(new Error('댓글 수정 실패'))
            }
        }, 1000)
    })
} */

// 댓글 삭제 ajax
var token = localStorage.getItem('token')
function deleteComment(commentIdx) {
    return new Promise((resolve, reject) => {
        const url = `/comment/${commentIdx}`

        $.ajax({
            url: url,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            success: function () {
                resolve()
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const commentList = document.querySelector('.commentList')

    commentList.addEventListener('click', function (event) {
        const deleteButton = event.target.closest('.deleteButton')
        if (deleteButton) {
            const commentItem = deleteButton.closest('.commentItem')
            /*
            const commentIdx = commentItem.dataset.commentId */


            deleteComment(commentIdx)
                .then(() => {
                    commentList.removeChild(commentItem)
                })
                .catch((error) => {
                    console.log('댓글 삭제 오류:', error)
                })
        }
    })
})
