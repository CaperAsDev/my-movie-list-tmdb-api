const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  params: {
    api_key: apiKey,
  },
});

export function getData(endpoint, dataName) {
  return async function (queries = ""){
    const { data } = await api(`${endpoint}?${queries}`);
    // console.log(data);
    const dataList = data[dataName];
    return dataList;
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