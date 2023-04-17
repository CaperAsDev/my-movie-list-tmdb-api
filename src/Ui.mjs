//!Creacion de nodos para el catalogo
export function createCatalogSection(category, arrObjs) {
  const section = document.createElement("section");
  const categoryName = category.replace(/\s+/g, "_");
  section.classList.add("catalog__item", categoryName);
  const { catHeader, headerProgress } = createCategoryHeader(
    category,
    categoryName
  );
  const carousel = createCarousel(arrObjs);
  const nextIcon = document.createElement("span");
  const beforeIcon = document.createElement("span");
  nextIcon.classList.add("carousel__icon", "carousel__icon--next");
  beforeIcon.classList.add("carousel__icon", "carousel__icon--before");

  section.append(catHeader, beforeIcon, carousel, nextIcon);

  scrollHandler(carousel, headerProgress);
  return section;
}
function createCategoryHeader(category, categoryName) {
  const catHeader = document.createElement("div");
  catHeader.classList.add("item-header");

  const span = document.createElement("span");
  span.className = "item-header__line";

  const headerRigth = document.createElement("div");
  headerRigth.className = "item-header__right";

  const headerTitle = document.createElement("h3");
  headerTitle.className = "item-header__title";
  headerTitle.innerText = category;
  headerTitle.addEventListener("click", () => {
    location.hash = `category=${categoryName}`;
  });

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
function scrollHandler(container, progressBar) {
  container.addEventListener("scroll", (e) => {
    let scrollLeft = container.scrollLeft;
    let scrollWidth = container.scrollWidth;
    let clientWidth = container.clientWidth;

    let scrollPercent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}
//!Creacion de nodos de la lista de generos en el sideBar
export function createListItem(category) {
  const li = document.createElement("li");
  li.classList.add("list__item");
  li.innerText = category;
  const categoryName = category.replace(/\s+/g, "_");
  li.addEventListener("click", () => {
    location.hash = `category=${categoryName}`;
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
export function createCategorySection(list) {
  const categoryModal = document.createElement("section");
  categoryModal.classList.add("category-modal");

  const categoryContentContainer = document.createElement("div");
  categoryContentContainer.classList.add("category-container");

  const categoryBackground = document.createElement("div");
  categoryBackground.classList.add("category-background");
  categoryModal.append(categoryContentContainer, categoryBackground);

  const categoryTitle = document.createElement("h4");
  categoryTitle.classList.add("category__title");

  const categoryContent = document.createElement("div");
  categoryContent.classList.add("category-content");
  categoryContentContainer.append(
    categoryTitle,
    categoryContent,
    closeContainer
  );

  const closeContainer = document.createElement("div");
  closeContainer.classList.add("close-container");

  const closeIcon = document.createElement("span");
  closeIcon.classList.add("close__icon");
  closeContainer.append(closeIcon);

  const nodeList = [];
  list.forEach((movieItem) => {
    const { movie } = createMovieImg(movieItem, "w300");
    movie.classList.add("category__item");
    movie.setAttribute("movie-id", movieItem.id);
    nodeList.push(movie);
  });

  categoryContent.append(...nodeList);

  return categoryModal;
}
