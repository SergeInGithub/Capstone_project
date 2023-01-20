import { api } from "./api.js";
const articles = document.querySelector('#outter-blog');

const fetchPosts = async () => {
  try {
    const response = await fetch(`${api}/post/all`, {
      method: 'GET',
    })
  
    const blogs = response.json();
    return blogs;
  } catch (error) {
    console.log('Error fetching blogs: ', error.message)
  }
}

fetchPosts().then(res => {
  console.log(res)
  res.forEach((item, index) => {
    articles.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="box-1">
        <a href="blog-comment/javas.html#${item._id}">
          <p class="j-head">${item.title}</p>
          <p class="j-head-2">${item.createdOn}</p>
          <!-- <p class="j-head-3">${item.content}</p> -->
          <img class="blog-img" src="${item.image}" alt="">
        </a>
      </div>
  
      `
    )
  });
});



