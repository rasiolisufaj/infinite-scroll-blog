const filterInputEl = document.getElementById("filter");
const postsContainerEl = document.querySelector(".posts-container");
const loaderEl = document.querySelector(".loader");
let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = response.json();

  return data;
  // if (response.status === 200) {
  //   const data = await response.json();
  //   return data;
  // } else {
  //   throw new Error((err) => err.message);
  // }
}

// Show posts | Update UI
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `;

    postsContainerEl.appendChild(div);
  });
}

showPosts();

// Show Loader & Fetch more posts
function showLoading() {
  loaderEl.classList.add("show");

  setTimeout(() => {
    loaderEl.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Scroll Event
window.addEventListener("scroll", () => {
  // let documentHeight = document.body.scrollHeight;
  // let currentScroll = window.scrollY + window.innerHeight;
  // let modifier = 50;
  // if (currentScroll + modifier > documentHeight) {
  //   showLoading();
  // }
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
