import { api } from "../../api.js";
const newURL = new URL(location.href);
// console.log(newURL);
const postId = newURL.hash.replace("#", "");

const articleDOM = document.querySelector(".outter-div");
const viewComments = document.querySelector("#comment-viewer");

async function postLike() {
  try {
    const response = await fetch(`${api}/post/get/${postId}/likes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("authToken")}`,
      },
    });

    const blog = await response.json();
    // console.log(blog);
    return blog;
  } catch (error) {
    console.log("Failed to like : ", error.message);
  }
}

async function addComment() {
  try {
    const response = await fetch(`${api}/post/get/${postId}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        comment: document.querySelector("#text-message").value,
      }),
    });

    const blog = await response.json();
    document.querySelector("#text-message").value = "";
    console.log(blog);
    return blog;
  } catch (error) {
    console.log("Failed to send comment: ", error.message);
  }
}
document.querySelector(".sendComment").addEventListener("click", async (e) => {
  await addComment();
});

const fetchOnePost = async () => {
  try {
    const response = await fetch(`${api}/post/get/${postId}`, {
      method: "GET",
    });

    const blog = await response.json();
    return blog;
  } catch (error) {
    console.log("Error fetching blog: ", error.message);
  }
};
fetchOnePost().then((res) => {
  articleDOM.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="box-1">
      <p class="j-head">${res.title}</p>
      <p class="j-head-2">${res.createdOn}</p>
      <!-- <img class="blog-img" src="${res.image}" alt=""> -->
      <p class="j-head-3">${res.content}</p>

      <div>
            <i id="count" class="fa-solid fa-thumbs-up like"></i>
            <p id="like-count">${res.likes.length}</p>
          </div>
      </div>
      `
  );

  viewComments.innerHTML = "";
  res.comments.forEach((item) => {
    viewComments.innerHTML += `<div>${item.comment}</div>`;
  });
  document.querySelector("#count").addEventListener("click", async (e) => {
    const response = await postLike();
    // console.log(response);
    const likeDiv = e.target.closest("div").querySelector("p");
    if (response.statusCode == 200) {
      likeDiv.textContent = +likeDiv.textContent + 1;
    } else {
      likeDiv.textContent = +likeDiv.textContent - 1;
    }
    // console.log(response);
  });

  // document.querySelector("#like-count").innerHTML(res.likes.length);
});
