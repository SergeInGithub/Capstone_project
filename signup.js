import { api } from "./api.js";

console.log(api);

const form = document.querySelector("#form");
let fullName = document.querySelector("#fullName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

// // logic to store users
// let currentUser = null

// // getting already existing users from local storage
// const users = JSON.parse(localStorage.getItem("users")) ?? [];
// let isGenuine = localStorage.getItem("isGenuine", "true");

// let isGenuine = localStorage.getItem("isGenuine", "true")
// let id = users.length
function setCookie(name, value, expirationTime) {
  const date = new Date();
  date.setTime(date.getTime() + expirationTime * 24 * 60 * 60 * 1000);
  const willExpire = `willExpire = ${date.toUTCString()}`;
  document.cookie = `${name}=${value}=${willExpire};path=/`;
}

// function to add new users
async function addOfData(fullName, email, password) {
  try {
    const response = await fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });
    const data = await response.json().then((data) => {
      if (data.fullName) {
        location.href = "/index.html";
      }
      if (data.success == false) {
        document.querySelector("#result").innerHTML = data.message;
      }
    });
  } catch (error) {
    console.log("Error signing in a user: ", error.message);
  }
  // const users = JSON.parse(localStorage.getItem("users")) ?? [{
  //   id: 0,
  //   username: "ny.serge",
  //   email: "lillserg7@gmail.com",
  //   password: "myPassword",
  // }]
  // let isGenuine = localStorage.getItem("isGenuine", "true")
  // let id = users.length

  // currentUser = {
  //   id: id,
  //   username: username.value,
  //   email: email.value,
  //   password: password.value,
  // }
  // users.push(currentUser)
  // localStorage.setItem('users', JSON.stringify(users));
  // localStorage.setItem("isGenuine", "true")

  // if (users.id === 0 && users.username === "ny.serge" && users.email === "lillserg7@gmail.com" && users.password === "myPassword") {
  //   location.href = "dashboard.html"
  // } else {
  //   location.href = "index.html"
  // }
}

// my old js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = form.fullName.value;
  const email = form.email.value;
  const password = form.password.value;
  // console.log(fullName, email, password);
  validateInputs() && addOfData(fullName, email, password);
});

const theError = (element, message) => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector(".error-div");

  errorView.innerText = message;
  inputField.classList.add("error");
  inputField.classList.remove("success");
};

const theSuccess = (element) => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector(".error-div");

  errorView.innerText = "";
  inputField.classList.add("success");
  inputField.classList.remove("error");
};

const isValidEmail = (email) => {
  const check =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return check.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (fullNameValue === "") {
    theError(fullName, "fullName is required.");
    // return false;
  } else {
    theSuccess(fullName);
    // return true;
  }

  if (emailValue === "") {
    theError(email, "Email is required");
    // return false;
  } else if (!isValidEmail(emailValue)) {
    theError(email, "Please provide a valid email address.");
    // return false;
  } else {
    theSuccess(email);
    // return true;
  }

  if (passwordValue === "") {
    theError(password, "Password is required");
    // return false;
  } else if (passwordValue.length < 8) {
    theError(password, "Password must be at least 8 charachters.");
    // return false;
  } else {
    theSuccess(password);
    // return true;
  }

  if (fullNameValue && emailValue && passwordValue) {
    return true;
    // localStorage.setItem(usernameValue, emailValue, passwordValue);
    // location.reload();
    // window.location.href = 'My Brand-capstone project/index.html';
  } else {
    return false;
  }
};
