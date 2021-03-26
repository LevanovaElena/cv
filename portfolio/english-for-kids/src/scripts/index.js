
const Main = {
   menu: null,
   header: null,
   categoryPage: null,
   footer: null,
   cards: [],
   actionGame: false,
   tableStat: null,
   mainDiv: null,

   init() {
      this.cards = cards;
      this.menu = new Menu(this.cards, false);
      this.tableStat = new Statistics(this.cards);
      this.mainDiv = document.querySelector(".main");

      this.header = document.querySelector(".header");
      this.header.append(this.menu.elements.menuBtn);
      this.header.append(this.menu.elements.nav);
      let stBtn = document.querySelector(".buttonSt");
      this.footer = document.querySelector(".footer");

      stBtn.addEventListener('click', () => {
         this.tableStat.writeInLocale();
         this.tableStat.init();
         let divWin = document.createElement('div');
         divWin.classList.add('win');
         divWin.classList.add('fon');

         let btnDifficultWords = document.createElement('button');
         btnDifficultWords.textContent = 'Repeat difficult words';
         btnDifficultWords.classList.add('button', 'button__table');
         btnDifficultWords.addEventListener('click', () => {
            //выводим сложные слова по 8
            let wordArray = this.tableStat.arrayOfAnswers.createArrayWord(this.cards, 8, 'error');
            if (wordArray !== null) {
               this.categoryPage.category = new Category('Difficult Words', '', 'DifficultWords', wordArray);
               this.createMain(this.categoryPage.category);
            }
            else this.showMessage('Нет сложных слов для повторения!');

         });
         let btnClear = document.createElement('button');
         btnClear.textContent = 'Reset';
         btnClear.classList.add('button', 'button__table');
         btnClear.addEventListener('click', () => {
            //удаляем статистику
            this.tableStat.clear();
            this.tableStat.arrayOfAnswers.clear();
            this.showMessage('Данные по статистике удалены!')
         });
         let divBtn = document.createElement('div');
         divBtn.classList.add('button-container');
         divBtn.append(btnDifficultWords);
         divBtn.append(btnClear);
         divWin.append(divBtn);
         divWin.append(this.tableStat.elements.tableContainer);
         this.mainDiv.append(divWin);
         divWin.addEventListener('click', () => {
            divWin.remove();
         });
      });

      this.menu.elements.nav.addEventListener('click', () => {
         this.createMain();
      });


      this.createMain();

      let switchBtn = document.querySelector(".switch-btn");
      switchBtn.addEventListener('click', (event) => {
         this.actionGame = this.actionGame ? false : true;
         if (this.actionGame) switchBtn.classList.add('switch-on');
         else switchBtn.classList.remove('switch-on');
         this.menu.changeColor(this.actionGame);
         if (this.categoryPage.category.name == 'main') this.categoryPage.changeColor(this.actionGame);
         else this.createMain(this.categoryPage.category);
      });
      document.addEventListener('trainClick', (event) => {
         this.tableStat.arrayOfAnswers.addTrain(event.target.id);

      });
      document.addEventListener('correctClick', (event) => {
         this.tableStat.arrayOfAnswers.addGame(event.target.id, true);

      });

      document.addEventListener('errorClick', (event) => {
         this.tableStat.arrayOfAnswers.addGame(event.target.id, false);

      });

   },

   createMain(category) {
      let categoryForCreate = category;
      if (category === undefined) categoryForCreate = this.menu.properties.activeCategory;

      while (this.mainDiv.firstChild) {
         this.mainDiv.firstChild.remove();
      }
      this.categoryPage = new CategoryPage(categoryForCreate, this.actionGame);
      this.mainDiv = document.querySelector(".main");
      this.mainDiv.append(this.categoryPage.cardsContainer);
      this.mainDiv.addEventListener('click', () => {
         if (this.menu.properties.activeCategory.name == 'main') {
            let newActiveMenuItem = this.menu.elements.items.find(item => { if (item.innerHTML === this.categoryPage.activeCard.lastChild.innerHTML) return item; });
            this.menu._clickItem(newActiveMenuItem, false);
            this.createMain();
         }
      });
      this.mainDiv.addEventListener('newgame', () => {
         let event = new Event('click', { bubbles: true });
         this.menu.elements.items[0].dispatchEvent(event);
      });
   },
   showMessage(message) {
      let divWin = document.createElement('div');
      divWin.classList.add('win');
      let divMessage = document.createElement('div');
      divMessage.classList.add('message');
      divMessage.textContent = message;
      let btnOk = document.createElement('button');
      btnOk.textContent = 'OK';
      btnOk.classList.add('button', 'button-ok');
      btnOk.addEventListener('click', () => {
         divWin.remove();
      });
      divMessage.append(btnOk);
      divWin.append(divMessage);
      divWin.addEventListener('click', () => {
         divWin.remove();
      });

      this.mainDiv.append(divWin);
   }
};

window.addEventListener("DOMContentLoaded", function () {
   Main.init();
});

