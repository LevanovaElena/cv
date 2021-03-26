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
    src: "https://levanovaelena.github.io/cv/portfolio/webdev/index.html",
    typeIcon: "htmlCss",
    about: "Training project:  HTML5, CSS3, Pixel Perfect layout",
  },
  {
    image: "calculator.jpg",
    caption: "Website on HTML, CSS, JS",
    src: "https://levanovaelena.github.io/cv/portfolio/calculator/",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6",
  },
  {
    image: "shelter.jpg",
    caption: "Website on HTML, CSS, JS",
    src:
      "https://levanovaelena.github.io/cv/portfolio/shelter/pages/main/main.html",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6, SCSS,Pixel Perfect layout",
  },
  {
    image: "keyboard.jpg",
    caption: "Website on HTML, CSS, JS",
    src: "https://levanovaelena.github.io/cv/portfolio/virtual-keyboard/",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6, SCSS",
  },
  {
    image: "puzzle.jpg",
    caption: "Website on HTML, CSS, JS",
    src: "https://levanovaelena.github.io/cv/portfolio/gem-puzzle/",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6, SCSS",
  },
  {
    image: "kids.jpg",
    caption: "Website on HTML, CSS, JS",
    src: "https://levanovaelena.github.io/cv/portfolio/english-for-kids/src/",
    typeIcon: "htmlCss",
  },
  {
    image: "momentum.jpg",
    caption: "Website on HTML, CSS, JS",
    src: "https://levanovaelena.github.io/cv/portfolio/momentum/",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6, SCSS",
  },
  {
    image: "9.jpg",
    caption: "Website on CMS Wix",
    src: "#",
    typeIcon: "htmlCssJs",
    about: "Training project on HTML5, CSS3, JS6, SCSS",
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
