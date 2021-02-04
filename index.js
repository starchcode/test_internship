const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide article");
const indicators = document.querySelectorAll('.indicator div');
const blogNav = document.querySelectorAll('.blogPost li')
const blogContent = document.querySelectorAll('.blog-content article')

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = carouselImages[0].clientWidth;
let newTranslateLocation = () => "translateX(" + -size * counter + "px";
carouselSlide.style.transform = newTranslateLocation();


const changeIndicator = () => {
  indicators.forEach(el => el.classList.remove('selected'));
  if(indicators[counter - 1] === undefined ) {
    if(indicators.length === counter -1 ){
      console.log('reached far with next')
    indicators[0].className = 'selected'
    }else{
    indicators[indicators.length-1].className = 'selected'

    }
    return;
  }
  indicators[counter - 1].className = 'selected';
}

nextBtn.addEventListener("click", () => {

  if(counter >= carouselImages.length - 1 ) return;

    carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  console.log(counter)


  carouselSlide.style.transform = newTranslateLocation();
  
  changeIndicator();
});

prevBtn.addEventListener("click", () => {
  if(counter <=0 ) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;

  carouselSlide.style.transform = newTranslateLocation();

  console.log(counter)

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



blogContent.forEach(content=> content.className = 'selectedBlog');

const blogPostChange = nav => {
  blogContent.forEach(content => {
    if(content.childNodes[3].innerText.toLowerCase() === nav.innerText.toLowerCase()){
      content.className = 'selectedBlog'
    }else if (nav.innerText.toLowerCase() === 'all'){
      content.className = 'selectedBlog'
    }else{
      content.classList.remove('selectedBlog')
    }
  })
};

blogNav.forEach((nav, i) => {
  nav.addEventListener('click', ()=> {
    blogPostChange(nav);
  })
})

