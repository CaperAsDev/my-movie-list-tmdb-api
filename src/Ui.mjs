//!Creacion de nodos para el catalogo
export function createCatalogSection(category, arrObjs) {
  const section = document.createElement("section");
  const categoryName = category.name.replace(/\s+/g, "_");
  section.classList.add("catalog__item", categoryName);
  const { catHeader, headerProgress } = createCategoryHeader(category);
  const carousel = createCarousel(arrObjs);
  const nextIcon = document.createElement("span");
  nextIcon.addEventListener("click", () => {
    arrowScroll(carousel, "+");
  });
  const beforeIcon = document.createElement("span");
  beforeIcon.addEventListener("click", () => {
    arrowScroll(carousel, "-");
  });
  nextIcon.classList.add("carousel__icon", "carousel__icon--next");
  beforeIcon.classList.add("carousel__icon", "carousel__icon--before");

  section.append(catHeader, beforeIcon, carousel, nextIcon);

  scrollHandler(carousel, headerProgress);
  return section;
}
function createCategoryHeader(category) {
  const catHeader = document.createElement("div");
  catHeader.classList.add("item-header");

  const span = document.createElement("span");
  span.className = "item-header__line";

  const headerRigth = document.createElement("div");
  headerRigth.className = "item-header__right";

  const headerTitle = document.createElement("h3");
  headerTitle.className = "item-header__title";
  headerTitle.innerText = category.name;
  if (category.name === "Trending") {
    headerTitle.addEventListener("click", () => {
      location.hash = `trend`;
    });
  } else {
    headerTitle.addEventListener("click", () => {
      location.hash = `category=${category.id}`;
    });
  }

  const headerProgress = document.createElement("div");
  headerProgress.className = "item-header__progress";

  const headerProgressBackground = document.createElement("div");
  headerProgressBackground.className = "item-header__progress-background";

  const headerProgressContainer = document.createElement("div");
  headerProgressContainer.className = "item-header__progress-container";

  headerProgressContainer.append(headerProgress, headerProgressBackground);
  headerRigth.append(headerTitle, headerProgressContainer);
  catHeader.append(span, headerRigth);
  return { catHeader, headerProgress };
}
function createCarousel(list) {
  const carousel = document.createElement("div");
  carousel.className = "carousel";

  const tagsList = list.map((elem) => createCarouselItem(elem));
  carousel.append(...tagsList);
  return carousel;
}
function createCarouselItem(obj) {
  const { movie, img } = createMovieImg(obj, "w300");
  movie.classList.add("carousel__item", "movie");
  movie.setAttribute("id", obj.id);

  img.classList.add("movie__img");
  return movie;
}
function createMovieImg({ backdrop_path, title, name, poster_path }, imgSize) {
  const movie = document.createElement("div");

  const img = document.createElement("img");
  const baseUrl = "https://image.tmdb.org/t/p/";

  if (backdrop_path) {
    img.src = `${baseUrl}${imgSize}${backdrop_path}`;
  } else {
    img.src = `${baseUrl}${imgSize}${poster_path}`;
    // console.log(movieImg);
  }
  img.alt = title ? title : name;
  img.title = title ? title : name;

  movie.append(img);
  return { movie, img };
}
//!Creacion de nodos de la lista de generos en el sideBar
export function createListItem({ name, id }) {
  const li = document.createElement("li");
  li.classList.add("list__item");
  li.innerText = name;
  li.addEventListener("click", () => {
    location.hash = `category=${id}`;
  });
  return li;
}
//!Creacion de nodos para el Spotlight
export function createSpotlight(obj) {
  const section = document.createElement("section");
  section.classList.add("spotlight");

  const { movie, img } = createMovieImg(obj, "original");
  movie.classList.add("image-container");
  movie.setAttribute("movie-id", obj.id);
  img.classList.add("image-spotlight");

  const panelContainer = document.createElement("div");
  panelContainer.classList.add("spotlight__panel-container");

  const panelTag = document.createElement("div");
  panelTag.classList.add("panel__tag");

  const tabIcon = document.createElement("div");
  tabIcon.classList.add("tab__icon");
  panelTag.appendChild(tabIcon);

  const spotlightPanel = document.createElement("div");
  spotlightPanel.classList.add("spotlight__panel");

  const spotlightBtnPlay = document.createElement("button");
  spotlightBtnPlay.classList.add(
    "spotlight__button",
    "spotlight__button--play"
  );
  spotlightBtnPlay.setAttribute("movie-id", obj.id);

  const buttonIconPlay = document.createElement("span");
  buttonIconPlay.classList.add("button__icon", "button__icon--play");

  const playTextNode = document.createTextNode("Watch Trailer");
  spotlightBtnPlay.append(buttonIconPlay, playTextNode);

  const spotlightBtnInfo = document.createElement("button");
  spotlightBtnInfo.classList.add(
    "spotlight__button",
    "spotlight__button--info"
  );
  spotlightBtnInfo.setAttribute("movie-id", obj.id);

  const buttonIconInfo = document.createElement("span");
  buttonIconInfo.classList.add("button__icon", "button__icon--info");
  const infoTextNode = document.createTextNode("More Info");
  spotlightBtnInfo.append(buttonIconInfo, infoTextNode);
  spotlightPanel.append(spotlightBtnPlay, spotlightBtnInfo);
  panelContainer.append(panelTag, spotlightPanel);

  section.append(movie, panelContainer);

  return section;
}
//! Creacion seccion por Categoria
export function createCategorySection(list, categoryName) {
  const { modal, mainContent, modalTitle } = createModal();

  modal.classList.add("category-modal");
  mainContent.classList.add("category-container");

  modalTitle.innerText = categoryName;
  modalTitle.classList.add("category__title");

  const nodeList = [];
  list.forEach((movieItem) => {
    const { movie, img } = createMovieImg(movieItem, "w300");
    movie.classList.add("category__item");
    img.classList.add("category__img");
    movie.setAttribute("movie-id", movieItem.id);
    nodeList.push(movie);
  });

  mainContent.append(...nodeList);

  return modal;
}

//!Crear modal de trending
export function createTrendsModal(dayList, weekList, title) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("trends-modal");
  mainContent.classList.add("trending-container");
  modalTitle.innerText = title;

  const dayTrendsTitle = document.createElement("h5");
  dayTrendsTitle.classList.add("day-trends-title", "trends-title");
  dayTrendsTitle.innerText = "Today";

  const weekTrendsTitle = document.createElement("h5");
  weekTrendsTitle.classList.add("week-trends-title", "trends-title");
  weekTrendsTitle.innerText = "This week";

  const dayTrendsContainer = document.createElement("div");
  dayTrendsContainer.classList.add("trends-container--day", "trends-container");

  const weekTrendsContainer = document.createElement("div");
  weekTrendsContainer.classList.add("trends-container--week", "trends-container");

  const dayNodeList = createNodeList(dayList);
  const weekNodeList = createNodeList(weekList);
  
  dayTrendsContainer.append(...dayNodeList);
  weekTrendsContainer.append(...weekNodeList);

  mainContent.append(
    dayTrendsTitle,
    dayTrendsContainer,
    weekTrendsTitle,
    weekTrendsContainer
  );

  return modal;
}
function createNodeList(list) {
  const nodeList = [];
  list.forEach((movieItem) => {
    const { movie, img } = createMovieImg(movieItem, "w300");
    movie.classList.add("category__item");
    img.classList.add("category__img");
    movie.setAttribute("movie-id", movieItem.id);
    nodeList.push(movie);
  });
  console.log(nodeList);
  return nodeList;
}
//!Creacion de panel Modal

function createModal() {
  const modal = document.createElement("section");
  modal.classList.add("modal");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const mainContent = document.createElement("main");
  mainContent.classList.add("main-content");

  const header = document.createElement("header");
  header.classList.add("modal-header");

  const modalTitle = document.createElement("h4");
  modalTitle.classList.add("modal-title");

  const modalBackground = document.createElement("div");
  modalBackground.addEventListener("click", () => {
    modal.remove();
    location.hash = "#home";
  });
  modalBackground.classList.add("modal__background");

  const closeIcon = document.createElement("div");
  closeIcon.innerText = "X";
  closeIcon.addEventListener("click", () => {
    modal.remove();
    location.hash = "#home";
  });
  closeIcon.classList.add("modal__close-icon");
  header.append(modalTitle);
  modal.append(modalContainer, modalBackground);
  modalContainer.append(header, mainContent, closeIcon);

  return { modal, mainContent, modalTitle };
}
//!Funciones complementarias */
function scrollHandler(container, progressBar) {
  container.addEventListener("scroll", (e) => {
    let scrollLeft = container.scrollLeft;
    let scrollWidth = container.scrollWidth;
    let clientWidth = container.clientWidth;

    let scrollPercent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}
function arrowScroll(container, operacion) {
  let scrollLeft = container.scrollLeft;
  let clientWidth = container.clientWidth;

  if (operacion == "+") {
    let newPosition = scrollLeft + clientWidth;
    container.scrollTo(newPosition, 0);
    console.log("corriendo a la der");
  } else {
    let newPosition = scrollLeft - clientWidth;
    container.scrollTo(newPosition, 0);
    console.log("corriendo a la izq");
    scrollLeft -= clientWidth;
  }
}
