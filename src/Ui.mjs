//!Creacion de nodos para el catalogo
export function createCatalogSection(category, arrObjs) {
  const section = document.createElement("section");
  const categoryName = category.replace(/\s+/g, "_");
  section.classList.add("catalog__item", categoryName);
  const { catHeader, headerProgress } = createCategoryHeader(category, categoryName);
  const carousel = createCarousel(arrObjs);
  const nextIcon = document.createElement("span");
  const beforeIcon = document.createElement("span");
  nextIcon.classList.add("carousel__icon", "carousel__icon--next");
  beforeIcon.classList.add("carousel__icon", "carousel__icon--before");

  section.append(catHeader, beforeIcon, carousel, nextIcon);

  scrollHandler(carousel, headerProgress);
  return section;
}
function createCategoryHeader(category,categoryName) {
  const catHeader = document.createElement("div");
  catHeader.classList.add("item-header");

  const span = document.createElement("span");
  span.className = "item-header__line";

  const headerRigth = document.createElement("div");
  headerRigth.className = "item-header__right";

  const headerTitle = document.createElement("h3");
  headerTitle.className = "item-header__title";
  headerTitle.innerText = category;
  headerTitle.addEventListener('click', ()=>{
    location.hash = `category=${categoryName}`
  })

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
function createCarouselItem({ backdrop_path, title, id, name, poster_path }) {
  const movie = document.createElement("div");
  movie.classList.add("carousel__item", "movie");
  movie.setAttribute("id", id);

  const movieImg = document.createElement("img");
  movieImg.classList.add("movie__img");
  movieImg.alt = title ? title : name;
  movieImg.setAttribute("title", title ? title : name);

  const baseUrl = "https://image.tmdb.org/t/p/";
  const backdropSize = "w780";
  if (backdrop_path) {
    movieImg.src = `${baseUrl}${backdropSize}${backdrop_path}`;
  } else {
    movieImg.src = `${baseUrl}${backdropSize}${poster_path}`;
    // console.log(movieImg);
  }

  movie.append(movieImg);
  return movie;
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
export function createListItem(category){
  const li = document.createElement('li');
  li.classList.add('list__item');
  li.innerText = category
  const categoryName = category.replace(/\s+/g, "_");
  li.addEventListener('click', ()=>{
    location.hash = `category=${categoryName}`
  })
  return li
}