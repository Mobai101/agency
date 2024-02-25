// Elements selection
const toggleNavBtn = document.querySelector(".toggleNavBtn");
const navbarItems = document.querySelector(".navbar__nav__items");
const categoryContainer = document.querySelector(".categoryContainer");

// variable init
let currentCategory = "All";

// 3-line button that toggle navigation in desktop view
toggleNavBtn.addEventListener("click", () => {
  navbarItems.classList.toggle("hidden");
});

// Get categories from JSON and print to html
const getCategories = async () => {
  // Get projects data from JSON
  const response = await fetch("./assets/projects.json");
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
