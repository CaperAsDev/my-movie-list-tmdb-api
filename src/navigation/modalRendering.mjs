import {
  getSearchedMovie,
  getMovie,
  getMoreAboutMovie,
  getData,
  getDataByGenre,
  getGenreList,
  endPoints,
} from "../apiConnection.mjs";
import {
  createSearchModal,
  createEmptySearchResults,
} from "../UI/searchModal.mjs";
import { getLocalStorage } from "../UI/detailModal.mjs";
import { createTrendsModal } from "../UI/trendsModal.mjs";
import { createCategorySection } from "../UI/categoryModal.mjs";
import { createMovieDetailsModal } from "../UI/detailModal.mjs";
import { createFavoriteModal } from "../UI/favoriteModal.mjs";
import { createTrailerModal } from "../UI/movieTrailerModal.mjs";
import { createErrorModal } from "../UI/errorModal.mjs";

const mainContentContainer = document.querySelector(".main-content-container");

export async function renderCategoryModal(categoryId) {
  const {dataList: genreList} = await getGenreList();

  const { totalPages, dataList } = await getDataByGenre(categoryId);
  const categoryObj = genreList.find((genre) => genre.id == categoryId);
  const categoryModal = createCategorySection(
    dataList,
    categoryObj,
    getDataByGenre,
    totalPages
  );
  mainContentContainer.insertAdjacentElement("afterend", categoryModal);
}
export async function renderTrendsModal() {
  const { totalPages: dayTrendPages, dataList: dayTrendingList } =
    await getData(endPoints.dayTrend, "results")();
  const { totalPages: weekTrendPages, dataList: weekTrendingList } =
    await getData(endPoints.weekTrend, "results")();
  const categoryModal = createTrendsModal(
    dayTrendingList,
    weekTrendingList,
    "Trending"
  );
  mainContentContainer.insertAdjacentElement("afterend", categoryModal);
}
export async function renderSearchModal(searchedValue) {
  const searchForm = document.querySelector(".search__input");
  if (searchedValue.length > 0) {
    const { totalPages, dataList: searchList } = await getSearchedMovie(
      searchedValue
    );
    if (searchList.length > 0) {
      const searchModal = createSearchModal(
        searchList,
        searchedValue,
        getSearchedMovie,
        totalPages
      );
      mainContentContainer.insertAdjacentElement("afterend", searchModal);
    } else if (searchList.length == 0) {
      const emptySearchResult = createEmptySearchResults(searchedValue);
      mainContentContainer.insertAdjacentElement("afterend", emptySearchResult);
    }

    searchForm.value = " ";
  }
}
export async function renderMovieDetailsModal(id) {
  const movieObj = await getMovie(id);
  const similarMovies = await getMoreAboutMovie(id, "/similar");
  const casting = await getMoreAboutMovie(id, "/credits", "cast");
  const movieVideos = await getMoreAboutMovie(id, "/videos");
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

  mainContentContainer.insertAdjacentElement("afterend", movieDetailModal);
  console.log(movieObj);
  console.log(trailers);
}
export async function renderUserSelectionModal(ldName) {
  const idList = getLocalStorage(ldName);
  const objList = [];
  for (const iterator of idList) {
    const movieObj = await getMovie(iterator);
    objList.push(movieObj);
  }

  let title;
  ldName.includes("favorite")
    ? (title = "Favorite Movies")
    : (title = "To Watch Movies");

  const userModal = createFavoriteModal(objList, title);
  mainContentContainer.insertAdjacentElement("afterend", userModal);
}
export async function renderTrailerModal(id) {
  const movieVideos = await getMoreAboutMovie(id, "/videos");
  const trailers = movieVideos.filter((obj) => {
    return obj.type === "Trailer";
  });
  if (trailers.length > 0) {
    const movieObj = await getMovie(id);
    let trailerIndex = trailers.findIndex(
      (obj) => obj.name === "Official Trailer"
    );
    let trailer;
    trailerIndex !== -1
      ? (trailer = trailers[trailerIndex])
      : (trailer = trailers[0]);
    const trailerModal = createTrailerModal(trailer, movieObj.title);
    mainContentContainer.insertAdjacentElement("afterend", trailerModal);
  }
}
export async function renderErrorModal (error){
  const errorModal = createErrorModal();
  mainContentContainer.insertAdjacentElement("afterend", errorModal);
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
