// const form = document.querySelector('#form');
// let username = document.querySelector('#username');
// let email = document.querySelector('#email');
// let password = document.querySelector('#password');

// // logic to store users
// let currentUser = null

// // getting already existing users from local storage
// const users = JSON.parse(localStorage.getItem("users")) ?? []
// let isGenuine = localStorage.getItem("isGenuine", "true")

// // function to add new users
// function addOfData(e) {

//   currentUser = {
//     id: crypto.randomUUID(),
//     username: username.value,
//     email: email.value,
//     password: password.value,
//     previllege: (() => {
//       for(let user of users) {
//         if(user.previllege === "admin") {
//           return "guest"
//         }
//       }
//       return "admin"
//     })()
//   }
//   users.push(currentUser)
// localStorage.setItem('users', JSON.stringify(users));
// localStorage.setItem("isGenuine", "true")

// if(currentUser.previllege === "guest") {
//   location.href = "index.html"
// } else {
//   location.href = "dashboard.html"
// }

//   //  email = email.value;
//   //  password = password.value;

//     // localStorage.setItem('userEmail', email);
//     // localStorage.setItem('userpwd', password);


//     console.log(users);
//   }




// // my old js
// form.addEventListener('submit', e => {
//   e.preventDefault();

//   validateInputs() && addOfData();
//   // addData();
// });

// const theError = (element, message) => {
//   const inputField = element.parentElement;
//   const errorView = inputField.querySelector('.error-div');

//   errorView.innerText = message;
//   inputField.classList.add('error');
//   inputField.classList.remove('success');
// }

// const theSuccess = element => {
//   const inputField = element.parentElement;
//   const errorView = inputField.querySelector('.error-div');

//   errorView.innerText = '';
//   inputField.classList.add('success');
//   inputField.classList.remove('error');
// }

// const isValidEmail = email => {
//     const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return check.test(String(email).toLowerCase());
// }

// const validateInputs = () => {
//   const usernameValue = username.value.trim();
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();

//   if (usernameValue === '') {
//     theError(username, 'Username is required.');
//     // return false;
//   } else{
//     theSuccess(username);
//     // return true;
//   }

//   if (emailValue === '') {
//     theError(email, 'Email is required');
//     // return false;
//   } else if (!isValidEmail(emailValue)) {
//     theError(email, 'Please provide a valid email address.');
//     // return false;
//   } else {
//     theSuccess(email);
//     // return true;
//   }

//   if (passwordValue === '') {
//     theError(password, 'Password is required');
//     // return false;
//   } else if (passwordValue.length < 8) {
//     theError(password, 'Passowrd must be at least 8 charachters.');
//     // return false;
//   } else {
//     theSuccess(password);
//     // return true;
//   }

//   if (usernameValue && emailValue && passwordValue) {
//     return true;
//     // localStorage.setItem(usernameValue, emailValue, passwordValue);
//     // location.reload();
//     // window.location.href = 'My Brand-capstone project/index.html';
//   }else {
//     return false;
//   }

// };
