export function createNodeList(list) {
  const nodeList = [];
  list.forEach((movieItem) => {
    const { movie, img } = createMovieImg(movieItem, "w300");
    movie.classList.add("category__item", "movie");
    img.classList.add("category__img");
    img.setAttribute("movie-id", movieItem.id);
    nodeList.push(movie);
  });
  return nodeList;
}
export function createModal() {
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
  backIcon.textContent = "<";
  backIcon.classList.add("back-arrow");
  backIcon.addEventListener("click", () => history.back());

  const closeIcon = document.createElement("div");
  closeIcon.innerText = "X";
  closeIcon.addEventListener("click", () => {
    location.hash = "home";
  });
  closeIcon.classList.add("modal__close-icon");

  header.append(modalTitle);
  modal.append(modalContainer, modalBackground);
  modalContainer.append(header, mainContent, closeIcon, backIcon);

  return { modal, mainContent, modalTitle };
}
export function createMovieImg(
  { backdrop_path, title, name, poster_path },
  imgSize
) {
  const movie = document.createElement("div");
  movie.setAttribute("data-movie", title ? title : name);
  const img = document.createElement("img");
  const baseUrl = "https://image.tmdb.org/t/p/";

  if (backdrop_path) {
    img.src = `${baseUrl}${imgSize}${backdrop_path}`;
  } else {
    img.src = `${baseUrl}${imgSize}${poster_path}`;
    // console.log(movieImg);
  }
  img.alt = title ? title : name;
  img.classList.add("movie-img--with-title");
  movie.append(img);
  return { movie, img };
}
export function createCarousel(list) {
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
export function createIcon(name) {
  const iconTag = document.createElement("i");
  iconTag.classList.add("bi", `bi-${name}`);
  return iconTag;
}