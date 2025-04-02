let signEmailInput = document.getElementById('signEmail');
let signPassword = document.getElementById('signPassword');
let alertMessage = document.getElementById('message');
let loginBtn = document.getElementById('loginBtn');
let userList = [];

if (localStorage.getItem('users') != null) {
    userList = JSON.parse(localStorage.getItem("users"));
}

function login() {
    if (checkInput()) {
        getAlert('All inputs are required', 'red');
    } else {
        if (ckeckEmailPass()) {
            window.location.href = 'home.html';
        } else {
            getAlert('Incorrect email or password', 'red');
        }
    }
}

function ckeckEmailPass() {
    for (let i = 0; i < userList.length; i++) {
        if (signEmailInput.value == userList[i].email && signPassword.value == userList[i].password) {
            localStorage.setItem('userName', userList[i].name);
            return true;
        }
    }
    return false;
}

function checkInput() {
    return signEmailInput.value.trim() === '' || signPassword.value.trim() === '';
}

function getAlert(text, color) {
    alertMessage.classList.replace('d-none', 'd-block');
    alertMessage.innerHTML = text;
    alertMessage.style.color = color;
}

loginBtn.addEventListener('click', login);
