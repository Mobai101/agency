//#region General Section ##################################################################################

const toggleNavBtn = document.querySelector(".toggleNavBtn");
const navbarItems = document.querySelector(".navbar_nav_items");
const navbarMobileItems = document.querySelector(".navbar_nav_items_mobile");

const blogContainer = document.querySelector(".blog_contentDiv");

const categoryContainer = document.querySelector(".categoryContainer");
const advantageImgDiv = document.querySelector(".advantageSection_ImgDiv");
const youtubeBtn = document.querySelector(".advantageSection_ImgDiv_btn");
const youtubeDiv = document.querySelector(".youtubeDiv");
const closeYoutubeBtn = document.querySelector(".closeYoutubeBtn");

const clientBtnLeft = document.querySelector(".clientBtnLeft");
const clientBtnRight = document.querySelector(".clientBtnRight");
const clientSayCardArr = document.querySelectorAll(".clientSay_card");

//#endregion

//#region nav Section ######################################################################################
// 3-line button that toggle navigation
toggleNavBtn.addEventListener("click", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile) {
    // toggle desktop navigation
    navbarItems.classList.toggle("hideDesktopNav");
  } else {
    // toggle mobile navigation
    navbarMobileItems.classList.toggle("hidden");
  }
});

//#endregion

//#region Advantage Section ################################################################################
// play button to open youtube video
youtubeBtn.addEventListener("click", () => {
  advantageImgDiv.classList.add("hidden");
  youtubeDiv.classList.remove("hidden");
});

// Close youtube button
closeYoutubeBtn.addEventListener("click", () => {
  advantageImgDiv.classList.remove("hidden");
  youtubeDiv.classList.add("hidden");
});

//#endregion

//#region Projects Section #################################################################################
// variable init
let currentCategory = "All";

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
//#endregion

//#region client say Section ###############################################################################
let currentClient = 1;
const NoOfClient = clientSayCardArr.length;

// Function receive client number and show the number to screen
const showClient = (clientNo) => {
  clientSayCardArr.forEach((card, index) => {
    card.style.transform = `translateX(${(index - clientNo + 1) * 108}%)`;
  });
};

// init show client
showClient(currentClient);

// Left button show prev client
clientBtnLeft.addEventListener("click", () => {
  if (currentClient === 1) return;
  currentClient--;
  showClient(currentClient);
});

// right button show next client
clientBtnRight.addEventListener("click", () => {
  if (currentClient === NoOfClient) return;
  currentClient++;
  showClient(currentClient);
});

//#endregion

//#region Blog Section #####################################################################################
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

//#endregion
