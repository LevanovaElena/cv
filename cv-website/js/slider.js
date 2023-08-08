let works = [
  {
    image: "explorer1.jpg",
    caption: "Project from my last job. React.js (Hooks),TypeScript, Effector, Bootstrap, Ant, Node.js",
    src: " https://www.ghx.com/digital-case-support/",
    typeIcon: "react",
  },
  {
    image: "explorer2.jpg",
    caption: "Project from my last job. React.js (Class components),JavaScript",
    src: " https://www.ghx.com/digital-case-support/",
    typeIcon: "react",
  },
  {
    image: "wix.jpg",
    caption: "Website on CMS Wix. Real project on CMS WIX",
    src: "https://ellevanova.wixsite.com/parspb",
    typeIcon: "CMS",
  },
  {
    image: "cv.jpg",
    caption: "Site of my CV and portfolio: HTML5,SCSS,JS",
    src: "https://levanovaelena.github.io/cv/cv-website/",
    typeIcon: "htmlCssJs",
  },
  {
    image: "webdev.jpg",
    caption: "Training project:  HTML5, CSS3, Pixel Perfect layout",
    src: "https://levanovaelena.github.io/cv/portfolio/webdev/index.html",
    typeIcon: "htmlCss",
  },
  {
    image: "calculator.jpg",
    caption: "Training project on HTML5, CSS3, JS6",
    src: "https://levanovaelena.github.io/cv/portfolio/calculator/",
    typeIcon: "htmlCssJs",
  },
  {
    image: "shelter.jpg",
    caption: "Training project on HTML5, CSS3, JS6, SCSS,Pixel Perfect layout",
    src:
      "https://levanovaelena.github.io/cv/portfolio/shelter/pages/main/main.html",
    typeIcon: "htmlCssJs",
  },
  {
    image: "keyboard.jpg",
    caption: "Training project on HTML5, CSS3, JS6, SCSS",
    src: "https://levanovaelena.github.io/cv/portfolio/virtual-keyboard/",
    typeIcon: "htmlCssJs",
  },
  {
    image: "puzzle.jpg",
    caption: "Training project on HTML5, CSS3, JS6, SCSS",
    src: "https://levanovaelena.github.io/cv/portfolio/gem-puzzle/",
    typeIcon: "htmlCssJs",
  },
  {
    image: "kids.jpg",
    caption:
      "Training project on HTML5, CSS3, JS6, SCSS, Single-page application",
    src: "https://levanovaelena.github.io/cv/portfolio/english-for-kids/src/",
    typeIcon: "htmlCss",
  },
  {
    image: "momentum.jpg",
    caption: "Training project on HTML5, CSS3, JS6, SCSS",
    src: "https://levanovaelena.github.io/cv/portfolio/momentum/",
    typeIcon: "htmlCssJs",
  },
  {
    image: "covid.jpg",
    caption:
      "Training project on HTML5, CSS3, JS6, SCSS, Webpack, WEB-API. Teamwork.Single-page application.",
    src:
      "https://levanovaelena.github.io/cv/portfolio/covid-dashboard/index.html",
    typeIcon: "htmlCssJs",
  },
  {
    image: "alfabet.jpg",
    caption:
      "Training project on HTML5, CSS3, TypeScript(OOP,Canvas), single-page application, SCSS, Bootstrap, Webpack, WEB-API. Teamwork. Backend.",
    src: "https://rsclone100.herokuapp.com/#carouselExampleControls",
    typeIcon: "htmlCssJs",
  },
];
let icons = {
  CMS: "CMS.png",
  htmlCss: "iconHtmlCss.png",
  htmlCssJs: "iconJs.png",
  react:"react.png"
};

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
      let portfolioImage = createElement("a", "portfolio__image");
      portfolioImage.setAttribute("href", item.src);
      portfolioImage.setAttribute("target", "blank");

      let portfolioCard = createElement("div", "portfolio-card");
      portfolioCard.innerHTML =
        ` <img class='portfolio-card__icon' src='./img/icons/${icon}' alt='` +
        item.caption +
        `'><a href='${item.src}' class='portfolio-card__a text-shadow'>` +
        item.caption +
        "</a>";
      portfolioImage.classList.add("none");
      portfolioImage.innerHTML = `<img src="./img/portfolio/${item.image}" alt="On CMS WIX">`;

      portfolioItem.addEventListener("mouseover", () => {
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
  if (i < 5 ) {
    arrayForSlide.push(item);
    i += 1;
  } else {
    arrayOfSliders.push(new Slide(arrayForSlide, portfolio));
    i = 0;
    arrayForSlide = [];
    arrayForSlide.push(item);
  }
});
arrayOfSliders.push(new Slide(arrayForSlide, portfolio));

function div(val, by) {
  return (val - (val % by)) / by;
}

let numberOfSlide =
  works.length % 6 === 0 ? div(works.length, 6) : div(works.length, 6)+1 ;
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
