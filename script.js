import { api } from "./api.js";

const form = document.querySelector("#form2");
const username = document.querySelector("#form-name");
const email = document.querySelector("#form-email");
const subject = document.querySelector("#form-subject");
const formMessage = document.querySelector("#message-1");

async function sendSms(e) {
  e.preventDefault();

  const data = {
    username: username.value,
    email: email.value,
    subject: subject.value,
    message: formMessage.value,
  };
  console.log(data);

  try {
    await fetch(`${api}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        e.target.reset();
        // window.location.reload()
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Error sending message:", error.message);
  }
}

// const userFeedback = JSON.parse(localStorage.getItem("userFeedback")) ?? []

let isGenuine = localStorage.getItem("authToken", "true");

const dataSignedIn = document.querySelector("[data-signedin]");

if (isGenuine) {
  dataSignedIn.dataset.signedin = "false";
} else {
  dataSignedIn.dataset.signedin = "true";
}

// function addFeedback(e) {
//   currentData = {
//     username: username.value,
//     email: email.value,
//     subject: subject.value,
//     theFeedback: formMessage.value,
//   }
//   userFeedback.push(currentData);
//   localStorage.setItem('userFeedback', JSON.stringify('userFeedback'));
// }

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  sendSms(e);
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
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const messageValue = formMessage.value.trim();

  if (usernameValue === "") {
    theError(username, "Name is required.");
  } else {
    theSuccess(username);
  }

  if (emailValue === "") {
    theError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    theError(email, "Please provide a valid email address.");
  } else {
    theSuccess(email);
  }

  if (subjectValue === "") {
    theError(subject, "Subject is required.");
  } else {
    theSuccess(subject);
  }

  if (messageValue === "") {
    theError(formMessage, "Message is required.");
  } else {
    theSuccess(formMessage);
  }

  if (usernameValue && emailValue && subjectValue && messageValue) {
    localStorage.setItem(usernameValue, emailValue, subjectValue, messageValue);
    // location.reload();
    // window.location.href = ''
  }
};
