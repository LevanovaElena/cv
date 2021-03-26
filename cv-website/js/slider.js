let works = [
  {
    image: "wix.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "CMS",
    about: "",
  },
  {
    image: "webdev.jpg",
    caption: "Website on HTML, CSS",
    src:
      "https://rolling-scopes-school.github.io/levanovaelena-JS2020Q3/webdev/#",
    typeIcon: "htmlCss",
    about: "Pixel Perfect layout, HTML5, CSS3",
  },
  {
    image: "3.jpg",
    caption: "Website on CMS Wix",
    src:
      "https://rolling-scopes-school.github.io/levanovaelena-JS2020Q3/calculator/",
    typeIcon: "htmlCss",
  },
  {
    image: "4.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "5.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "6.jpg",
    caption: "Another...",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "7.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "8.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "9.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
  {
    image: "10.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCss",
  },
];
let icons = { CMS: "CMS.png", htmlCss: "iconHtmlCss.png" };

class Slide {
  constructor(array, portfolio) {
    this.array = array;
    this.portfolio = portfolio;
  }
  createSlide() {
    while (portfolio.firstChild) {
      portfolio.removeChild(portfolio.firstChild);
    }
    this.array.forEach((item) => {
      let icon = icons[item.typeIcon];
      let portfolioItem = createElement("div", "portfolio__item");
      portfolioItem.classList.add("block-shadowed");
      let portfolioImage = createElement("div", "portfolio__image");
      let portfolioCard = createElement("div", "portfolio-card");
      portfolioCard.innerHTML =
        ` <img class='portfolio-card__icon' src='./img/icons/${icon}' alt='` +
        item.caption +
        "'><a href='#' class='portfolio-card__a text-shadow'>" +
        item.caption +
        "</a>";
      portfolioImage.classList.add("none");
      portfolioImage.innerHTML = `<img src="./img/portfolio/${item.image}" alt="On CMS WIX"></img>`;

      portfolioItem.addEventListener("mouseover", (event) => {
        portfolioImage.classList.remove("none");
      });
      portfolioItem.addEventListener("mouseout", () => {
        portfolioImage.classList.add("none");
      });
      portfolioItem.append(portfolioCard);
      portfolioItem.append(portfolioImage);
      portfolio.append(portfolioItem);
    });
  }
}

let portfolio = document.querySelector(".portfolio");
let i = 0;
let arrayForSlide = [];
let arrayOfSliders = [];
let activeSlide = 1;
works.forEach((item) => {
  if (i < 6) {
    arrayForSlide.push(item);
    i += 1;
  } else {
    arrayOfSliders.push(new Slide(arrayForSlide, portfolio));
    i = 1;
    arrayForSlide = [];
  }
});
arrayOfSliders.push(new Slide(arrayForSlide, portfolio));

function div(val, by) {
  return (val - (val % by)) / by;
}

let numberOfSlide =
  works.length % 6 === 0 ? div(works.length, 6) : div(works.length, 6) + 1;
numberOfSlide = numberOfSlide.toFixed(0);

console.log(numberOfSlide);
let portfolioPag = document.querySelector(".portfolio-pagination");
for (let k = 1; k <= numberOfSlide; k++) {
  let slide = createElement("div", "portfolio-pagination__slide");
  slide.id = k;
  slide.addEventListener("click", (event) => {
    console.log(arrayOfSliders);
    document.getElementById(`${activeSlide}`).classList.remove("active");
    activeSlide = Number.parseInt(event.target.id);
    arrayOfSliders[activeSlide - 1].createSlide();
    event.target.classList.add("active");
  });
  if (k === 1) {
    slide.classList.add("active");

    arrayOfSliders[0].createSlide();
  }
  portfolioPag.append(slide);
}

let nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", () => {
  document.getElementById(`${activeSlide}`).classList.remove("active");
  activeSlide = activeSlide < numberOfSlide ? activeSlide + 1 : 1;
  console.log("activeSlide", activeSlide);
  console.log("numberOfSlide", numberOfSlide);
  arrayOfSliders[activeSlide - 1].createSlide();
  document.getElementById(`${activeSlide}`).classList.add("active");
});
let prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", () => {
  document.getElementById(`${activeSlide}`).classList.remove("active");
  activeSlide = activeSlide > 1 ? activeSlide - 1 : numberOfSlide;
  console.log("activeSlide", activeSlide);
  console.log("numberOfSlide", numberOfSlide);
  arrayOfSliders[activeSlide - 1].createSlide();
  document.getElementById(`${activeSlide}`).classList.add("active");
});

function createElement(element, classStr) {
  let elem = document.createElement(element);
  elem.classList.add(classStr);
  return elem;
}
