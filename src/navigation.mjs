import { getData } from "./apiConnection.mjs";
import {
  createCatalogSection,
  createListItem,
  createSpotlight,
  createCategorySection,
  createTrendsModal,
} from "./Ui.mjs";

const dayTrendingEndPoint = "/trending/all/day";
const weekTrendingEndPoint = "/trending/all/week";
const discoverEndPoint = "/discover/movie";
const genreListEndPoint = "/genre/movie/list";

const catalog = document.querySelector(".catalog");
const mainContentContainer = document.querySelector(".main-content-container");
const asideBarCategories = document.querySelector(".list--categories");
const body = document.querySelector("body");

const asideTrending = document.querySelector("#trendingAside");
asideTrending.addEventListener("click",()=>location.hash = "trending")

let interval;

export function getMainInfo() {
  setCategoriesAside();
  loadCatalog();
}
async function getGenreList() {
  return await getData(genreListEndPoint, "genres")();
}
async function setCategoriesAside() {
  const genreList = await getGenreList();
  console.log(genreList);
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
async function getTrends() {
  const trendingList = await getData(dayTrendingEndPoint, "results")();
  console.log(trendingList);
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
  console.log(dayTrendingList);
  const weekTrendingList = await getData(weekTrendingEndPoint, "results")();
  const categoryModal = createTrendsModal(dayTrendingList, weekTrendingList, "Trending");
  body.append(categoryModal);
}
