// Elements selection
const toggleNavBtn = document.querySelector(".toggleNavBtn");
const navbarItems = document.querySelector(".navbar__nav__items");
const categoryContainer = document.querySelector(".categoryContainer");
const blogContainer = document.querySelector(".blog_contentDiv");

// variable init
let currentCategory = "All";

// 3-line button that toggle navigation in desktop view
toggleNavBtn.addEventListener("click", () => {
  navbarItems.classList.toggle("hidden");
});

// Get categories from JSON and print to html
const getCategories = async () => {
  // Get projects data from JSON
  const response = await fetch("./data/projects.json");
  const projects = await response.json();

  // print 'all' category which is not in JSON
  categoryContainer.insertAdjacentHTML(
    "beforeend",
    '<button class="DMsans category_button activeCategory">All</button>'
  );

  // print each categories
  projects.forEach((proj) => {
    categoryContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="DMsans category_button">${proj.category}</button>`
    );
  });
};
getCategories();

// Get Blog post from JSON and print to html
const getBlogs = async () => {
  // Get projects data from JSON
  const response = await fetch("./data/blogs.json");
  const blogs = await response.json();

  // print each blog
  blogs.forEach((blog) => {
    blogContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="blog_card">
      <img src="./assets/${blog.image}" alt="${blog.title}" />
      <h4 class="robotoCondensed">${blog.title}</h4>
      <p class="robotoCondensed">${blog.description}</p>
      <h5 class="DMsans">${blog.date}</h5>
    </div>`
    );
  });
};
getBlogs();
