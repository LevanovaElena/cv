class CategoryPage {
   constructor(category, actionGame) {
      this.actionGame = actionGame;//тип дейсвий - игра(true) или изучение(false)
      this.category = category;//текущая категория||список карточек
      this.activeCard = null; //активная карточка
      this.arrayForGame = null;
      this.startGame = false;
      this.isRotate = false;
      this.theme = {
         train: 'card-train',
         game: 'card-game'
      }
      this.elements = {
         divStars: null,
         button: null
      }

      this.pathImg = this.category.name === 'main' ? "./assets/img/categories/" : "./assets/";

      this.cardsContainer = document.createElement("div");//контейнер для пунктов меню
      this.cardsContainer.classList.add("categories");

      if (this.actionGame && this.category.name !== 'main') this.cardsContainer.append(this.createStars());
      this.cardsContainer.append(this.setCardsElements());
      if (this.actionGame && this.category.name !== 'main') this.cardsContainer.append(this.createButtons());
   }

   setCardsElements() {
      const fragment = document.createDocumentFragment();
      this.category.words.forEach(item => {

         let card = this.category.name === 'main' ? this.createCardCategory(item) : this.createCardWord(item);

         fragment.append(card);
      });
      return fragment;
   }
   createStars() { //создадим div со звездами
      let stars = document.createElement('div');
      stars.classList.add('stars');
      this.elements.divStars = stars;
      return stars;
   }
   createButtons() {//создадим контейнер с кнопками игры

      let buttons = document.createElement('div');
      buttons.classList.add('buttons');

      let start = document.createElement('button');
      start.classList.add('button');
      start.textContent = 'Start Game';
      buttons.append(start);

      start.addEventListener('click', (event) => {
         if (!event.currentTarget.classList.contains('repeat')) {
            this.startGame = true;
            //сформировать массив звуков категории и по клику воспроизводить один
            this.arrayForGame = new ArrayForGame(this.category);
            this.arrayForGame.mixArray();
            this._clickAudio(this.arrayForGame.arrayWord[this.arrayForGame.findWord].audioSrc)
            //кнопку сделать поворотной
            start.classList.add('repeat');
         }
         else {
            //воспроизводим тот же звук
            this._clickAudio(this.arrayForGame.arrayWord[this.arrayForGame.findWord].audioSrc);
         }
      })

      this.elements.button = start;
      return buttons;
   }

   createCardCategory(item) {
      let card = document.createElement("div");
      card.classList.add('categories__item');

      if (this.actionGame) card.classList.add(this.theme.game);
      else card.classList.add(this.theme.train);

      let img = document.createElement("div");
      img.classList.add('img');
      img.innerHTML = `<img src="${this.pathImg}${item.image}" alt="${item.word}">`;
      let title = document.createElement("div");
      title.classList.add('caption');
      title.innerHTML = `${item.word}`;
      card.append(img);
      card.append(title);
      card.addEventListener('click', (event) => {
         this.activeCard = event.currentTarget;
      });

      return card;
   }

   createCardWord(item) {
      let cardC = document.createElement("div");
      cardC.classList.add('card-container');


      let card = this.actionGame ? this.cardGame(item) : this.cardTrain(item);
      cardC.append(card);

      return cardC;
   }

   cardTrain(item) {//функция создает карточку слова в режиме тренировки
      let card = document.createElement("div");
      card.classList.add('card');
      card.id = item.word;


      let front = document.createElement("div");
      let back = document.createElement("div");

      back.classList.add('card-back');
      back.classList.add('card-hidden');
      back.style = `background-image: url(./assets/${item.image})`;
      back.innerHTML = `<div class="caption"><span class="translate">${item.translation}</span></div>`;
      back.addEventListener('mouseleave', (event) => {
         if (!event.relatedTarget.classList.contains('rotate') && !event.relatedTarget.classList.contains('card-front') && !event.relatedTarget.classList.contains('caption')) {
            if (this.isRotate) {
               front.classList.remove('card-hidden');
               card.classList.remove('rotateFunc');
               setTimeout(() => back.classList.add('card-hidden'), 500);
               this.isRotate = false;
            }
         }

      });

      front.classList.add('card-front');
      front.style = `background-image: url(./assets/${item.image})`;
      let caption = document.createElement("div");
      caption.classList.add('caption');
      caption.innerHTML = `<span>${item.word}</span>`;
      let rotate = document.createElement("button");
      rotate.classList.add('button', 'rotate');
      rotate.addEventListener('click', (event) => {
         back.classList.remove('card-hidden');
         event.stopPropagation();
         setTimeout(() => front.classList.add('card-hidden'), 500);
         card.classList.add('rotateFunc');
         setTimeout(() => this.isRotate = true, 500);
         //прибавим клик в режиме тренировки
         let myevent = new Event('trainClick', { bubbles: true }, { detail: { word: item.word } });
         card.dispatchEvent(myevent);
      });
      front.append(caption);
      front.append(rotate);

      front.addEventListener('click', (event) => {
         this._clickAudio(item.audioSrc);
      });
      card.append(front);


      if (item.translation.length > 10) back.classList.add('font-small');
      card.append(back);
      return card;
   }

   cardGame(item) {//функция создает карточку слова в режиме игры
      let card = document.createElement("div");
      card.classList.add('card');
      card.id = item.word;

      let front = document.createElement("div");
      front.classList.add('card-front');

      front.style = `background-image: url(./assets/${item.image})`;

      card.append(front);
      card.addEventListener("click", (event) => {
         if (this.startGame && !event.currentTarget.classList.contains('inactive')) {
            this.activeCard = event.currentTarget;
            let star = document.createElement('div');
            star.classList.add('star');
            if (this.arrayForGame.checkWord(this.activeCard.id)) {
               //событие корректного ответа
               let myevent = new CustomEvent('correctClick', { bubbles: true }, { detail: { word: item.word } });
               card.dispatchEvent(myevent);

               card.classList.add('inactive');
               //звук правильного ответа 
               this._clickAudio(this.arrayForGame.audio.ok);
               //add stars
               this.elements.divStars.append(star);
               this.arrayForGame.correct++;
               //если конец игры
               if (!this.arrayForGame.startGame) {
                  this.startGame = false;
                  if (this.arrayForGame.isWin) this.showWin(true);
                  else this.showWin(false);
               }
               else //новый звук
                  setTimeout(() => this._clickAudio(this.arrayForGame.arrayWord[this.arrayForGame.findWord].audioSrc), 1500);
            }
            else {
               //воспроизводим звук ошибки
               this._clickAudio(this.arrayForGame.audio.error);
               //старый звук снова
               setTimeout(() => this._clickAudio(this.arrayForGame.arrayWord[this.arrayForGame.findWord].audioSrc), 1500);
               //добавляем пустую звезду
               star.classList.add('error');
               this.elements.divStars.append(star);
               this.arrayForGame.errors++;

               let myevent = new Event('errorClick', { bubbles: true }, { detail: { word: item.word } });
               card.dispatchEvent(myevent);
            }
         }
      });

      return card;
   }

   _clickAudio(mp3) {

      var audio = new Audio(); // Создаём новый элемент Audio
      audio.src = `./assets/${mp3}`; // Указываем путь к звуку "клика"
      audio.autoplay = true; // Автоматически запускаем

   }

   changeColor(actionGame) {
      this.actionGame = actionGame;
      if (this.category.name !== 'main') return;
      this.cardsContainer.childNodes.forEach(item => {

         if (this.actionGame) {
            item.classList.remove(this.theme.train);
            item.classList.add(this.theme.game);
         }
         else {
            item.classList.remove(this.theme.game);
            item.classList.add(this.theme.train);
         }

      });
   }
   showWin(result) {
      let img = result ? `<img src=${this.arrayForGame.img.win} alt='Win'>` : `<img src=${this.arrayForGame.img.losing} alt='Losing'>`;
      let audio = result ? this.arrayForGame.audio.win : this.arrayForGame.audio.losing;
      let divWin = document.createElement('div');
      divWin.classList.add('win');
      divWin.innerHTML = img;
      if (!result) {
         let div = document.createElement('div');
         div.classList.add('errormessage');
         div.textContent = `Число допущенных ошибок: ${this.arrayForGame.errors}`;
         divWin.append(div);
      }

      this.cardsContainer.append(divWin);
      this._clickAudio(audio);
      setTimeout(() => this.newGame(divWin), 7000);
      divWin.addEventListener('click', () => {
         this.newGame(divWin);
      });
   }

   newGame(divWin) {
      divWin.classList.add('winhidden');
      let event = new Event('newgame', { bubbles: true });
      divWin.dispatchEvent(event);
   }
}