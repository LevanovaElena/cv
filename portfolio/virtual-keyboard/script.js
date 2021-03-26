const keyLayoutEn = [['mic', ''], ['sound', ''],
["1", "!", 'Digit1'], ["2", "@", 'Digit2'], ["3", "#", 'Digit3'], ["4", "$", 'Digit4'], ["5", "%", 'Digit5'], ["6", "^", 'Digit6'],
["7", "&", 'Digit7'], ["8", "0", 'Digit8'], ["9", "(", 'Digit9'], ["0", ")", 'Digit0'], ["backspace", "", 'Backspace'],
["shift", "", 'ShiftLeft'],
["q", "", 'KeyQ'], ["w", "", 'KeyW'], ["e", "", 'KeyE'], ["r", "", 'KeyR'], ["t", "", 'KeyT'], ["y", "", 'KeyY'], ["u", "", 'KeyU'],
["i", "", 'KeyI'], ["o", "", 'KeyO'], ["p", "", 'KeyP'], ["[", "}", 'BracketLeft'], ["]", "}", 'BracketRight'],
["caps", "", 'CapsLock'], ["a", "", 'KeyA'], ["s", "", 'KeyS'], ["d", "", 'KeyD'], ["f", "", 'KeyF'], ["g", "", 'KeyG'],
["h", "", 'KeyH'], ["j", "", 'KeyJ'], ["k", "", 'KeyK'], ["l", "", 'KeyL'], [";", ":", 'Semicolon'], ["'", "\"", 'Quote'], ["enter", "", 'Enter'],
["done", ""], ["z", "", 'KeyZ'], ["x", "", 'KeyX'], ["c", "", 'KeyC'], ["v", "", 'KeyV'], ["b", "", 'KeyB'], ["n", "", 'KeyN'],
["m", "", 'KeyM'], [",", "<", 'Comma'], [".", ">", 'Period'], ["?", "/", 'Slash'],
["en", "ru", 'AltLeftshiftKeyaltKey'], ["space", "", 'Space'], ["left", "", 'ArrowLeft'], ["right", "", 'ArrowRight']
];
const keyLayoutRu = [['mic', ''], ['sound', ''],
["1", "!", 'Digit1'], ["2", "@", 'Digit2'], ["3", "#", 'Digit3'], ["4", "$", 'Digit4'], ["5", "%", 'Digit5'], ["6", "^", 'Digit6'],
["7", "&", 'Digit7'], ["8", "0", 'Digit8'], ["9", "(", 'Digit9'], ["0", ")", 'Digit0'], ["backspace", "", 'Backspace'],
["shift", "", 'ShiftLeft'],
["й", "", 'KeyQ'], ["ц", "", 'KeyW'], ["у", "", 'KeyE'], ["к", "", 'KeyR'], ["е", "", 'KeyT'], ["н", "", 'KeyY'], ["г", "", 'KeyU'],
["ш", "", 'KeyI'], ["щ", "", 'KeyO'], ["з", "", 'KeyP'], ["х", "}", 'BracketLeft'], ["ъ", "}", 'BracketRight'],
["caps", "", 'CapsLock'], ["ф", "", 'KeyA'], ["ы", "", 'KeyS'], ["в", "", 'KeyD'], ["а", "", 'KeyF'], ["п", "", 'KeyG'],
["р", "", 'KeyH'], ["о", "", 'KeyJ'], ["л", "", 'KeyK'], ["д", "", 'KeyL'], ["ж", ":", 'Semicolon'], ["э", "\"", 'Quote'], ["enter", "", 'Enter'],
["done", ""], ["я", "", 'KeyZ'], ["ч", "", 'KeyX'], ["с", "", 'KeyC'], ["м", "", 'KeyV'], ["и", "", 'KeyB'], ["т", "", 'KeyN'],
["ь", "", 'KeyM'], ["б", "<", 'Comma'], ["ю", ">", 'Period'], [".", ",", 'Slash'],
["en", "ru", 'AltLeftshiftKeyaltKey'], ["space", "", 'Space'], ["left", "", 'ArrowLeft'], ["right", "", 'ArrowRight']
];
var recognizer = new webkitSpeechRecognition(); // Создаем распознаватель

let Keyboard = {
   elements: {
      main: null,//обертка для клавиатуры
      keysContainer: null,//контейнер для клавиш
      keys: []
   },

   eventHandlers: {
      oninput: null,
      onclose: null
   },

   properties: {
      value: "",
      capsLock: false,
      shift: false,
      language: "en",
      positionCursor: 1,
      sound: true,
      mic: false
   },

   init() {
      // Create main elements
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");


      // Setup main elements //elem.classList – это специальный объект с методами для добавления/удаления одного класса.
      this.elements.main.classList.add("keyboard", "keyboard--hidden");//div with class keyboard & keyboard--hidden - обертка для клавы
      this.elements.keysContainer.classList.add("keyboard__keys");//div с класcом keyboard__keys
      this.elements.keysContainer.appendChild(this._createKeys());//добавляем все кнопки в свойство keysContainer

      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");//получаем ссылку на див с кнопками-в коллекцию

      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
      recognizer.lang = this.properties.language === 'ru' ? 'ru-Ru' : 'en-EN';// Какой язык будем распознавать?
      // Automatically use keyboard for elements with .use-keyboard-input
      document.querySelectorAll(".use-keyboard-input").forEach(element => {
         element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
               element.value = currentValue;
            });
         });
      });
   },

   //Функция для создания массива клавиш
   _createKeys() {
      const fragment = document.createDocumentFragment();//новый пустой элемент 

      const keyLayout = this.properties.language === "en" ? keyLayoutEn : keyLayoutRu;
      // Creates HTML for an icon , функция возвращает строку для кнопки с иконкой change_history
      const createIconHTML = (icon_name) => {
         return `<i class="material-icons">${icon_name}</i>`;
      };
      const insertNewSimbol = (newSimbol) => {
         let text = this.properties.value.split('');
         text.splice(this.properties.positionCursor, 0, newSimbol);
         this.properties.value = text.join('');
         this.properties.positionCursor += newSimbol.length;
      };
      let insertLineBreak = false;//флаг ,что нужно вставить разрыв строки в клавиатуре-для следующей строки кнопок
      let divRow = document.createElement("div");//создали div для строки кнопок
      divRow.classList.add('.row');

      keyLayout.forEach(key => {
         const keyElement = document.createElement("button");//создали кнопку

         if (insertLineBreak) {
            divRow = document.createElement("div");//создали div для строки кнопок
            insertLineBreak = false;
         }
         if (this.properties.language === "ru") insertLineBreak = ["backspace", "ъ", "enter", ".", 'right'].indexOf(key[0]) !== -1;
         else insertLineBreak = ["backspace", "]", "enter", "?", 'right'].indexOf(key[0]) !== -1;

         // Add attributes/classes
         keyElement.setAttribute("type", "button");//присвоили атрибут
         keyElement.classList.add("keyboard__key");//и класс
         keyElement.classList.add(key[2]);//присвоили класс равный коду клавиатуры

         switch (key[0]) {
            case "backspace":
               keyElement.classList.add("keyboard__key--wide");//широкая кнопка
               keyElement.innerHTML = createIconHTML("backspace");

               keyElement.addEventListener("click", () => {//
                  let text = this.properties.value.split('');
                  text.splice(this.properties.positionCursor - 1, 1);
                  this.properties.value = text.join('');
                  this.properties.positionCursor--;
                  if (this.properties.value === "") this.properties.positionCursor = 0;
                  this._triggerEvent("oninput");
                  this._clickAudio("./assets/mp3/backspace.mp3");
               });

               break;

            case "caps":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
               keyElement.innerHTML = createIconHTML("keyboard_capslock");

               keyElement.addEventListener("click", () => {
                  this._toggleCapsLock();
                  keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                  this._clickAudio("./assets/mp3/capslock.mp3");
               });

               break;

            ///shift
            case "shift":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "shift");
               keyElement.innerHTML = createIconHTML("change_history");

               keyElement.addEventListener("click", () => {
                  this._toggleShift();
                  keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                  this._clickAudio("./assets/mp3/shift.mp3");
               });

               break;
            ///language
            case "en":
               keyElement.classList.add("keyboard__key--wide", "en-ru");
               keyElement.innerHTML = this.properties.language;

               keyElement.addEventListener("click", () => {
                  this._toggleLanguage();
                  keyElement.textContent = this.properties.language;
                  this._clickAudio("lang");
               });

               break;

            //left
            case "left":
               keyElement.classList.add("keyboard__key--wide", "left");
               keyElement.innerHTML = createIconHTML("west");
               keyElement.addEventListener("click", () => {
                  let textaria = document.querySelector(".use-keyboard-input");
                  textaria.focus();
                  if (this.properties.positionCursor > 0) {
                     this.properties.positionCursor--;
                     textaria.selectionStart = textaria.selectionEnd = this.properties.positionCursor;
                  }
                  this._clickAudio('lang');
               });
               break;
            //right
            case "right":
               keyElement.classList.add("keyboard__key--wide", "right");
               keyElement.innerHTML = createIconHTML("east");
               keyElement.addEventListener("click", () => {
                  let textaria = document.querySelector(".use-keyboard-input");
                  textaria.focus();
                  if (this.properties.positionCursor < this.properties.value.length) {
                     this.properties.positionCursor++;
                     textaria.selectionStart = textaria.selectionEnd = this.properties.positionCursor;
                  }
                  this._clickAudio('lang');
               });
               break;
            case 'sound'://звуки клавиатуры
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--active", "keyboard__key--activatable", "sound");
               keyElement.innerHTML = createIconHTML("volume_up");

               keyElement.addEventListener("click", () => {
                  this.properties.sound = this.properties.sound ? false : true;
                  keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
                  this._clickAudio('lang');
               });
               break;
            case 'mic':
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "mic");
               keyElement.innerHTML = createIconHTML("mic");


               recognizer.interimResults = true;// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
               recognizer.continuous = true;

               // Используем колбек для обработки результатов
               recognizer.onresult = function (event) {
                  var result = event.results[event.resultIndex];
                  if (result.isFinal) {

                     insertNewSimbol(result[0].transcript);
                     document.querySelector(".use-keyboard-input").value = Keyboard.properties.value;
                  } else {
                     console.log('Промежуточный результат: ', result[0].transcript);
                  }
               };

               keyElement.addEventListener("click", () => {
                  this.properties.mic = this.properties.mic ? false : true;

                  if (this.properties.mic)//микрофон стал активен
                  {
                     recognizer.start();
                  }
                  else {
                     recognizer.stop();
                     //insertNewSimbol(text);

                     //text = '';
                  }
                  keyElement.classList.toggle("keyboard__key--active", this.properties.mic);
                  document.querySelector(".use-keyboard-input").value = Keyboard.properties.value;
                  this._clickAudio('lang');


               });
               break;
            case "enter"://ентер
               keyElement.classList.add("keyboard__key--wide");
               keyElement.innerHTML = createIconHTML("keyboard_return");

               keyElement.addEventListener("click", () => {
                  insertNewSimbol("\n");
                  this._triggerEvent("oninput");
                  this._clickAudio("./assets/mp3/enter.mp3");
               });

               break;

            case "space"://пробел
               keyElement.classList.add("keyboard__key--extra-wide");
               keyElement.innerHTML = createIconHTML("space_bar");

               keyElement.addEventListener("click", () => {
                  insertNewSimbol(' ');
                  this._triggerEvent("oninput");
                  this._clickAudio("./assets/mp3/enter.mp3");
               });

               break;

            case "done"://кнопка спрятать клаву
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
               keyElement.innerHTML = createIconHTML("check_circle");

               keyElement.addEventListener("click", () => {
                  //this._clickAudio("./assets/mp3/shift.mp3");
                  this.close();
                  this._triggerEvent("onclose");
               });

               break;

            default://остальные клавиши
               if (key[1] !== "") keyElement.innerHTML = `<div class="under-key">${key[1]}</div><div>${key[0].toLowerCase()}</div>`;
               else keyElement.textContent = key[0].toLowerCase();

               keyElement.addEventListener("click", () => {
                  let textaria = document.querySelector(".use-keyboard-input");
                  textaria.focus();
                  let newSimbol = '';
                  if (!this.properties.shift) //shift не нажат
                  {
                     if (keyElement.children.length !== 0) newSimbol = this.properties.capsLock ? keyElement.lastChild.textContent.toUpperCase() : keyElement.lastChild.textContent.toLowerCase();
                     else newSimbol = this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
                  }
                  else {//shift нажат
                     if (keyElement.children.length === 0) newSimbol = !this.properties.capsLock ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
                     else newSimbol = keyElement.firstChild.textContent;
                     this.properties.shift = false;
                     document.querySelector(".shift").classList.toggle("keyboard__key--active", this.properties.shift);
                  }
                  insertNewSimbol(newSimbol);
                  this._triggerEvent("oninput");
                  this._clickAudio("lang");
               });

               break;
         }

         divRow.appendChild(keyElement);//добавляем кнопку

         if (insertLineBreak) {
            fragment.appendChild(divRow);
            divRow = document.createElement("div");//создали div для строки кнопок
            divRow.classList.add('.row');
            insertLineBreak = false;
         }
      });

      return fragment;
   },

   _clickAudio(mp3) {
      let textaria = document.querySelector(".use-keyboard-input");
      textaria.focus();
      textaria.selectionEnd = this.properties.positionCursor;
      if (this.properties.sound) {
         var audio = new Audio(); // Создаём новый элемент Audio
         if (mp3 === 'lang') audio.src = this.properties.language === "ru" ? './assets/mp3/key_ru.mp3' : './assets/mp3/keyen.mp3';
         else audio.src = mp3; // Указываем путь к звуку "клика"
         audio.autoplay = true; // Автоматически запускаем
      }
   },

   _triggerEvent(handlerName) {

      if (typeof this.eventHandlers[handlerName] == "function") {
         this.eventHandlers[handlerName](this.properties.value);
      }

   },

   _toggleCapsLock() {//если нажали капслок то вид букв на клавишах делаем строчным или заглавным
      this.properties.capsLock = !this.properties.capsLock;//свойсво - отвечает за капслок

      for (const key of this.elements.keys) {
         if (key.firstChild.tagName !== "I") {

            if (key.children.length !== 0) {
               let keyS = this.properties.capsLock ? key.children[1].textContent.toUpperCase() : key.children[1].textContent.toLowerCase();
               key.innerHTML = `<div class="under-key">${key.children[0].textContent}</div><div>${keyS}</div>`;
            }
            else key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         }
      }
   },

   _toggleShift() {
      this.properties.shift = this.properties.shift ? false : true;
   },

   _toggleLanguage() {

      if (this.properties.language === "en") {
         this.properties.language = "ru";
         keyLayout = keyLayoutRu;
      }
      else {
         this.properties.language = "en";
         keyLayout = keyLayoutEn;
      }

      let i = 0;
      for (const key of this.elements.keys) {
         if (key.firstChild.tagName !== "I") {
            let arr = keyLayout[i];
            let keyS = this.properties.capsLock ? arr[0].toUpperCase() : arr[0].toLowerCase();
            if (arr[1] !== "") key.innerHTML = `<div class="under-key">${arr[1]}</div><div>${keyS}</div>`;
            else key.textContent = keyS;
         }
         i++;

      }
      recognizer.lang = this.properties.language === 'ru' ? 'ru-Ru' : 'en-EN';// Какой язык будем распознавать?

   },
   open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
   },

   close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
      //document.querySelectorAll(".use-keyboard-input").blur();
   }
};

/**event DOMContentLoaded - браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки <img> и стили, могут быть ещё не загружены.*/
window.addEventListener("DOMContentLoaded", function () {
   Keyboard.init(); //init object 
});

document.addEventListener('keydown', (event) => {

   let code = event.code.split(' ').join('');
   if (code === 'ShiftRight') code = 'ShiftLeft';
   let elem = document.querySelector(`.${event.code}`);
   if (elem != undefined) elem.classList.toggle("activ", true);

});

document.addEventListener('keyup', (event) => {
   let key = document.querySelector(`.${event.code}`);
   if (key != undefined) {
      key.classList.toggle("activ", false);
      let textaria = document.querySelector('.use-keyboard-input');
      Keyboard.properties.value = textaria.value;
      Keyboard.properties.positionCursor = textaria.selectionEnd;
   }
});

document.querySelector('.use-keyboard-input').onclick = function () {
   Keyboard.properties.positionCursor = this.selectionEnd;
};