const toggleNavBtn = document.querySelector(".toggleNavBtn");
const navbarItems = document.querySelector(".navbar__nav__items");

toggleNavBtn.addEventListener("click", () => {
  navbarItems.classList.toggle("hidden");
});

const getJSON = async () => {
  const response = await fetch("./assets/projects.json");
  const projects = await response.json();
  console.log(projects);
};
getJSON();
