import {
  getSearchedMovie,
  getMovie,
  getMoreAboutMovie,
  getData,
  getDataByGenre,
  getGenreList,
	endPoints
} from "../apiConnection.mjs";
import {
  createSearchModal,
  createEmptySearchResults,
} from "../UI/searchModal.mjs";
import { createTrendsModal } from "../UI/trendsModal.mjs";
import { createCategorySection } from "../UI/categoryModal.mjs";
import { createMovieDetailsModal } from "../UI/detailModal.mjs";

const mainContentContainer = document.querySelector(".main-content-container");

export async function renderCategoryModal(categoryId) {
  const genreList = await getGenreList();

  const dataList = await getDataByGenre(categoryId);
  const categoryObj = genreList.find((genre) => genre.id == categoryId);
  console.log(categoryObj);
  const categoryModal = createCategorySection(dataList, categoryObj.name);
  mainContentContainer.insertAdjacentElement("afterend", categoryModal);
}
export async function renderTrendsModal() {
  const dayTrendingList = await getData(endPoints.dayTrend, "results")();
  const weekTrendingList = await getData(endPoints.weekTrend, "results")();
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
    const searchList = await getSearchedMovie(searchedValue);
    if (searchList.length > 0) {
      const searchModal = createSearchModal(searchList, searchedValue);
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
  const movieVideos = await getMoreAboutMovie(id, "/videos");
  const similarMovies = await getMoreAboutMovie(id, "/similar");
  const casting = await getMoreAboutMovie(id, "/credits", "cast");
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