import { createCarousel, createMovieImg } from "./microConstructors.mjs";

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
export function createSpotlight(obj) {
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

  return {movie, panelContainer};
}
export function createListItem({ name, id }) {
  const li = document.createElement("li");
  li.classList.add("list__item");
  li.innerText = name;
  li.addEventListener("click", () => {
    location.hash = `category=${id}`;
  });
  return li;
}