import { createCatalogSection } from "./Ui.js";
const urlBase = "https://api.themoviedb.org/3";
const trendingEndPoint = "/trending/all/day";
const discoverEndPoint = "/discover/movie";

let genreList;
let sectionsList = [];

const catalog = document.querySelector('.catalog');

async function getData(endpoint, dataName, queries = '') {
  const res = await fetch(`${urlBase}${endpoint}?api_key=${apiKey}${queries}`);
  const data = await res.json();
	// console.log(data);
  const dataList = data[dataName];
  return dataList;
}

async function getGenreList() {
  const res = await getData("/genre/movie/list", "genres");
  genreList = res;
  console.log(genreList);
	loadCatalog();
}
let interval;
async function loadCatalog() {
	const generador = addToCatalog();
	interval = setInterval(async() => {
		await generador.next();
	}, 1000);
};
async function* addToCatalog(dataName = 'results'){
	const trendingList = await getData(trendingEndPoint, dataName);
	const trendingSection = createCatalogSection("Trending", trendingList);
	catalog.append(trendingSection);
	for (const genre of genreList) {
		const dataList = await getData(discoverEndPoint, dataName, `&with_genres=${genre.id}&include_video=${true}`);
		console.log(dataList);
		const section = createCatalogSection(genre.name, dataList);
		catalog.append(section);
		yield;
	}
	clearInterval(interval)
}
getGenreList();
/* 
!Cosas faltante:
?Hacer funcionar el icono en el carousel para el scroll ( tal vez se logra con el event propagation o delegation)
*/