import {
  createModal,
  createMovieImg,
  createCarousel,
  createIcon,
} from "./microConstructors.mjs";

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

  const movieTitle = document.createElement("h3");
  movieTitle.classList.add("detail-movie-title");
  movieTitle.append(movieObj.title);

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
    Number(movieObj.vote_average.toFixed(1))
  );
  ulInfo.classList.add("ul-info", "ul");
  const ulCategories = createUl(...genresNames);
  ulCategories.classList.add("ul-categories", "ul");
  const movieInteractions = document.createElement("div");
  movieInteractions.classList.add("movie-interactions");

  const addToWatchButton = document.createElement("button");
  addToWatchButton.classList.add("movie-interactions__button");
  dynamicButtonReaction(addToWatchButton, "Watch List", "bookmark-plus");

  const addToFavButton = document.createElement("button");
  addToFavButton.classList.add("movie-interactions__button");
  dynamicButtonReaction(addToFavButton, "Favorites", "suit-heart");

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
  similarProductionsTitle.classList.add("similar-productions__title");
  const similarProductionsCarousel = createCarousel(similarMoviesArr);
  similarProductionsCarousel.classList.add("detail-carousel");

  const divisor = document.createElement("div");
  divisor.classList.add("line", "line--long");

  mainContent.append(movie, movieInfo);
  movieInfo.append(movieTitle, overview, movieData, movieInteractions);
  movieData.append(ulInfo, ulCategories);
  movieInteractions.append(addToFavButton, addToWatchButton);
  similarProductions.append(
    similarProductionsTitle,
    similarProductionsCarousel
  );

  return modal;
}
function createActorCard({
  profile_path,
  original_name,
  character,
  shortCharacterName,
  voiceActor,
}) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "actor";
  voiceActor ? cardContainer.classList.add("voice-actor") : null;

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
    if (typeof listItem === "number") {
      const icon = createIcon("trophy-fill");
      const lItem = document.createElement("li");
      lItem.append(icon, listItem);
      ul.append(lItem);
    } else {
      const lItem = document.createElement("li");
      lItem.textContent = listItem;
      ul.appendChild(lItem);
    }
  }
  return ul;
}
function dynamicButtonReaction(button, section, iconName) {
  const icon = createIcon(`${iconName}`);
  const filledIcon = createIcon(`${iconName}-fill`);

  button.append(icon, `Add to ${section}`);
  button.title = `Add to ${section}`;
  button.setAttribute("isAdded", false);
  button.addEventListener("click", () => {
    button.innerHTML = "";
    if (button.isAdded) {
      button.append(icon, `Add to ${section}`);
      button.isAdded = false;
    } else {
      button.append(filledIcon, `Added to ${section}`);
      button.isAdded = true;
    }
  });
}