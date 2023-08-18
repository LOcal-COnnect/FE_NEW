var host = 'http://localhost:8080'
var token = localStorage.getItem('token');

window.onload = function() {
    $.ajax({
        url: host + '/stores/promotion?page=0&size=8&sort=like,desc',
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },

    })
    var data = {
        "promotionList": [
            {
                "promotionIdx": 1,
                "promotionTitle": "제목입니다.",
                "promotionContent": "게시글내용입니다.",
                "viewCount": 234

            },
            {
                "promotionIdx": 2,
                "promotionTitle": "제목입니다.게시글내용입니다게시글내용입니다게시글내용입니다게시글내용입니다게시글내용입니다게시글내용입니다게시글내용입니다",
                "promotionContent": "게시글내용입니다.제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다",
                "viewCount": 234

            },
            {
                "promotionIdx": 3,
                "promotionTitle": "제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.",
                "promotionContent": "게시글내용입니다.",
                "viewCount": 234

            }
        ]
    }

    var promotionList = document.querySelector('.mainHotContent');
    promotionList.innerHTML = ''

    for (var i = 0; i < 2; i++) {
        var proCard = document.createElement('div')
        proCard.className = 'promotionCard'
        proCard.id = data.promotionList[i].promotionIdx
        proCard.setAttribute('onClick', 'moveDetail(' + data.promotionList[i].promotionIdx + ')')

        proCard.innerHTML = `
        <img class="promotionStoreImg" src="img/storeImgSample.svg"/>
          <div class="promotionStoreInfo">
            <div>
              <img class="proStoreIcon" src="img/mainStoreIcon.svg" />
              <div class="promotionStoreInfoDetail">
                <div class="promotionStoreInfoName">
                  <p>${data.promotionList[i].promotionTitle}</p>
                  <p class="storeScore">4.89점</p>
                </div>
                <div class="starWrap">
                  <img src="img/yesStar.svg" />
                  <img src="img/yesStar.svg" />
                  <img src="img/yesStar.svg" />
                  <img src="img/yesStar.svg" />
                  <img src="img/yesStar.svg" />
                </div>
              </div>
            </div>
            <p>${data.promotionList[i].promotionContent}
            </p>
          </div>
    `
        promotionList.appendChild(proCard)
    }
}
function moveDetail(num) {
    localStorage.setItem('postNum', num)
    window.location.href = 'promotionDetail.html?id=' + num
}
