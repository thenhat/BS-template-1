// document.getElementById('id');
// document.getElementsByTagName('tag-name');
// document.getElementsByClassName('class-name');
// document.querySelector()
var btnSubmit = document.forms['login-form']['btnSubmit'];
btnSubmit.onclick = function () {
    // if (validateForm()) {
    //     // Gửi dữ liệu đi.
    //     doLogin();
    // }
    alert(localStorage.getItem('token-key'));
}

function doLogin() {
    var _password = document.forms['login-form']['password'].value;
    var _email = document.forms['login-form']['email'].value;

    var loginInformation = {
        password: _password,
        email: _email
    };

    var jsonLoginInformation = JSON.stringify(loginInformation);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            var responseData = JSON.parse(xhr.responseText);
            alert('Login success with ID: ' + responseData.token);
            localStorage.setItem('token-key', responseData.token);
        } else if (xhr.readyState == 4) {
            var responseData = JSON.parse(xhr.responseText);
            alert('Login fails, please try again! ' + xhr.responseText);
        }
    };
    xhr.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members/authentication', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonLoginInformation);
}

// Kiểm tra dữ liệu người dùng trước khi gửi đi.
// Trả về true hoặc false.
function validateForm() {
    // Lưu trữ trạng thái validate của cả form.
    var isValid = true;
    var isValidPassword = true;

    var pwdPassword = document.forms['login-form']['password'];
    var msgPassword = pwdPassword.nextElementSibling;
    if (pwdPassword.value == null || pwdPassword.value.length == 0) {
        msgPassword.classList.remove('msg-success');
        msgPassword.classList.add('msg-error');
        msgPassword.innerHTML = 'Password is required!';
        isValidPassword = false;
    } else {
        msgPassword.classList.remove('msg-error');
        msgPassword.classList.add('msg-success');
        msgPassword.innerHTML = 'Ok.';
    }

    isValid = isValidPassword;
    return isValid;
}