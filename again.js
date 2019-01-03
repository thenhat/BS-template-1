// document.getElementById('id');
// document.getElementsByTagName('tag-name');
// document.getElementsByClassName('class-name');
// document.querySelector()
var btnSubmit = document.forms['register-form']['btnSubmit'];
btnSubmit.onclick = function () {
    if(validateForm()){
        // Gửi dữ liệu đi.
        doRegister();
    }
}

function doRegister() {
        var _firstName = document.forms['register-form']['firstName'].value;
        var _lastName = document.forms['register-form']['lastName'].value;
        var _password = document.forms['register-form']['password'].value;
        var _address = document.forms['register-form']['address'].value;
        var _phone = document.forms['register-form']['phone'].value;
        var _avatar = document.forms['register-form']['avatar'].value;
        var _gender = document.forms['register-form']['gender'].value;
        var _email = document.forms['register-form']['email'].value;
        var _birthday = document.forms['register-form']['birthday'].value;

        var registerInformation = {
            firstName: _firstName,
            lastName: _lastName,
            password: _password,
            address: _address,
            phone: _phone,
            avatar: _avatar,
            gender: _gender,
            email: _email,
            birthday: _birthday
        };

        var jsonRegisterInformation = JSON.stringify(registerInformation);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 201) {
                alert('Register success!');
            } else if (xhr.readyState == 4) {
                alert('Register fails, please try again! ' + xhr.responseText);
            }
        };
        xhr.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(jsonRegisterInformation);

}

// Kiểm tra dữ liệu người dùng trước khi gửi đi.
// Trả về true hoặc false.
function validateForm() {
    // Lưu trữ trạng thái validate của cả form.
    var isValid = true;
    // Lưu trữ trạng thái validate của first name.
    var isValidFirstName = true;
    // Lưu trữ trạng thái validate của last name.
    var isValidLastName = true;
    // Lưu trữ trạng thái validate của password.
    var isValidPassword = true;
    // Lưu trữ trạng thái validate của confirm password.
    var isValidConfirmPassword = true;

    // Lấy ra input text có tên là 'firstName' nằm trong form 'register-form'.
    var txtFirstName = document.forms['register-form']['firstName'];
    // Lấy ra phần tử span nằm kế tiếp của txtFirstName. (dùng để hiển thị thông báo lỗi)
    var msgFirstName = txtFirstName.nextElementSibling;
    // Kiểm tra dữ liệu trong input txtFirstName. Nếu không có dữ liệu thì tạo thông báo lỗi.
    if (txtFirstName.value == null || txtFirstName.value.length == 0) {
        // Xoá class msg-success (chuyển chữ thành xanh) khỏi span thông báo lỗi (nếu có).
        msgFirstName.classList.remove('msg-success');
        // Thêm class msg-error (chuyển chữ thành màu đỏ)
        msgFirstName.classList.add('msg-error');
        // Chuyển nội dung text.
        msgFirstName.innerHTML = 'First name is required!';
        // Chuyển trạng thái validate của fistName thành false.
        isValidFirstName = false;
    } else {
        msgFirstName.classList.remove('msg-error');
        msgFirstName.classList.add('msg-success');
        msgFirstName.innerHTML = 'Ok.';
    }

    var txtLastName = document.forms['register-form']['lastName'];
    var msgLastName = txtLastName.nextElementSibling;
    if (txtLastName.value == null || txtLastName.value.length == 0) {
        msgLastName.classList.remove('msg-success');
        msgLastName.classList.add('msg-error');
        msgLastName.innerHTML = 'Last name is required!';
        isValidLastName = false;
    } else {
        msgLastName.classList.remove('msg-error');
        msgLastName.classList.add('msg-success');
        msgLastName.innerHTML = 'Ok.';
    }

    var pwdPassword = document.forms['register-form']['password'];
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

    var pwdConfirmPassword = document.forms['register-form']['confirmPassword'];
    var msgConfirmPassword = pwdConfirmPassword.nextElementSibling;
    if (pwdConfirmPassword == null || pwdConfirmPassword.value.length == 0 || pwdConfirmPassword.value != pwdPassword.value) {
        msgConfirmPassword.classList.remove('msg-success');
        msgConfirmPassword.classList.add('msg-error');
        msgConfirmPassword.innerHTML = 'Confirm password doesn\'t match!';
        isValidConfirmPassword = false;
    } else {
        msgConfirmPassword.classList.remove('msg-error');
        msgConfirmPassword.classList.add('msg-success');
        msgConfirmPassword.innerHTML = 'Ok!';
    }
    isValid = isValidFirstName && isValidLastName && isValidPassword && isValidConfirmPassword;
    return isValid;
}