import { getData } from "./apiConnection.mjs";
import { createCatalogSection, createListItem } from "./Ui.mjs";

const trendingEndPoint = "/trending/all/day";
const discoverEndPoint = "/discover/movie";
const genreListEndPoint = "/genre/movie/list";

const catalog = document.querySelector(".catalog");
const asideBarCategories = document.querySelector(".list--categories");
let genreList;

export async function getGenreList() {
  const res = await getData(genreListEndPoint, "genres")();
  genreList = res;
  console.log(genreList);
  genreList.map((genre) => {
    const liNode = createListItem(genre.name);
    asideBarCategories.append(liNode);
  });
  loadCatalog();
}
let interval;
async function loadCatalog() {
  const generador = addToCatalog();
  interval = setInterval(async () => {
    await generador.next();
  }, 1000);
}
async function* addToCatalog(dataName = "results") {
  const trendingList = await getData(trendingEndPoint, dataName)();
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
