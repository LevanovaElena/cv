class Menu {
   constructor(cards, open, actionGame) {
      this.properties = {
         open: open,//признак активности меню
         actionGame: actionGame,
         activeCategory: null //активная категория
      }

      this.cards = cards; //массив карточек

      this.theme = { //темы для разных режимов игры
         train: 'train',
         game: 'game'
      }

      this.elements = {
         menuBtn: null,
         nav: null, //menu
         itemsContainer: null,//контейнер для пунктов меню
         items: [],//массив пунктов - элементов DOM
         activeItem: null, //активный пункт меню
         overlay: null
      }

      this.init();
   }
   init() {
      this.elements.nav = document.createElement("nav");
      this.elements.nav.classList.add("menu");//menu-active


      this.elements.menuBtn = document.createElement("a");
      this.elements.menuBtn.classList.add("menu__button");
      this.elements.menuBtn.innerHTML = `<span class="menu__lines"></span>`;
      this.elements.menuBtn.addEventListener('click', (event) => {
         event.preventDefault();
         this._toogleMenu();
      });
      this.elements.overlay = document.createElement("div");
      this.elements.overlay.classList.add("menu__overlay");
      this.elements.overlay.addEventListener('click', () => {
         this._toogleMenu();
      });
      document.body.append(this.elements.overlay);

      this.elements.itemsContainer = document.createElement("div");//контейнер для пунктов меню
      this.elements.itemsContainer.classList.add("menu__list");

      if (this.properties.actionGame) this.nav.classList.add(this.theme.game);
      else this.elements.nav.classList.add(this.theme.train);

      this.elements.itemsContainer.append(this.setItems(cards));//menu


      this.elements.activeItem = this.elements.items[0];
      this.elements.activeItem.classList.add('menu__item-active');

      this.properties.activeCategory = new Category('main', '', 'main', this.cards.map(item => { return { word: item.title, image: item.img }; }));
      this.cards.push(this.properties.activeCategory);
      this.elements.nav.append(this.elements.itemsContainer);

   }

   setActiveItem(value) {
      this.elements.activeItem.classList.toggle('menu__item-active');
      this.elements.activeItem = value;
      this.elements.activeItem.classList.toggle('menu__item-active');
   }


   setItems(cards) {
      const fragment = document.createDocumentFragment();
      let item = document.createElement("a");
      item.classList.add('menu__item');
      item.classList.add('menu__item-active');
      item.href = '#';
      item.innerHTML = 'Main page';
      item.id = 'main';
      this.elements.items.push(item);
      fragment.append(item);
      item.addEventListener("click", (event) => {
         this._clickItem(event.target, true);
      });
      cards.forEach(category => {
         item = document.createElement("a");
         item.classList.add('menu__item');
         item.href = '#';
         item.innerHTML = category.title;
         item.id = category.name;
         item.addEventListener("click", (event) => {
            this._clickItem(event.target, true);
         });
         this.elements.items.push(item);
         fragment.append(item);
      });
      return fragment;
   }

   _toogleMenu() {
      this.properties.open = this.properties.open ? false : true;
      this.elements.nav.classList.toggle('menu-active');
      this.elements.menuBtn.classList.toggle('menu__button-active');
      this.elements.overlay.classList.toggle('overlay-active');

   }
   _clickItem(clickItem, open) {
      this.setActiveItem(clickItem);
      this.properties.activeCategory = this.cards.find(item => { if (item.name === clickItem.id) return item; });
      if (open) this._toogleMenu();
   }

   changeColor(actionGame) {
      this.properties.actionGame = actionGame;
      if (this.properties.actionGame) {
         this.elements.nav.classList.remove(this.theme.train);
         this.elements.nav.classList.add(this.theme.game);
      }
      else {
         this.elements.nav.classList.remove(this.theme.game);
         this.elements.nav.classList.add(this.theme.train);
      }
   }


}

