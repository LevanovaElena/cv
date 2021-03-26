let base = './assets/images/day/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

//мешаем массив  алгоритмом Фишера-Йетса https://habr.com/ru/post/358094/
function shuffle(arr) {
   var j, temp;
   for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
   }
   return arr;
}

//формируем массив в зависимости от времени суток
function getArrImages(all) {
   if (!all)//массив в зависимости от текущего времени
   {
      let today = new Date(),
         hour = today.getHours();

      if (hour < 12 && hour >= 6) {
         // Morning
         base = './assets/images/morning/';
      } else if (hour < 18 && hour >= 12) {
         // Afternoon
         base = './assets/images/day/';
      } else if (hour >= 18 && hour < 24) {
         // Evening
         base = './assets/images/evening/';
      }
      else {
         // night
         base = './assets/images/night/';
      }
   }
   else //формируем следующий вне зависимости от текущего времени
   {
      if (base.indexOf("morning") != -1) base = './assets/images/day/';
      else if (base.indexOf("day") != -1) base = './assets/images/evening/';
      else if (base.indexOf("evening") != -1) base = './assets/images/night/';
      else if (base.indexOf("night") != -1) base = './assets/images/day/';
      i = 0;
   }
   shuffle(images);
}

//изменяем фон
function viewBgImage(data) {
   const body = document.querySelector('body');
   const src = data;
   const img = document.createElement('img');
   img.src = src;
   img.onload = () => {
      body.style.backgroundImage = `url(${src})`;
   };
}

//событие кнопки обновления изображения
function getImage() {
   const index = i % images.length;
   const imageSrc = base + images[index];
   viewBgImage(imageSrc);
   i++;
   if (i == images.length) getArrImages(true);
   btn.disabled = true;
   setTimeout(function () { btn.disabled = false }, 1000);

}

//установим фон и запустим таймер

function setImage() {
   let today = new Date(),
      min = today.getMinutes(),
      sec = today.getSeconds();
   if (min === 0 && sec === 0) getImage();
   setTimeout(setImage, 1000);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);


//run
getArrImages(false);
setImage();
getImage();