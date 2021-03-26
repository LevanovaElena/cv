class Category {
   constructor(title, img, name, words) {

      this.title = title;
      this.image = img;
      this.name = name;
      this.words = words;
   }
   get fullPathImg() {
      return `./assets/img/categories/${img}`;
   }
};

class Word {
   constructor(word, translation, image, audioSrc) {
      this.word = word;
      this.translation = translation;
      this.image = image;
      this.audioSrc = audioSrc;
   }
};

class WordWithStatistics {
   constructor(categoryname, word, translation) {
      this.category = categoryname;
      this.word = word;
      this.translation = translation;
      this.trainClick = 0;
      this.askedQuestion = 0;
      this.error = 0;
      this.correct = 0;
   }
   toStr() {
      return `${this.category}#${this.word}#${this.translation}#${this.trainClick}#${this.askedQuestion}#${this.error}#${this.correct}`;
   }
   write(array) {
      this.trainClick = parseInt(array[3]);
      this.askedQuestion = parseInt(array[4]);
      this.error = parseInt(array[5]);
      this.correct = parseInt(array[6]);
   }
   clear() {
      this.trainClick = 0;
      this.askedQuestion = 0;
      this.error = 0;
      this.correct = 0;
   }

}

class ArrayOfAnswer {
   constructor(cards) {
      this.arrayOfAnswer = [];
      cards.forEach((category, index) => {
         if (category.name !== 'main') {
            let newarr = category.words.map((word) => {
               return new WordWithStatistics(category.name, word.word, word.translation);
            });
            if (index === 0) this.arrayOfAnswer = newarr;
            else this.arrayOfAnswer = this.arrayOfAnswer.concat(newarr);
         }
      });
   }
   clear() {
      this.arrayOfAnswer.forEach(item => item.clear());
   }

   addGame(word, isCorrect) {
      let findword = this.arrayOfAnswer.find(item => item.word === word);
      if (isCorrect) findword.correct++;
      else findword.error++;
      findword.askedQuestion++;
   }
   addTrain(word) {
      this.arrayOfAnswer.find(item => item.word === word).trainClick++;
   }
   sortArray(field, increment) {
      if (field === 'error') this.arrayOfAnswer.sort((a, b) => this.sortByNumber(a.error, b.error, increment));
      if (field === 'trainClick') this.arrayOfAnswer.sort((a, b) => this.sortByNumber(a.trainClick, b.trainClick, increment));
      if (field === 'correct') this.arrayOfAnswer.sort((a, b) => this.sortByNumber(a.correct, b.correct, increment));
      if (field === 'askedQuestion') this.arrayOfAnswer.sort((a, b) => this.sortByNumber(a.askedQuestion, b.askedQuestion, increment));
      if (field === 'category') this.arrayOfAnswer.sort((a, b) => this.typeSort(a.category, b.category, increment));
      if (field === 'word') this.arrayOfAnswer.sort((a, b) => this.typeSort(a.word, b.word, increment));
      if (field === 'translation') this.arrayOfAnswer.sort((a, b) => this.typeSort(a.translation, b.translation, increment));
   }
   sortByNumber(a, b, increment) {
      let c = increment ? (a - b) : (a - b) * -1;
      return c;
   }
   typeSort(a, b, increment) {
      let c = increment ? 1 : -1;
      var nameA = a.toLowerCase(), nameB = b.toLowerCase()
      if (nameA < nameB) //сортируем строки по возрастанию
         return -1 * c
      if (nameA > nameB)
         return 1 * c
      return 0 // Никакой сортировки
   }

   createArrayWord(cards, numberOfWord, fieldSort) {
      this.sortArray(fieldSort);
      if (this.arrayOfAnswer[0].error === 0) return null;
      let arrayWord = [];
      for (let i = 0; i < numberOfWord; i++) {
         if (this.arrayOfAnswer[i].error === 0) return arrayWord;
         let array = cards.find(category => category.name === this.arrayOfAnswer[i].category).words;//получили все слова категории
         arrayWord.push(array.find(word => word.word === this.arrayOfAnswer[i].word));
      }
      return arrayWord;
   }
};