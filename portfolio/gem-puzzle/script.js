let Fifteen = {
   elements: {
      cellContainer: null,//контейнер для ячеек
      cells: [],        //ячейки
      modal: null
   },
   arrays: {
      initialArray: [],
      mainArray: [], //массив чисел
   },
   properties: {
      fieldWidth: 4, //размерность поля
      time:          //время игры
      {
         minutes: 0,
         seconds: 0
      },
      moves: 0,     //число ходов
      results: [],
      sound: true
   },

   clear() {
      this.elements.cellContainer = null;
      this.elements.cells = [];
      this.arrays.initialArray = [];
      this.arrays.mainArray = [];
      this.properties.moves = 0;
      document.body.innerHTML = '';
      this.properties.time.minutes = 0;
      this.properties.time.seconds = 0;
      this.properties.results = [];
   },

   save() {
      localStorage.clear();
      //сохранить размер поля
      localStorage.setItem('fieldWidth', this.properties.fieldWidth);
      //сохраним число ходов
      localStorage.setItem('moves', this.properties.moves);
      let times = document.querySelector('.time').innerHTML.split(':');

      //сохраним минуты
      localStorage.setItem('minutes', times[0]);
      //save seconds
      localStorage.setItem('seconds', times[1]);

      //save array
      for (let i = 0; i < this.arrays.mainArray.length; i++) {
         localStorage.setItem(`mainArray${i}`, this.arrays.mainArray[i]);
      }
      //save arrayRez
      let k = this.properties.results.length > 10 ? 11 : this.properties.results.length;
      for (let i = 0; i < k; i++) {
         localStorage.setItem(`result${i + 1}`, this.properties.results[i]);
      }
      alert("Game is saved!")
   },

   init(newGame) {
      //modal div
      let modal = document.createElement('div');
      modal.classList.add('modal');
      modal.classList.add('modal-close');


      document.body.append(modal);
      this.elements.modal = modal;

      let keys = Object.keys(localStorage);
      for (let key of keys) {
         if (key.includes('result')) this.properties.results.push(localStorage.getItem(key).split(':'));
      }
      this.properties.results.sort(function (a, b) { return a[2] - b[2]; });

      if (newGame || localStorage.getItem('fieldWidth') === null) {
         document.body.append(this.drowAdditional(newGame));
         this.initArray();
      }
      else {
         if (localStorage.getItem('fieldWidth') !== null) {
            this.properties.fieldWidth = Number(localStorage.getItem('fieldWidth'));
         }
         if (localStorage.getItem('moves') !== null) {
            this.properties.moves = Number(localStorage.getItem('moves'));
         }
         if (localStorage.getItem('minutes') !== null && localStorage.getItem('minutes') !== 'NaN') {
            this.properties.time.minutes = Number(localStorage.getItem('minutes'));
         }
         if (localStorage.getItem('seconds') !== null) {
            this.properties.time.seconds = Number(localStorage.getItem('seconds'));
         }
         if (localStorage.getItem('mainArray0') !== null) {
            for (let i = 0; i < Math.pow(this.properties.fieldWidth, 2); i++) {
               this.arrays.mainArray[i] = Number(localStorage.getItem('mainArray' + i));
               if (i > 0) this.arrays.initialArray.push(i);
            }
            this.arrays.initialArray.push(0);
         }

         document.body.append(this.drowAdditional(false));
      }
      this.elements.cellContainer = document.createElement("div");
      this.elements.cellContainer.classList.add(`field-${this.properties.fieldWidth}`);

      this.elements.cellContainer.addEventListener(`dragover`, (evt) => {
         // Разрешаем сбрасывать элементы в эту область
         evt.preventDefault();

         // Находим перемещаемый элемент
         const activeElement = document.querySelector(`.selected`);
         // Находим элемент, над которым в данный момент находится курсор
         const currentElement = evt.target;
         //поменяем 
         if (currentElement.textContent === '' && this.isNeighborZero(Number(activeElement.textContent)) !== -1) {
            let zeroIndex = this.arrays.mainArray.indexOf(Number(currentElement.textContent)) + 1;
            let clickIndex = this.arrays.mainArray.indexOf(Number(activeElement.textContent)) + 1;
            this._replaceMainArray(Number(activeElement.textContent), clickIndex - 1, zeroIndex - 1);
            this._replaceClass(activeElement, currentElement, clickIndex - 1, zeroIndex - 1);
            this.properties.moves++;
            document.querySelector('.movies').textContent = this.properties.moves;
         }
      });

      this.elements.cellContainer.appendChild(this.drowCells());
      document.body.appendChild(this.elements.cellContainer);
      this.tickTime();

   },

   initArray() { //создаем main array,и сортируем его 
      let length = Math.pow(this.properties.fieldWidth, 2);
      for (let i = 1; i < length; i++) {
         this.arrays.mainArray.push(i);
         this.arrays.initialArray.push(i);
      }
      this.arrays.initialArray.push(0);
      this._mixArray();
      this.arrays.mainArray[this.arrays.mainArray.length] = 0;
   },

   _mixArray() {
      let randIndex;
      for (let i in this.arrays.mainArray) {
         let x = this.arrays.mainArray[i];
         randIndex = Math.floor(Math.random() * this.arrays.mainArray.length);
         this.arrays.mainArray[i] = this.arrays.mainArray[randIndex];
         this.arrays.mainArray[randIndex] = x;
      }
   },

   drowAdditional(newGame) {
      let add = document.createElement('div');
      add.classList.add('additional');

      let time = document.createElement('div');
      time.classList.add('time');
      add.append(time);
      if (newGame) time.innerHTML = '00:00';
      else time.innerHTML = `${this.properties.time.minutes}:${this.properties.time.seconds} `;

      let movies = document.createElement('div');
      movies.classList.add('movies');
      movies.innerHTML = this.properties.moves;
      add.append(movies);

      let divselect = document.createElement('div');
      divselect.classList.add('fieldwidth');
      let select = document.createElement('select');
      divselect.append(select);
      for (let i = 3; i < 9; i++) {
         let option = new Option(i + 'x' + i, i);
         select.options.add(option);
      }
      select.addEventListener('change', (e) => {
         this.properties.fieldWidth = Number(e.target.value);
      });
      select.value = this.properties.fieldWidth;

      let button = document.createElement('button');
      button.classList.add("button", "audio");
      button.innerHTML = `<i class="material-icons">volume_up</i>`;
      button.addEventListener('click', (e) => {
         this.properties.sound = this.properties.sound ? false : true;
         if (this.properties.sound) e.target.innerHTML = `<i class="material-icons">volume_up</i>`;
         else e.target.innerHTML = `<i class="material-icons">volume_off</i>`;
      });
      divselect.append(button);

      add.append(divselect);

      button = document.createElement('button');
      button.classList.add('button');
      button.textContent = 'New game';
      button.addEventListener('click', () => {
         this.clear();
         this.init(true);
      });
      add.append(button);

      button = document.createElement('button');
      button.classList.add('button');
      button.textContent = 'Save game';
      button.addEventListener('click', () => {
         this.save();
      });
      add.append(button);

      button = document.createElement('button');
      button.classList.add('button');
      button.textContent = 'Results';
      button.addEventListener('click', () => {
         this.showresults();
      });
      add.append(button);
      return add;
   },

   drowCells() {
      const fragment = document.createDocumentFragment();//новый пустой элемент 
      for (let i = 0; i < this.arrays.mainArray.length; i++) {
         const cell = document.createElement('div');
         cell.classList.add('cell');
         cell.classList.add(`cell-${i + 1}`);

         if (this.arrays.mainArray[i] === 0) cell.classList.add('cell-0');

         cell.innerHTML = this.arrays.mainArray[i] > 0 ? this.arrays.mainArray[i] : '';

         cell.addEventListener('click', (e) => {
            this._clickAudio('cell');
            let newIndex = this.isNeighborZero(Number(cell.textContent));
            let movies = document.querySelector('.movies');
            if (newIndex !== -1) {
               let index = this.arrays.mainArray.indexOf(Number(cell.textContent));
               this._replaceMainArray(Number(cell.textContent), index, newIndex);
               let zeroCell = this.elements.cells.find(cell => cell.textContent === '');
               this._replaceClass(cell, zeroCell, index, newIndex);
               this.properties.moves++;
               movies.textContent = this.properties.moves;
            }
            if (this._checkAssembled()) {//Победа!
               this._clickAudio('win');
               this.elements.modal.textContent = `«Ура! Вы решили головоломку за ${document.querySelector('.time').innerHTML} и ${this.properties.moves} ходов»`;
               this.elements.modal.classList.remove('modal-close');
               this.elements.modal.classList.add('modal-open');
               if (this.properties.results.length === 10) {
                  if (this.properties.results[9] > this.properties.moves) {
                     this.properties.results[9] = [document.querySelector('.time').innerHTML.split(':')[0], document.querySelector('.time').innerHTML.split(':')[1], this.properties.moves];
                     localStorage.setItem(`result${this.properties.results.length}`, `${document.querySelector('.time').innerHTML}:${this.properties.moves}`);
                  }
               }
               else {
                  this.properties.results.push([document.querySelector('.time').innerHTML.split(':')[0], document.querySelector('.time').innerHTML.split(':')[1], this.properties.moves]);
                  localStorage.setItem(`result${this.properties.results.length}`, `${document.querySelector('.time').innerHTML}:${this.properties.moves}`);
               }
               this.properties.results.sort(function (a, b) { return a[2] - b[2]; });
            }
         });
         cell.addEventListener(`dragstart`, (evt) => {
            evt.target.classList.add(`selected`);
            this._clickAudio('cell');
         });

         cell.addEventListener(`dragend`, (evt) => {
            evt.target.classList.remove(`selected`);
         });

         cell.draggable = "true";
         this.elements.cells.push(cell);

         fragment.appendChild(cell);
      }
      return fragment;
   },
   isNeighborZero(number) {
      let index = this.arrays.mainArray.indexOf(number);
      if (this.arrays.mainArray[index + 1] === 0)//sosed right=0
      {
         return index + 1;

      }
      if (this.arrays.mainArray[index - 1] === 0)//sosed left=0
      {
         return index - 1;

      }
      if (this.arrays.mainArray[index - this.properties.fieldWidth] != undefined && this.arrays.mainArray[index - this.properties.fieldWidth] === 0)//sosed top=0
      {
         return index - this.properties.fieldWidth;


      }
      if (this.arrays.mainArray[index + this.properties.fieldWidth] != undefined && this.arrays.mainArray[index + this.properties.fieldWidth] === 0)//sosed bottom=0
      {
         return index + this.properties.fieldWidth;
      }
      else return -1;
   },
   _replaceMainArray(number, indexOld, indexNew) {
      this.arrays.mainArray[indexOld] = this.arrays.mainArray[indexNew];
      this.arrays.mainArray[indexNew] = number;
   },
   _replaceClass(clickCell, zeroCell, clickIndex, zeroIndex) {
      let clickClass = 'cell-' + (clickIndex + 1);
      let zeroClass = 'cell-' + (zeroIndex + 1);
      clickCell.classList.remove(clickClass);
      clickCell.classList.add(zeroClass);
      zeroCell.classList.remove(zeroClass);
      zeroCell.classList.add(clickClass);

   },
   _checkAssembled() {
      let win = false;
      for (let i = 0; i < this.arrays.initialArray.length; i++) {
         if (this.arrays.initialArray[i] !== this.arrays.mainArray[i]) { win = false; return win; }
         else win = true;
      }
      return win;

   },

   showresults() {
      this.elements.modal.innerHTML = 'Лучшие результаты по числу ходов:'
      this.properties.results.forEach(element => {
         this.elements.modal.innerHTML = `${this.elements.modal.innerHTML}<br>Ходы: ${element[2]} Время: ${element[0]}:${element[1]}<br>`;
      });

      this.elements.modal.classList.remove('modal-close');
      this.elements.modal.classList.add('modal-open');
      this.elements.modal.classList.add('modal-results');

   },

   // Add Zeros
   addZero(n) {
      return parseInt(n, 10) < 10 ? `0${n}` : `${n}`;
   },

   _clickAudio(str) {
      if (this.properties.sound) {
         var audio = new Audio(); // Создаём новый элемент Audio
         audio.src = str === 'cell' ? './mp3/domino.mp3' : './mp3/gorn.mp3'; // Указываем путь к звуку "клика"
         audio.autoplay = true; // Автоматически запускаем
      }
   },

   tickTime() {
      let times = document.querySelector('.time');
      let min = Number(this.properties.time.minutes);
      let sek = Number(this.properties.time.seconds);
      let strmin = '';
      let strsek = '';

      setTimeout(function go() {
         strmin = min < 10 ? `0${min}` : `${min}`;
         strsek = sek < 10 ? `0${sek}` : `${sek}`;
         times.innerHTML = `${strmin} : ${strsek} `;
         sek++;
         if (sek === 60) {
            min++;
            sek = 0;
         }

         setTimeout(go, 1000);
      }, 1000);

   }

};

window.addEventListener("DOMContentLoaded", function () {
   Fifteen.init(false);
});

window.addEventListener('click', function (event) {
   var modal = document.querySelector('.modal');
   if (event.target == modal) {
      modal.classList.add('modal-close');
      modal.classList.remove('modal-open');
      modal.classList.remove('modal-results');
   }
});
