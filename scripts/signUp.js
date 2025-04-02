let userNameInput = document.getElementById('userNameInput')
let emailInput = document.getElementById('emailInput')
let passwordInput = document.getElementById('passwordInput')
let signUpBtn = document.getElementById('signUpBtn')
let alertMessage = document.getElementById('message')
let userList = [];


if (localStorage.getItem('users') != null) {
    userList = JSON.parse(localStorage.getItem("users"))
}
function signUp() {
    let userAccount = {
        name: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    if (!userAccount.name || !userAccount.email || !userAccount.password) {
        getAlert('All Inputs Required', 'red');
        return; // بيوقف الدالة لو فيه حقل فاضي
    }

    // فاليديشن للاسم (على الأقل 3 حروف)
    if (userAccount.name.length < 3) {
        getAlert('Name must be at least 3 characters', 'red');
        return;
    }

    // فاليديشن للإيميل (تنسيق بسيط)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // تنسيق إيميل بسيط
    if (!emailPattern.test(userAccount.email)) {
        getAlert('Please enter a valid email', 'red');
        return;
    }

    // فاليديشن للباسورد (على الأقل 6 حروف)
    if (userAccount.password.length < 6) {
        getAlert('Password must be at least 6 characters', 'red');
        return;
    }

    // التحقق من وجود الإيميل
    if (checkEmailExist(userAccount.email)) {
        getAlert('Email Already Exist', 'red');
        return;
    }
    userList.push(userAccount);
    localStorage.setItem('users', JSON.stringify(userList));
    clear();
    getAlert('Success', 'green');
    window.location.href = 'login.html';
    console.log(userList);
}




function getAlert(text, color) {
    alertMessage.classList.replace('d-none', 'd-block')
    alertMessage.innerHTML = text;
    alertMessage.style.color = color;
}


function clear() {
    userNameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}

function checkInput() {
    if (userNameInput.value == '' || emailInput.value == '' || passwordInput.value == '')

        return true
    else
        return false

}

function checkEmailExist() {
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].email == emailInput.value)
            return true;
    }
}
signUpBtn.addEventListener('click', signUp)
console.log(userList);















// function signUp() {
//     let userAccount = {
//         name: userNameInput.value,
//         email: emailInput.value,
//         pasword: passwordInput.value
//     }
//     if (checkInput() == true) {
//         getAlert('All Inputs Required', 'red');
//     }
//     else {
//         if(checkEmailExist() == true)
//         {
//             getAlert('Email Already Exist', 'red');
//         }
//         else
//         {
//             userList.push(userAccount);
//             localStorage.setItem('users', JSON.stringify(userList));
//             clear();
//             getAlert('Success', 'green');
//             console.log(userList);
//         }
//     }
// }
