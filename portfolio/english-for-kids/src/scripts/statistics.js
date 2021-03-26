class Statistics {
   constructor(cards) {
      this.arrayOfAnswers = new ArrayOfAnswer(cards);
      this.elements = {
         tableContainer: null,
         table: null
      }
      this.readFromLocale();
      this.init();
   }

   init() {

      this.elements.tableContainer = document.createElement('div');
      this.elements.tableContainer.classList.add('table-container');
      this.createTable();
      this.elements.tableContainer.append(this.elements.table);

   }
   createTable() {
      this.elements.table = document.createElement('table');
      this.elements.table.addEventListener('click', (event) => {
         event.stopPropagation();
         this._clickTable(event);
      });

      let caption = document.createElement('caption');
      caption.classList.add('table__caption');
      caption.textContent = "Table of game statistics "
      this.elements.table.append(caption);

      this.createRow("Category", "Word", "Translation", "Train click", "Asked question", "Error", "Correct", 'table__row_head');

      this.arrayOfAnswers.arrayOfAnswer.forEach(item => {
         this.createRow(item.category, item.word, item.translation, item.trainClick, item.askedQuestion, item.error, item.correct, 'table__row');
      });

   }
   _clickTable(event) {

      let td = event.target;
      switch (td.textContent) {
         case 'Word': this.sortTable('word', td); break;
         case 'Category': this.sortTable('category', td); break;
         case 'Error': this.sortTable('error', td); break;
         case 'Train click': this.sortTable('trainClick', td); break;
         case 'Translation': this.sortTable('translation', td); break;
         case 'Asked question': this.sortTable('askedQuestion', td); break;
         case 'Correct': this.sortTable('correct', td); break;
      }

   }
   sortTable(field, cell) {
      this.elements.table.remove();
      if (cell.classList.contains('down')) {
         this.arrayOfAnswers.sortArray(field, true);
         this.createTable();
         let arrcells = this.elements.table.rows[0].cells;
         for (let i in arrcells) {
            if (arrcells[i].textContent === cell.textContent) arrcells[i].classList.add('up');
         }

      }
      else {
         this.arrayOfAnswers.sortArray(field, false);
         this.createTable();
         let arrcells = this.elements.table.rows[0].cells;
         for (let i in arrcells) {
            if (arrcells[i].textContent === cell.textContent) arrcells[i].classList.add('down');
         }
      }
      this.elements.tableContainer.append(this.elements.table);
   }
   writeInLocale() {
      this.arrayOfAnswers.arrayOfAnswer.forEach((item, index) => {
         localStorage.setItem(`english${index}`, item.toStr());
      });
   }
   readFromLocale() {
      this.arrayOfAnswers.arrayOfAnswer.forEach((item, index) => {
         let wordFromLocale = localStorage.getItem(`english${index}`);
         if (wordFromLocale) {
            let array = wordFromLocale.split('#');
            if (item.word === array[1]) item.write(array);
            else {
               let word = this.arrayOfAnswers.arrayOfAnswer.find(word => word.word === array[1]);
               if (word) word.write(array);
            }
         }
      });
   }
   clear() {
      localStorage.clear();
   }
   createRow(category, word, translation, trainClick, askedQuestion, error, correct, classRow) {
      let persent = '';
      if (Number.isInteger(correct) && correct !== 0 && askedQuestion !== 0) persent = `(${Math.round(correct * 100 / askedQuestion)}%)`;
      let row = this.elements.table.insertRow();
      row.classList.add(classRow);
      let td = row.insertCell();
      td.textContent = category;
      td.classList.add('selected');
      td = row.insertCell();
      td.textContent = word;
      td = row.insertCell();
      td.textContent = translation;
      td = row.insertCell();
      td.textContent = trainClick;
      td = row.insertCell();
      td.textContent = askedQuestion;
      td = row.insertCell();
      td.textContent = error;
      td = row.insertCell();
      td.textContent = `${correct}${persent}`;
      return row;
   }


}