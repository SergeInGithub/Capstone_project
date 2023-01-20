import { api } from '../api.js'


const createArticle = async (title, content) => {
  try {
    const response = await fetch(`${api}/post/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('authToken')}`
        
      },
      body: JSON.stringify({title, content})
    })
    const data = await response.json()
    if (data) {
      location.reload()
    } else {
      alert('Error creating blog')
    }
  } catch (error) {
    console.log('Error creating blog:', error.message);
  }
  
}

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens/deletes the modal
const btn = document.getElementById("myBtn");
const deleteBtn = document.querySelector('#deleteBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// logic of creating a blog and storing it in local localStorage
const form = document.querySelector('#form');
let image = document.querySelector('#image');
// const title = document.querySelector('#title');
// const topic = document.querySelector('#topic');
// const lang = document.querySelector('#lang');
// const blog = document.querySelector('#blog');
const previewImage = document.querySelector('#previewImage');


image.addEventListener('change', e=> {
  uploadImage(e);

})

async function uploadImage(e) {
  if(e.target.files.length > 0){
    image = await readImage(e.target.files[0]);
  }

}

function readImage (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (e) => {
      resolve(fileReader.result);
    });
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if(validateInputs() == true) {


      const title = form.title.value;
      const content = form.content.value;
      console.log(title, content);
    createArticle(title, content);
    // clearForm();
    // window.location.href = 'index.html';
  }

})

previewImage.src = image;

async function showPreview(event) {
  if (event.target.files.length > 0) {
    previewImage.src = await readImage(event.target.files[0]);
    previewImage.style.display = "block";
  }
}

image.addEventListener('change', e=> {
  showPreview(e);

})

function clearForm() {
  form.title.value = '';
  form.content.value = '';
  // lang.value = '';
  // blog.value = '';

}


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

const validateInputs = () => {
  const titleValue = form.title.value.trim();
  const contentValue = form.content.value.trim();
  // const langValue = lang.value.trim();
  // const blogValue = blog.value.trim();

  if (titleValue === '') {
    theError(title, 'Title is required.');
  } else{
    theSuccess(title);
  }

  if (contentValue === '') {
    theError(content, 'Topic is required');
  }  else {
    theSuccess(content);
  }

  // if (langValue === '') {
  //   theError(lang, 'Language is required.');
  // } else{
  //   theSuccess(lang);
  // }

  // if (blogValue === '') {
  //   theError(blog, 'Blog is required.');
  // } else{
  //   theSuccess(blog);
  // }

  if (titleValue && contentValue) {
    return true;
    // localStorage.setItem(titleValue, topicValue, langValue, blogValue);
    // location.reload();
    // window.location.href = ''
  } else {
    return false;
  }

};
