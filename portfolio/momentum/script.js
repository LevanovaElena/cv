// DOM Elements
const time = document.querySelector('.time'),
    day = document.querySelector('.day'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');
//const btn = document.querySelector('.btn');
let pict = 1;

// Options
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    //hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} `;
    if (min === 0 && sec === 0) setBgGreet();
    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Set day of week
function showDay() {
    let today = new Date(),
        dayOfmonth = today.getDate(),
        month = today.getMonth(),
        dayOfweek = today.getDay();

    //day of week in normal format
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    dayOfweek = days[dayOfweek];
    //month in normal format
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    month = months[month];

    day.innerHTML = `${dayOfweek}<span>, </span>${dayOfmonth}<span> </span>${month}`;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12 && hour >= 6) {
        // Morning
        greeting.textContent = 'Доброе утро, ';
    } else if (hour < 18 && hour >= 12) {
        // Afternoon

        greeting.textContent = 'Доброго дня, ';
    } else if (hour >= 18 && hour < 24) {
        // Evening
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
    }
    else {
        // Evening
        greeting.textContent = 'Доброй ночи, ';
        document.body.style.color = 'white';
    }

}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {

        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed

        if (e.which == 13 || e.keyCode == 13) //keyCode, which (для клавиатуры) - возвращает код символа Unicode (для события keypress) тут-enter
        {
            if (e.target.innerText !== '') localStorage.setItem('name', e.target.innerText);//target - DOM-элемент, который сгенерировал событие.
            else getName();
            name.blur();//событие потери фокуса
        }
    } else {
        if (e.target.innerText !== '') localStorage.setItem('name', e.target.innerText);
        else getName();
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {

    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText !== '') localStorage.setItem('focus', e.target.innerText);
            else getFocus();
            focus.blur();
        }
    } else {
        if (e.target.innerText !== '') localStorage.setItem('focus', e.target.innerText);
        else getFocus();
    }
}

function clear(e) {
    if (e.type === 'click') e.target.textContent = '';
}


//btn.addEventListener('click', setBgGreet);
city.addEventListener('click', clear);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clear);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clear);

// Run
showTime();
showDay();
setBgGreet();
getName();
getFocus();
