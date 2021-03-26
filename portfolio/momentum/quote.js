// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQ = document.querySelector('.btn-quote');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {
   let url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
   let res = await fetch(url);
   if (res.ok) {
      const data = await res.json();
      blockquote.textContent = data.quoteText;
      figcaption.textContent = data.quoteAuthor;
   }
   else {
      url = `https://favqs.com/api/qotd`;
      res = await fetch(url);
      if (res.ok) {
         const data = await res.json();
         blockquote.textContent = data.quote.body;//data.quoteText;
         figcaption.textContent = data.quote.author;//data.quoteAuthor;
      }
   }
}

btnQ.addEventListener('click', getQuote);
getQuote();