import { api } from "../api.js";

const articles = document.querySelector("#t-body");
// const articlesData = JSON.parse(localStorage.getItem('blogs')) ?? [];
// console.log(articlesData);

const fetchPosts = async () => {
  try {
    const response = await fetch(`${api}/post/all`, {
      method: "GET",
    });

    const blogs = response.json();
    return blogs;
  } catch (error) {
    console.log("Error fetching blogs: ", error.message);
  }
};

fetchPosts()
  .then((res) => {
    console.log(res);
    res.forEach((item, index) => {
      articles.insertAdjacentHTML(
        "afterbegin",
        `
      <tr>
      <td>${index}</td>
      <td>
      <img src="${item.image}" alt="" srcset="" />
      </td>
      <td>${item.title}</td>
      <td>${item._id}</td>
      <td>${item.createdOn}</td>
      <td><button data-id = ${item._id} class= "delete-blog" name="button">Delete</button><a href="edit.html#${item._id}" rel="noopener noreferrer">
            <button id="edit" class="updateBlog">Edit</button>
            </a></td>
  
      </tr>
  
      `
      );
    });
  })
  .then(() => handleDelete());

// articlesData.forEach((item, index) => {

// })
function handleDelete() {
  const deleteButtons = [...document.getElementsByClassName("delete-blog")];
  // console.log(deleteButtons)
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const deleteID = e.target.dataset.id;
      // console.log(deleteID)
      deletePost(deleteID);
    });
  });
}

// const deleteButtons = [...document.getElementsByClassName("delete-blog")];
// console.log(deleteButtons)
// deleteButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const deleteID = e.target.dataset.id;
//     console.log(deleteID)
//       // deletePost(deleteID);
//   });
// });
async function deletePost(deleteID) {
  try {
    const response = await fetch(`${api}/post/delete/${deleteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("authToken")}`,
      },
    });

    const blogs = await response.json();
    if (blogs.success == true) {
      location.reload();
    } else {
      alert("Failed to delete blog");
    }
  } catch (error) {
    console.log("Error deleting blog: ", error.message);
  }
}
