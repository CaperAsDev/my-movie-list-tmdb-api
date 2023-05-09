import {
  getData,
  getDataByGenre,
  getGenreList,
  endPoints,
  getMoreAboutMovie,
} from "../apiConnection.mjs";
import {
  createCatalogSection,
  createSpotlight,
  createListItem,
} from "../UI/homePage.mjs";

let observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    generador.next();
    observer.unobserve(entries[0].target);
  }
});
let generador;

const catalog = document.querySelector(".catalog");

const spotlight = document.querySelector(".spotlight");

const body = document.querySelector("body");
body.addEventListener("click", (e) => {
  if (e.target.nodeName.toLowerCase() === "img") {
    const movieID = e.target.getAttribute("movie-id");
    movieID ? (location.hash = `movie=${movieID}`) : null;
  }
});

let interval;

export function renderHomePage() {
  setCategoriesAside();
  loadCatalog();
}
async function setCategoriesAside() {
  const asideBarCategories = document.querySelector(".list--categories");
  const {dataList: genreList} = await getGenreList();
  genreList.map((genre) => {
    const liNode = createListItem(genre);
    asideBarCategories.append(liNode);
  });
}
async function loadCatalog() {
  renderTrends();
  generador = addToCatalog();
  generador.next();
}
async function renderTrends() {
  const { dataList: trendingList } = await getData(
    endPoints.dayTrend,
    "results"
  )();
  const spotlightMovie = trendingList[0];

  const { movie, panelContainer } = createSpotlight(spotlightMovie);
  spotlight.classList.remove("spotlight-loading");
  spotlight.innerHTML = "";
  spotlight.append(movie, panelContainer);
  const trends = { name: "Trending", id: 0 };
  const trendingSection = createCatalogSection(trends, trendingList);
  catalog.innerHTML = "";
  catalog.append(trendingSection);
}
async function* addToCatalog() {
  const {dataList: genreList} = await getGenreList();

  for (const genre of genreList) {
    const { dataList } = await getDataByGenre(genre.id);
    const section = createCatalogSection(genre, dataList);
    catalog.append(section);
    observer.observe(section);
    yield;
  }
  clearInterval(interval);
}
