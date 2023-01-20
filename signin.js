import { api } from "./api.js";

console.log(api);

const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

function setCookie(name, value, expirationTime) {
  const date = new Date();
  date.setTime(date.getTime() + (expirationTime * 24 * 60 * 60 * 1000));
  const willExpire = `willExpire = ${date.toUTCString()}`;
  document.cookie = `${name}=${value}=${willExpire};path=/`;
}

const signIn = async (email, password) => {
  try {
    const response = await fetch(`${api}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    console.log(data);
      if(data.success == false){
        document.querySelector('#result').innerHTML = data.message
        return
      } else {
        const token = data
        const parts = token.split('.')
        const payload = JSON.parse(atob(parts[1]))
        console.log(payload);
        localStorage.setItem('authToken', token)
        if (payload.isAdmin == true) {
          localStorage.setItem('isAdmin', true)
          window.location.href = './dashboard.html'
        } else {
          window.location.href = './index.html' 
        }
      }

    // .then(data => {
    //   // const email = 'serge@gmail.com'
      
    //   if(data.success == false){
    //     document.querySelector('#result').innerHTML = data.message
    //     return
    //   }
    //   // if(data.userId == adminId){
    //   //   setCookie('token', data.token, 3);
    //   //    window.location.href = './dashboard.html'
    //   // }
    //   if(data.email == email){
    //     window.location.href = './dashboard.html'
    //   } else {
    //     window.location.href = './index.html'
    //   }

    // })
  } catch (error) {
    console.log('Error signing in a user: ', error.message)
  }
}


function login(e) {

  e.preventDefault();
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;

  signIn(email, pass);

}

// my old js

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs() && login(e);
});

const theError = (element, message) => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector('.error-div');

  errorView.innerText = message;
  inputField.classList.add('error');
  inputField.classList.remove('success');
}

const theSuccess = element => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector('.error-div');

  errorView.innerText = '';
  inputField.classList.add('success');
  inputField.classList.remove('error');
}

const isValidEmail = email => {
  const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return check.test(String(email).toLowerCase());
}

const validateInputs = () => {
  // const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // if (usernameValue === '') {
  //   theError(username, 'Username is required.');
  //   // return false;
  // } else {
  //   theSuccess(username);
  //   // return true;
  // }

  if (emailValue === '') {
    theError(email, 'Email is required');
    // return false;
  } else if (!isValidEmail(emailValue)) {
    theError(email, 'Please provide a valid email address.');
    // return false;
  } else {
    theSuccess(email);
    // return true;
  }

  if (passwordValue === '') {
    theError(password, 'Password is required');
    // return false;
  } else if (passwordValue.length < 8) {
    theError(password, 'Passowrd must be at least 8 charachters.');
    // return false;
  } else {
    theSuccess(password);
    // return true;
  }

  if (emailValue && passwordValue) {
    return true;
    // localStorage.setItem(usernameValue, emailValue, passwordValue);
    // location.reload();
    // window.location.href = 'My Brand-capstone project/index.html';
  } else {
    return false;
  }

};
