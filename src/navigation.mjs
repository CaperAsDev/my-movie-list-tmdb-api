import { getData } from "./apiConnection.mjs";
import { createCatalogSection, createListItem, createSpotlight } from "./Ui.mjs";

const trendingEndPoint = "/trending/all/day";
const discoverEndPoint = "/discover/movie";
const genreListEndPoint = "/genre/movie/list";

const catalog = document.querySelector(".catalog");
const mainContentContainer = document.querySelector(".main-content-container");
const asideBarCategories = document.querySelector(".list--categories");
let genreList;
let interval;


export async function getMainInfo() {
  genreList = await getData(genreListEndPoint, "genres")();
  // console.log(genreList);
  setCategoriesAside();
  loadCatalog();
}
function setCategoriesAside(){
	genreList.map((genre) => {
    const liNode = createListItem(genre.name);
    asideBarCategories.append(liNode);
  });
};
async function loadCatalog() {
  const generador = addToCatalog();
  interval = setInterval(async () => {
    await generador.next();
  }, 1000);
}
async function* addToCatalog(dataName = "results") {
  const trendingList = await getData(trendingEndPoint, dataName)();
	console.log(trendingList);
	const spotlight = createSpotlight(trendingList[0]);
	mainContentContainer.insertBefore(spotlight, catalog);
  const trendingSection = createCatalogSection("Trending", trendingList);
  catalog.append(trendingSection);

  for (const genre of genreList) {
    const dataList = await getDataByGenre(genre.id);
    // console.log(dataList);
    const section = createCatalogSection(genre.name, dataList);
    catalog.append(section);
    yield;
  }
  clearInterval(interval);
}
function getDataByGenre(genreId, page = 1) {
  return getData(
    discoverEndPoint,
    "results"
  )(`&with_genres=${genreId}&include_video=true&page=${page}`);
}
