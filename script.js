//#region nav Section ######################################################################################
const toggleNavBtn = document.querySelector(".toggleNavBtn");
const navbarItems = document.querySelector(".navbar_nav_items");
const navbarMobileItems = document.querySelector(".navbar_nav_items_mobile");

// 3-line button that toggle navigation
toggleNavBtn.addEventListener("click", () => {
  navbarMobileItems.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (
    !navbarMobileItems.contains(e.target) &&
    !toggleNavBtn.contains(e.target)
  ) {
    navbarMobileItems.classList.add("hidden");
  }
});

//#endregion

//#region Banner section ###################################################################################
const bannerBtnLeft = document.querySelector(".navBtnLeft");
const bannerBtnRight = document.querySelector(".navBtnRight");
const bannerCardArr = document.querySelectorAll(".bannerCard");
const bannerPageNo = document.querySelector(".navBtnSection_pageNo");

let currentBanner = 1;
const bannersLength = bannerCardArr.length;

// function to show current banner
const showBanner = (bannerNo) => {
  bannerCardArr.forEach((banner, index) => {
    if (index === bannerNo - 1) {
      banner.classList.remove("opaque");
    } else {
      banner.classList.add("opaque");
    }
  });

  // print the current and total number of banner card to html
  bannerPageNo.innerHTML = `<b>${currentBanner}/${bannersLength}</b>`;
};

// init banner 1
showBanner(1);

// button left go back to prev banner
bannerBtnLeft.addEventListener("click", () => {
  if (currentBanner === 1) return;
  currentBanner--;
  showBanner(currentBanner);
});

// button right go to next banner
bannerBtnRight.addEventListener("click", () => {
  if (currentBanner === bannersLength) return;
  currentBanner++;
  showBanner(currentBanner);
});

//#endregion

//#region Advantage Section ################################################################################
const advantageImgDiv = document.querySelector(".advantageSection_ImgDiv");
const youtubeBtn = document.querySelector(".advantageSection_ImgDiv_btn");
const youtubeDiv = document.querySelector(".youtubeDiv");
const closeYoutubeBtn = document.querySelector(".closeYoutubeBtn");

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

//#region feature Section ##################################################################################
const featureContainer = document.querySelector(".featureSection_featureDiv");
const featureCardArr = document.querySelectorAll(".featureCard");
const featureDotContainer = document.querySelector(".featureSection_dotsdiv");
const featureSwipe = new Hammer(featureContainer);

let currentFeature = 1;
const noOfFeature = featureCardArr.length;

// insert to html each dot for each feature
featureCardArr.forEach((feat, index) => {
  featureDotContainer.insertAdjacentHTML(
    "beforeend",
    `<span class="dotsdiv_dot" data-dot=${index + 1}></span>`
  );
});

// function receive feature number then show the feature as the first spot on screen
const showFeature = (featureNo) => {
  // Show feature to html
  featureCardArr.forEach((feat, index) => {
    feat.style.transform = `translateX(${(index - featureNo + 1) * 105}%)`;
  });

  // update correct dot to active
  const dotsArr = document
    .querySelectorAll(".dotsdiv_dot")
    .forEach((dot, index) => {
      if (featureNo === index + 1) {
        dot.classList.add("activeDot");
      } else {
        dot.classList.remove("activeDot");
      }
    });
};
showFeature(currentFeature);

// Listen to event click on the dot to change current feature
featureDotContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "SPAN") return;
  const dotNumber = Number(e.target.dataset.dot);

  const isTablet = window.matchMedia("(max-width: 1170px)").matches;
  // if the dot is the last dot, reject action
  if (dotNumber === noOfFeature && !isTablet) {
    showFeature(noOfFeature - 1);

    const nearLastDot = document
      .querySelector(`[data-dot="${noOfFeature - 1}"]`)
      .classList.remove("activeDot");

    const lastDot = document
      .querySelector(`[data-dot="${noOfFeature}"]`)
      .classList.add("activeDot");
    return;
  }

  currentFeature = dotNumber;
  showFeature(currentFeature);
});

// swipe left event, go to next feature
featureSwipe.on("swipeleft", () => {
  const isTablet = window.matchMedia("(max-width: 1170px)").matches;
  if (!isTablet || currentFeature === noOfFeature) return;
  currentFeature++;
  showFeature(currentFeature);
});

// swipe right event, go back to prev feature
featureSwipe.on("swiperight", () => {
  const isTablet = window.matchMedia("(max-width: 1170px)").matches;
  if (!isTablet || currentFeature === 1) return;
  currentFeature--;
  showFeature(currentFeature);
});

//#endregion

//#region Projects Section #################################################################################
const categoryContainer = document.querySelector(".categoryContainer");
const projectBodyContainer = document.querySelector(
  ".projectBody_contentContainer"
);
const loadMoreProjectBtn = document.querySelector(".projectBody_btn");
const categorySelector = document.querySelector(".project_categorySelector");

// variable init
let currentCategory = "All";
let allProjects = [];
let filteredProjects = [];

// function to show categories list
const showCategories = (allProj, curCat) => {
  // remove all current categories in html
  categoryContainer.innerHTML = "";

  // filter the projects list to current project
  filteredProjects = allProj.filter((val) => {
    if (curCat === "All") {
      return true;
    } else {
      return val.category === curCat;
    }
  });

  // print "All" category
  categoryContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="DMsans category_button">All</button>`
  );

  // print each categories
  allProj.forEach((proj) => {
    categoryContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="DMsans category_button">${proj.category}</button>`
    );
  });

  // if category is active, add class and disable the category button
  document.querySelectorAll(".category_button").forEach((btn) => {
    if (btn.textContent === curCat) {
      btn.classList.add("activeCategory");
      btn.disabled = true;
    }
  });

  // remove all current selection in mobile
  categorySelector.innerHTML = "";

  // fill mobile selections with option
  categorySelector.insertAdjacentHTML(
    "beforeend",
    `<option value="All" ${
      curCat === "All" ? 'selected="selected"' : ""
    }>All</option>`
  );
  allProj.forEach((proj) => {
    categorySelector.insertAdjacentHTML(
      "beforeend",
      `<option value="${proj.category}" ${
        curCat === proj.category ? 'selected="selected"' : ""
      }>${proj.category}</option>`
    );
  });

  // empty the container before filling it with elements
  projectBodyContainer.innerHTML = "";

  // fill container with each elements
  filteredProjects.forEach((proj, index) => {
    projectBodyContainer.insertAdjacentHTML(
      "beforeend",
      `<div
        class="projectCard ${index > 1 ? "hidden" : ""}"
        style="background-color: var(--${proj.backgroundColor}); color: var(--${
        proj.textColor
      })"
      >
        <div class="projectTextDiv">
          <h4 class="robotoCondensed">${proj.category}</h4>
          <h3 class="inknutAntiqua">${proj.description}</h3>
        </div>
        <img src="./assets/${proj.image}" alt="${proj.imageDesc}" />
      </div>`
    );
  });

  if (filteredProjects.length > 2) {
    loadMoreProjectBtn.classList.remove("hidden");
  } else {
    loadMoreProjectBtn.classList.add("hidden");
  }
};

// Get categories from JSON and print to html
const getCategories = async () => {
  try {
    // Get projects data from JSON
    const response = await fetch("./data/projects.json");
    allProjects = await response.json();

    showCategories(allProjects, "All");
  } catch (error) {
    console.log(error);
  }
};
getCategories();

// listen to changing category event
categoryContainer.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;

  showCategories(allProjects, e.target.innerHTML);
});

// Listen to selecting category event
categorySelector.addEventListener("change", (e) => {
  showCategories(allProjects, e.target.value);
});

// load more button, remove all hidden class from project cards
loadMoreProjectBtn.addEventListener("click", (e) => {
  const projectCards = document
    .querySelectorAll(".projectCard")
    .forEach((proj) => {
      proj.classList.remove("hidden");
    });
  e.target.classList.add("hidden");
});

//#endregion

//#region client say Section ###############################################################################
const clientCardDiv = document.querySelector(".clientSay_cardDiv");
const clientBtnLeft = document.querySelector(".clientBtnLeft");
const clientBtnRight = document.querySelector(".clientBtnRight");
const clientSayCardArr = document.querySelectorAll(".clientSay_card");

let currentClient = 1;
const NoOfClient = clientSayCardArr.length;

// Function receive client number and show the client to screen
const showClient = (clientNo) => {
  clientSayCardArr.forEach((card, index) => {
    card.style.transform = `translateX(${(index - clientNo + 1) * 108}%)`;
  });
};

// next client function
const nextClient = () => {
  if (currentClient === NoOfClient) return;
  currentClient++;
  showClient(currentClient);
};

// previous client function
const prevClient = () => {
  if (currentClient === 1) return;
  currentClient--;
  showClient(currentClient);
};

// init show client
showClient(currentClient);

// Left button show prev client
clientBtnLeft.addEventListener("click", () => {
  prevClient();
});

// right button show next client
clientBtnRight.addEventListener("click", () => {
  nextClient();
});

// swipe action for mobile view to change slide
const clientSwipe = new Hammer(clientCardDiv);
clientSwipe.on("swipeleft", () => {
  const isTablet = window.matchMedia("(max-width: 1170px)").matches;
  if (!isTablet) return;
  nextClient();
});
clientSwipe.on("swiperight", () => {
  const isTablet = window.matchMedia("(max-width: 1170px)").matches;
  if (!isTablet) return;
  prevClient();
});

//#endregion

//#region Blog Section #####################################################################################
const blogContainer = document.querySelector(".blog_contentDiv");

// Get Blog post from JSON and print to html
const getBlogs = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
getBlogs();

//#endregion
