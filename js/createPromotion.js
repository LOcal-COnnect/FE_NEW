var storeInfo = JSON.parse(localStorage.getItem('seller'))
var token = localStorage.getItem('token')
var host = 'http://localhost:8080'

function handleImageSelection(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        const reader = new FileReader()

        reader.onload = function () {
            const imgDataUrl = reader.result
            const pictureDiv = event.target.parentElement
            pictureDiv.style.backgroundImage = `url(${imgDataUrl})`
            pictureDiv.textContent = ''
            pictureDiv.backgroundColor = 'white'
        }

        reader.readAsDataURL(selectedFile)
    }
}


function createPromotion(){
    const title = document.querySelector('.titleInput')
    const content = document.querySelector('.contentInput')
    $.ajax({
        url: host + '/promotion',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify({
            // 'sellerIdx' : storeInfo.sellerIdx,
            'promotionTitle': title.value,
            'promotionContent' : content.value
        }),success: function(){
            alert('홍보글이 작성되었습니다.')
            window.location.href='storeMypage.html'
        },error: function(){
            alert('홍보글 작성이 취소되었습니다.')
            window.location.href='storeMypage.html'
        }
    })
}
