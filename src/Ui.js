export function createCatalogSection(category, arrObjs) {
  const section = document.createElement("section");
	const categoryName = category.replace(/\s+/g, "_");
  section.classList.add("catalog__item", categoryName);
  const catHeader = createCategoryHeader(category);
	const carousel = createCarousel(arrObjs);
	const nextIcon = document.createElement("span");
	const beforeIcon = document.createElement("span");
	nextIcon.classList.add("carousel__icon","carousel__icon--next");
	beforeIcon.classList.add("carousel__icon","carousel__icon--before");

	section.append(catHeader, beforeIcon, carousel, nextIcon);
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
  headerTitle.innerText = category;

  const headerProgress = document.createElement("div");
  headerProgress.className = "item-header__progress";

  let progressNodes = [];

  for (let index = 0; index < 3; index++) {
    const element = document.createElement("span");
    index === 0
      ? element.classList.add(
          "progress__icon",
          "progress__icon--big",
          `page-${index}`
        )
      : element.classList.add(
          "progress__icon",
          "progress__icon--small",
          `page-${index}`
        );
    progressNodes.push(element);
  }
  headerProgress.append(...progressNodes);
  headerRigth.append(headerTitle, headerProgress);
  catHeader.append(span, headerRigth);
  return catHeader;
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
  movieImg.alt = title?title : name;
  movieImg.setAttribute("title", title?title : name);

	const baseUrl = 'https://image.tmdb.org/t/p/';
	const backdropSize = 'w780';
	if(backdrop_path){
		movieImg.src = `${baseUrl}${backdropSize}${backdrop_path}`;
	}else{
		movieImg.src = `${baseUrl}${backdropSize}${poster_path}`;
		console.log(movieImg);
	}

  movie.append(movieImg);
  return movie;
}