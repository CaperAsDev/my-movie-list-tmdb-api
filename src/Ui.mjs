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
  img.setAttribute("movie-id", obj.id);

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
  img.setAttribute("movie-id", obj.id);
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

  const nodeList = createNodeList(list);

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
  weekTrendsContainer.classList.add(
    "trends-container--week",
    "trends-container"
  );

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
    img.setAttribute("movie-id", movieItem.id);
    nodeList.push(movie);
  });
  return nodeList;
}
//!Crear modal de busqueda
export function createSearchModal(list, searchedValue) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("search-modal");
  mainContent.classList.add("search-container");
  modalTitle.classList.add("search-title");
  modalTitle.innerHTML = `Resultados de busqueda: <span class="search-modal__value">${searchedValue}</span>`;

  const nodeList = createNodeList(list);

  mainContent.append(...nodeList);
  return modal;
}
export function createEmptySearchResults(searchedValue) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("empty-search-modal");
  mainContent.classList.add("empty-search-container");
  modalTitle.classList.add("empty-search-title");
  modalTitle.innerHTML = `NO hay Resultados para la busqueda: <span class="search-modal__value">${searchedValue}</span>`;

  return modal;
}
//?Creacion modal
//!Movie Details
export function createMovieDetailsModal(
  movieObj,
  similarMoviesArr,
  casting,
  trailers
) {
  const { modal, mainContent } = createModal();
  modal.classList.add("detail-modal");
  mainContent.classList.add("detail-container");

  const header = mainContent.previousElementSibling;
  header.remove();

  const similarProductions = document.createElement("div");
  similarProductions.classList.add("similar-productions");
  mainContent.insertAdjacentElement("afterend", similarProductions);

  const { movie, img } = createMovieImg(movieObj, "w780");
  movie.classList.add("movie-image-container");
  img.classList.add("detail-movie-image");
  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info");

  const overview = document.createElement("div");
  overview.classList.add("movie-overview");
  overview.textContent = movieObj.overview;
  const movieData = document.createElement("div");
  movieData.classList.add("movie-data");

  const movieRuntime = formatMovieDuration(movieObj.runtime);
  const movieGenres = movieObj.genres;
  const genresNames = movieGenres.map((genre) => genre.name);

  const ulInfo = createUl(
    movieRuntime,
    movieObj.release_date,
    movieObj.vote_average.toFixed(1)
  );
  ulInfo.classList.add("ul-info", "ul");
  const ulCategories = createUl(...genresNames);
  ulCategories.classList.add("ul-categories", "ul");
  const movieInteractions = document.createElement("div");
  movieInteractions.classList.add("movie-interactions");

  const addToWatchButton = document.createElement("button");
  addToWatchButton.classList.add("movie-interactions__button");
  addToWatchButton.textContent = "🎥";
  addToWatchButton.title = "Add to Watch List";
  const addToFavButton = document.createElement("button");
  addToFavButton.classList.add("movie-interactions__button");
  addToFavButton.textContent = "❤️";
  addToFavButton.title = "Add to Favorites";

  if (casting.length > 4) {
    const actorsAside = document.createElement("aside");
    actorsAside.classList.add("actors-aside");
    const actorsContainer = document.createElement("div");
    actorsContainer.classList.add("actors-container");
    const asideTab = document.createElement("div");
    asideTab.classList.add("aside-tab");
    const tabIcon = document.createElement("div");
    tabIcon.classList.add("tab__icon", "tab__icon--vertical");

    const actorCardsNodes = [];
    casting.forEach((actor) => {
      const actorCard = createActorCard(actor);
      actorCardsNodes.push(actorCard);
    });
    actorsContainer.append(...actorCardsNodes);

    asideTab.append(tabIcon);
    actorsAside.append(actorsContainer, asideTab);
    movieInfo.append(actorsAside);
  }

  const similarProductionsTitle = document.createElement("h4");
  similarProductionsTitle.textContent = "Similar Productions";
  similarProductionsTitle.classList.add("similar-productions__title")
  const similarProductionsCarousel = createCarousel(similarMoviesArr);
  similarProductionsCarousel.classList.add("detail-carousel");

  const divisor = document.createElement("div");
  divisor.classList.add("line", "line--long");

  mainContent.append(movie, movieInfo);
  movieInfo.append(overview, movieData);
  movieData.append(ulInfo, ulCategories, movieInteractions);
  movieInteractions.append(addToFavButton, addToWatchButton);
  similarProductions.append(
    similarProductionsTitle,
    similarProductionsCarousel
  );

  return modal;
}
function createActorCard({ profile_path, original_name, character, shortCharacterName, voiceActor }) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "actor";
  voiceActor? cardContainer.classList.add("voice-actor"):null;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const imgSize = "w185";
  const cardImg = document.createElement("img");
  cardImg.src = `${baseUrl}${imgSize}${profile_path}`;
  cardImg.className = "actor__img";

  const cardInfo = document.createElement("div");
  cardInfo.className = "actor__detail";

  const name = document.createElement("p");
  name.classList.add("actor__text--bold", "actor__text");
  name.textContent = original_name;

  const characterP = document.createElement("p");
  characterP.className = "actor__text";
  characterP.title = character;
  characterP.textContent = shortCharacterName;

  cardContainer.append(cardImg, cardInfo);
  cardInfo.append(name, characterP);

  return cardContainer;
}
function formatMovieDuration(number) {
  const hours = parseInt(number / 60);
  const minuts = number % 60;
  const time = `${hours}h ${minuts}m`;
  return time;
}
function createUl(...li) {
  const ul = document.createElement("ul");
  for (const listItem of li) {
    const lItem = document.createElement("li");
    lItem.textContent = listItem;
    ul.appendChild(lItem);
  }
  return ul;
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
    history.back();
  });
  modalBackground.classList.add("modal__background");

  const backIcon = document.createElement("div");
  backIcon.textContent  = "<";
  backIcon.classList.add("back-arrow");
  backIcon.addEventListener("click", () => history.back())

  const closeIcon = document.createElement("div");
  closeIcon.innerText = "X";
  closeIcon.addEventListener("click", () => {
    location.hash = "home";
  });
  closeIcon.classList.add("modal__close-icon");

  header.append(modalTitle);
  modal.append(modalContainer, modalBackground);
  modalContainer.append(header, mainContent, closeIcon,backIcon);

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
