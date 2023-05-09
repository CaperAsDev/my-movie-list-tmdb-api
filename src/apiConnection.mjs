const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  params: {
    api_key: apiKey,
  },
});
export const endPoints = {
  dayTrend: "/trending/all/day",
  weekTrend: "/trending/all/week",
  discover: "/discover/movie",
  genreList: "/genre/movie/list",
  search: "/search/movie",
};
export function getData(endpoint, dataName) {
  return async function (queries = ""){
    const { data } = await api(`${endpoint}?${queries}`);
    console.log(data);
    const dataList = data[dataName];
    if(data.total_pages > 1){
      const totalPages = data.total_pages
      return { totalPages, dataList}
    }else{
      return {dataList}
    }
  }
}
export async function getMovie(id,){
  const {data} = await api(`/movie/${id}`);
  return data;
}
export async function getMoreAboutMovie(id,detail, dataName = "results"){
  const {data} = await api(`/movie/${id}${detail}`);
  const dataList = data[dataName]
  return dataList;
}
export function getDataByGenre(genreId, page = 1) {
  return getData(
    endPoints.discover,
    "results"
  )(`&with_genres=${genreId}&include_video=true&page=${page}`);
}
export function getSearchedMovie(searchedvalue, page = 1) {
  return getData(endPoints.search, "results")(`query=${searchedvalue}&page=${page}`);
}
export function getGenreList() {
  return getData(endPoints.genreList, "genres")();
}