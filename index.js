const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide article");
const indicators = document.querySelectorAll(".indicator div");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Quotes
let counter = 1;
let size = carouselImages[0].clientWidth;
let newTranslateLocation = () => "translateX(" + -size * counter + "px";
carouselSlide.style.transform = newTranslateLocation();
const quotesSizeChange = () => {
  size = carouselImages[0].clientWidth;
  carouselSlide.style.transform = newTranslateLocation();
};
window.addEventListener("resize", _.throttle(quotesSizeChange, 500));

const changeIndicator = () => {
  indicators.forEach((el) => el.classList.remove("selected"));
  if (indicators[counter - 1] === undefined) {
    if (indicators.length === counter - 1) {
      indicators[0].className = "selected";
    } else {
      indicators[indicators.length - 1].className = "selected";
    }
    return;
  }
  indicators[counter - 1].className = "selected";
};

nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;

  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = newTranslateLocation();

  changeIndicator();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;

  carouselSlide.style.transform = newTranslateLocation();

  changeIndicator();
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = newTranslateLocation();
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = 1;
    carouselSlide.style.transform = newTranslateLocation();
  }
});
// END Quotes

// Blog Posts
const blogNav = document.querySelectorAll(".blogPost li");
const blogContent = document.querySelectorAll(".blog-content article");

blogContent.forEach((content) => (content.className = "selectedBlog"));
blogNav[0].classList.add("chosenNav");
const blogPostChange = (nav) => {
  blogContent.forEach((content) => {
    blogNav.forEach((n) => n.classList.remove("chosenNav"));
    nav.classList.add("chosenNav");
    if (
      content.childNodes[3].innerText.toLowerCase() ===
      nav.innerText.toLowerCase()
    ) {
      content.className = "selectedBlog";
    } else if (nav.innerText.toLowerCase() === "all") {
      content.className = "selectedBlog";
    } else {
      content.classList.remove("selectedBlog");
    }
  });
};

blogNav.forEach((nav, i) => {
  nav.addEventListener("click", () => {
    blogPostChange(nav);
  });
});
// END Blog Posts

// FAQ
const Qs = document.querySelector(".faq-content");
let articleStuff = {};

const openCloseQs = e => {
  let article;
  !e.target ? article = e.parentNode: article = e.target.parentNode;
  if(e.target &&  e.target.nodeName === 'IMG'){
    article = e.target.parentNode.parentNode
  } 
  p = article.childNodes[5];
  
  if (!p.style.height) p.style.height = p.offsetHeight + "px";
  
  if (!articleStuff[article.childNodes[3].innerHTML]) {
      articleStuff[article.childNodes[3].innerHTML] = p.offsetHeight;
    }
    
  let button = article.childNodes[1].childNodes[0];
  /.\/img\/open.svg$/.test(button.src)
    ? (button.src = '/img/close.svg')
    : (button.src = '/img/open.svg');

  let originalHeight = articleStuff[article.childNodes[3].innerHTML];

  if (p.style.height == originalHeight + "px") {
    p.style.height = 0 + 'px';
  } else {
    p.style.height = originalHeight + "px";
  }

}
Qs.addEventListener("click", e => openCloseQs(e));

for(let i=1; i< Qs.childNodes.length; i+=4){
  openCloseQs(Qs.childNodes[i].childNodes[5])
  // console.log(Qs.childNodes[i].childNodes[5])
}
// Qs.childNodes.forEach(p => { openCloseQs(p.childNodes[5])})
// FAQ END

// Slider - Last section
const slide = (e) => {

    let sliderLocation = slider.childNodes[7].getBoundingClientRect();

    if (e.target.id == "nextBtnImg" || e.target.parentNode.id == "nextBtnImg") {

      if(Math.abs(sliderLocation.right / window.innerWidth) < 0.5) return // to avoid slider leaving the window
      sliderTranslateX -= 200;

    } else if (e.target.id == "prevBtnImg" || e.target.parentNode.id == "prevBtnImg") {

      if(Math.abs(sliderLocation.left / window.innerWidth) > 0.5) return // to avoid slider leaving the window
      sliderTranslateX += 200;

    } else {return} // if buttons are not clicked do nothing!

    slider.childNodes[7].style.transform = "translateX(" + sliderTranslateX + "px)";
}

const slider = document.querySelector(".carousel-containerImg"); // 0 is prev, 1 is next
let sliderTranslateX = 0;
slider.addEventListener("click", e => slide(e));

// END Slider
