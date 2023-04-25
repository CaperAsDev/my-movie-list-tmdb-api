import { getData, getMovie, getMoreAboutMovie } from "./apiConnection.mjs";
import {
  createCatalogSection,
  createListItem,
  createSpotlight,
  createCategorySection,
  createTrendsModal,
  createSearchModal,
  createEmptySearchResults,
  createMovieDetailsModal,
} from "./Ui.mjs";

const dayTrendingEndPoint = "/trending/all/day";
const weekTrendingEndPoint = "/trending/all/week";
const discoverEndPoint = "/discover/movie";
const genreListEndPoint = "/genre/movie/list";
const searchEndPoint = "/search/movie";

const catalog = document.querySelector(".catalog");
const mainContentContainer = document.querySelector(".main-content-container");
const asideBarCategories = document.querySelector(".list--categories");
const body = document.querySelector("body");
body.addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() === "img") {
    console.log(e.target.attributes["movie-id"].value);
    location.hash = `movie=${e.target.attributes["movie-id"].value}`;
  }
});

const asideTrending = document.querySelector("#trendingAside");
asideTrending.addEventListener("click", () => (location.hash = "trending"));
const searchIcon = document.querySelector(".search__icon");
searchIcon.addEventListener("click", searchHash);
const searchForm = document.querySelector(".search__input");
searchForm.addEventListener("keyup", (e) => {
  e.key === "Enter" ? searchHash() : null;
});

let interval;
function searchHash() {
  const searchedValue = searchForm.value;
  const arraySearch = searchedValue.trim().split(" ").join("_");
  arraySearch.length > 0 ? (location.hash = `search=${arraySearch}`) : null;
}
export function getMainInfo() {
  setCategoriesAside();
  loadCatalog();
}
//!Funciones para renderizar interfaces
async function setCategoriesAside() {
  const genreList = await getGenreList();
  genreList.map((genre) => {
    const liNode = createListItem(genre);
    asideBarCategories.append(liNode);
  });
}
async function loadCatalog() {
  getTrends();
  const generador = addToCatalog();
  interval = setInterval(async () => {
    await generador.next();
  }, 1000);
}
async function* addToCatalog() {
  const genreList = await getGenreList();

  for (const genre of genreList) {
    const dataList = await getDataByGenre(genre.id);
    // console.log(dataList);
    const section = createCatalogSection(genre, dataList);
    catalog.append(section);
    yield;
  }
  clearInterval(interval);
}
export async function renderCategoryModal(categoryId) {
  const genreList = await getGenreList();

  const dataList = await getDataByGenre(categoryId);
  const categoryObj = genreList.find((genre) => genre.id == categoryId);
  console.log(categoryObj);
  const categoryModal = createCategorySection(dataList, categoryObj.name);
  body.append(categoryModal);
}
export async function renderTrendsModal() {
  const dayTrendingList = await getData(dayTrendingEndPoint, "results")();
  const weekTrendingList = await getData(weekTrendingEndPoint, "results")();
  const categoryModal = createTrendsModal(
    dayTrendingList,
    weekTrendingList,
    "Trending"
  );
  body.append(categoryModal);
}
export async function renderSearchModal(searchedValue) {
  if (searchedValue.length > 0) {
    const searchList = await getSearchedMovie(searchedValue);
    if (searchList.length > 0) {
      const searchModal = createSearchModal(searchList, searchedValue);

      body.append(searchModal);
    } else if (searchList.length == 0) {
      const emptySearchResult = createEmptySearchResults(searchedValue);

      body.append(emptySearchResult);
    }

    searchForm.value = " ";
  }
}
export function goHomePage() {
  const modals = document.querySelectorAll(".modal");
  const nodesArray = Array.from(modals);
  nodesArray.forEach((node) => node.remove());
}
export async function renderMovieDetailsModal(id) {
  const movieObj = await getMovie(id);
  const movieVideos = await getMoreAboutMovie(id, "/videos");
  const similarMovies = await getMoreAboutMovie(id, "/similar");
  const casting = await getMoreAboutMovie(id, "/credits", "cast");
  const trailers = movieVideos.filter((obj) => {
    return obj.type === "Trailer";
  });

  let filteredsCast = filterCastingList(casting);
  if (filteredsCast.length > 30) {
    filteredsCast = filteredsCast.filter((actor) => actor.popularity > 2);
  }

  const similarMoviesFiltered = similarMovies.filter((movie) => {

    return movie.backdrop_path !== null && movie.overview !== " ";
  });
  console.log(filteredsCast);

  const movieDetailModal = createMovieDetailsModal(
    movieObj,
    similarMoviesFiltered,
    filteredsCast,
    trailers
  );

  body.append(movieDetailModal);
  console.log(similarMoviesFiltered);
  console.log(casting);
  console.log(movieObj);
  console.log(trailers);
}
function filterCastingList(list) {
  const actorWithImg = list.filter(
    (actor) =>
      actor.profile_path !== null && actor.known_for_department === "Acting"
  );

  for (const actor of actorWithImg) {
    const isVoiceActor = actor.character.includes("(voice)");

    if (isVoiceActor) {
      actor.voiceActor = true;
      actor.character = actor.character.split("(voice)")[0].trim();
    } else {
      actor.voiceActor = false;
    }
    if (actor.character.length > 18) {
      const arrayCharacter = actor.character.split(" ");
      if (arrayCharacter.length > 2) {
        const twoNames = arrayCharacter.splice(0, 2);
        const newCharacterString = twoNames.join(" ").concat("...");

        actor.shortCharacterName = newCharacterString;
      } else {
        actor.shortCharacterName = actor.character;
      }
    } else {
      actor.shortCharacterName = actor.character;
    }
  }
  return actorWithImg;
}
//!Funciones para obtener datos de la API
async function getGenreList() {
  return await getData(genreListEndPoint, "genres")();
}
async function getTrends() {
  const trendingList = await getData(dayTrendingEndPoint, "results")();
  const spotlight = createSpotlight(trendingList[0]);
  mainContentContainer.insertBefore(spotlight, catalog);
  const trends = { name: "Trending", id: 0 };
  const trendingSection = createCatalogSection(trends, trendingList);
  catalog.append(trendingSection);
}
function getDataByGenre(genreId, page = 1) {
  return getData(
    discoverEndPoint,
    "results"
  )(`&with_genres=${genreId}&include_video=true&page=${page}`);
}
function getSearchedMovie(searchedvalue) {
  return getData(searchEndPoint, "results")(`query=${searchedvalue}`);
}
