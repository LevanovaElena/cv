const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


async function getWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=cefd55c1f2f0cb72f2c5f59404f17165&units=metric`;
   const res = await fetch(url);
   if (res.ok) {
      const data = await res.json();
      // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${data.main.humidity} %`;
      wind.textContent = `${data.wind.speed} м/с`;
   }
   else {
      clearWeather();
   }
}
function clearWeather() {
   city.textContent = 'Опечатка! Для этого города нет погоды!';
   weatherIcon.className = "";
   temperature.textContent = '';
   weatherDescription.textContent = '';
   humidity.textContent = '';
   wind.textContent = '';
}

function setCity(e) {
   if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) //keyCode, which (для клавиатуры) - возвращает код символа Unicode (для события keypress) тут-enter
      {
         if (e.target.innerText !== '') {
            localStorage.setItem('city', e.target.innerText);//target - DOM-элемент, который сгенерировал событие.
            getWeather();
         }
         else getCity();
         city.blur();//событие потери фокуса
      }
   } else {
      if (e.target.innerText !== '') {
         localStorage.setItem('city', e.target.innerText);
         getWeather();
      }
      else getCity();
   }
}


function getCity() {
   if (localStorage.getItem('city') === null) {
      city.textContent = 'Чтобы узнать погоду, введите город';
   }
   else {
      city.textContent = localStorage.getItem('city');
      getWeather();
   }
}

city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);

getCity();

