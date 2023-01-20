import { api } from "../api.js";

const newURL = new URL(location.href);
// let blogData = JSON.parse(window.localStorage.getItem("blogs")) ?? [];
// const ourBlog = blogData.find(({ id }) => {
// return id == newURL.hash.replace("#", "");
// });
const postId = newURL.hash.replace("#", "");

const getPost = async (id) => {
  try {
    const getPost = await fetch(`${api}/post/get/${id}`);
    const data = await getPost.json();
    return data;
  } catch (error) {
    console.log("Error getting post: ", error.message);
  }
};
getPost(postId).then((res) => {
  console.log("This is the post: ", res);
  const form = document.querySelector("#form");
  form.title.value = res.title;
  form.content.value = res.content;
});

const updatePost = async (title, content, postId) => {
  try {
    const response = await fetch(`${api}/post/update/${postId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    if (data) {
      // location.href = "./index.html";
    } else {
      console.log("Error editing blog", error);
      // alert("Error editing blog");
    }
  } catch (error) {
    console.log("Error editing blog: ", error.message);
  }
};

// fetchPosts().then((res) => {
//   console.log(res);
//   res.forEach((item, index) => {});
// });

// const newURL = new URL(location.href);
// let blogData = JSON.parse(window.localStorage.getItem("blogs")) ?? [];
// const ourBlog = blogData.find(({ id }) => {
//   return id == newURL.hash.replace("#", "");
// });

const form = document.querySelector("#form");
let image = document.querySelector("#image");
const title = document.querySelector("#title");
// const topic = document.querySelector('#topic');
// const lang = document.querySelector('#lang');
const content = document.querySelector("#blog");
const previewImage = document.querySelector("#previewImage");

// title.value = ourBlog.title;
// topic.value = ourBlog.topic;
// lang.value = ourBlog.lang;
// blog.value = ourBlog.blog;
// previewImage.src = ourBlog.image;

async function showPreview(event) {
  if (event.target.files.length > 0) {
    previewImage.src = await readImage(event.target.files[0]);
    previewImage.style.display = "block";
  }
}

image.addEventListener("change", (e) => {
  showPreview(e);
});

async function uploadImage(e) {
  if (e.target.files.length > 0) {
    image = await readImage(e.target.files[0]);
  }
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (e) => {
      resolve(fileReader.result);
    });
  });
}

// handle submit
form.addEventListener("submit", (e) => {
  const title = form.title.value;
  const content = form.content.value;

  e.preventDefault();

  updatePost(title, content, postId);

  // const updatedBlog = blogData.map((item) => {
  //   if (item.id === ourBlog.id) {
  //     return {
  //       ...item,
  //       image: previewImage.src,
  //       title: title.value,
  //       topic: topic.value,
  //       lang: lang.value,
  //       blog: blog.value,
  //       updatedAt: Date.now(),
  //     };
  //   }
  //   return item;
  // });
  // localStorage.setItem("blogs", JSON.stringify(updatedBlog));
  // window.location.replace("index.html");
});
