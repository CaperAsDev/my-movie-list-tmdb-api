import {
  getData,
  getDataByGenre,
  getGenreList,
  endPoints,
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
    console.log(e.target.attributes["movie-id"].value);
    location.hash = `movie=${e.target.attributes["movie-id"].value}`;
  }
});

let interval;

export function renderHomePage() {
  setCategoriesAside();
  loadCatalog();
}
async function setCategoriesAside() {
  const asideBarCategories = document.querySelector(".list--categories");
  const genreList = await getGenreList();
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
  const { movie, panelContainer } = createSpotlight(trendingList[0]);
  spotlight.classList.remove("spotlight-loading");
  spotlight.innerHTML = "";
  spotlight.append(movie, panelContainer);
  const trends = { name: "Trending", id: 0 };
  const trendingSection = createCatalogSection(trends, trendingList);
  catalog.innerHTML = "";
  catalog.append(trendingSection);
}
async function* addToCatalog() {
  const genreList = await getGenreList();

  for (const genre of genreList) {
    const { dataList } = await getDataByGenre(genre.id);
    const section = createCatalogSection(genre, dataList);
    catalog.append(section);
    observer.observe(section);
    yield;
  }
  clearInterval(interval);
}
