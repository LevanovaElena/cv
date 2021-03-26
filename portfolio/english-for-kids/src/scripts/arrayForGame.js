/**
 * Класс для удобного хранения данных для игры - с результатами по каждому слову
 */
class ArrayForGame {
   constructor(category) {
      this.findWord = 0;//индекс слова для поиска
      this.arrayWord = category.words;
      this.isWin = false;
      this.errors = 0;
      this.correct = 0;
      this.startGame = true;
      this.audio = {
         error: "audio/game/error.mp3",
         ok: "audio/game/ej.mp3",
         win: "audio/game/fanfare_short.mp3",
         losing: "audio/game/losing.mp3"
      }
      this.img = {
         win: './assets/img/win/5G7b.gif',
         losing: './assets/img/win/losing.jpg'
      }
   }
   /**
    * проверка слова
    * @param {*} word - слово для проверки
    */
   checkWord(word) {
      if (this.arrayWord[this.findWord].word === word) {
         this.arrayWord[this.findWord].ok++;
         this.findWord = this.findWord === (this.arrayWord.length - 1) ? this.checkWin() : (this.findWord + 1);
         return true;
      }
      else {
         this.arrayWord[this.findWord].error++;
         return false;
      }
   }
   checkWin() {
      this.startGame = false;
      this.isWin = this.errors > 0 ? false : true;
   }

   mixArray() {
      let randIndex;
      for (let i = 0; i < this.arrayWord.length; i++) {
         randIndex = Math.floor(Math.random() * this.arrayWord.length);
         let x = this.arrayWord[i];
         this.arrayWord[i] = this.arrayWord[randIndex];
         this.arrayWord[randIndex] = x;
      }
   }
}