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
    console.log(data);
    const dataList = data[dataName];
    return dataList;
  }
}
/* 
!Cosas faltante:
?Hacer funcionar el icono en el carousel para el scroll ( tal vez se logra con el event propagation o delegation)

?Usar la lista de generos de la api para el aside.
*/
