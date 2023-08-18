var host = 'http://localhost:8080'

function storeJoin() {
    var storeId = $('#storeId').val()
    var storePw = $('#storePw').val()
    var storeEmail = $('#storeEmail').val()
    var address = $('#roadAddress').val()
    var addressDetail = $('#addressDetail').val()
    var storeSellerName = $('#storeSellerName').val()
    var sellerNumber = $('#sellerNumber').val()
    $.ajax({
        url: host + '/users/sellers/join',
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        data: JSON.stringify({
            'sellerId': storeId,
            'sellerPassword' : storePw,
            'sellerEmail': storeEmail,
            'sellerPhone': sellerNumber, //주인전화번호
            'sellerName': storeSellerName,
            'sellerAddress': address,
            'sellerDetailAddress': addressDetail
        }),
        success: function () {
            alert('회원가입에 성공하였습니다.')
            window.location.href = 'login.html'
        },
        error: function () {
            alert('회원가입에 실패하였습니다. 다시 시도하세요.')
        },
    })
}

function memberJoin() {
    var userId = $('#userId').val()
    var userPw = $('#userPw').val()
    var userEmail = $('#userEmail').val()
    var userName = $('#userName').val()
    var userPhone = $('#userPhone').val()
    var address = $('#roadAddress').val()
    var addressDetail = $('#addressDetail').val()
    $.ajax({
        url: host + '/users/join',
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        data: JSON.stringify({
            'userId': userId,
            'userPassword': userPw,
            'userEmail': userEmail,
            'userName': userName,
            'userPhone': userPhone,
            'userAddress': address,
            'userDetailAddress': addressDetail,
        }),
        success: function () {
            alert('회원가입에 성공하였습니다.')
            window.location.href = 'login.html'
        },
        error: function () {
            alert('회원가입에 실패하였습니다. 다시 시도하세요.')
        },
    })
}

function login() {
    var userId = $('#userId').val();
    var password = $('#userPw').val();
    $.ajax({
        url: host + '/users/login',
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        data: JSON.stringify({
            'userId': userId,
            'userPassword': password,
        }),
        success: function (data) {
            alert('로그인 성공')
            loginResult(data)
            window.location.href = 'index.html'
        },
        error: function(request) {
            alert(JSON.parse(request.responseText).message)
        }
    })
}

function loginResult(data){
    if(data.roleType === 'SELLER'){
        localStorage.setItem('seller', JSON.stringify(data))
    }
    if(data.roleType === 'BUYER'){
        localStorage.setItem('user', JSON.stringify(data.user))
    }
    localStorage.setItem('token', data.jwtToken)
}

function checkBusinessNum() {
    var businessNumber = $('#businessNum').val();
    $.ajax({
        url: host + '/users/business-number',
        method: 'POST',
        data: JSON.stringify({
            'businessNumber': businessNumber
        }),
        success: function(data) {
            alert('사업자 번호가 인증되었습니다.');
            // 사업자 번호 인증 성공 시 회원가입 버튼 활성화
            $('#joinButton').prop('disabled', false);
        },
        error: function() {
            alert('존재하지 않는 사업자 번호입니다. 사업자 번호를 확인해주세요.');
            // 사업자 번호 인증 실패 시 회원가입 버튼 비활성화 및 안내 메시지 표시
            $('#joinButton').prop('disabled', true);
        }
    });
}

function sendFindEmail(){
    var userEmail = $('#findPwEmail').val();
    $.ajax({
        url: host + '/users/password?email=' + userEmail,
        method: 'POST',
        success: function(data){
            alert('입력한 이메일로 임시 비밀번호가 전송되었습니다.');
            window.location.href='login.html';
        },
        error: function(){
            if(userEmail === '') {
                alert('이메일을 입력하세요');
            }else{
                alert('이메일을 다시 입력하세요');
            }
        }
    })
}