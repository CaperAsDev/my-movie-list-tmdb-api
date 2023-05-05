import { renderHomePage } from "./navigation/homeRendering.mjs";
import {
  renderCategoryModal,
  renderTrendsModal,
  renderSearchModal,
  renderMovieDetailsModal,
  renderUserSelectionModal,
} from "./navigation/modalRendering.mjs";

window.addEventListener("DOMContentLoaded", startPage, false);
window.addEventListener("hashchange", navigator, false);

const favAnchor = document.querySelector(".fav-anchor");
favAnchor.addEventListener("click",() => (location.hash = "#favorites"))
const wathchAnchor = document.querySelector(".watch-anchor");
wathchAnchor.addEventListener("click",() => (location.hash = "#toWatch"))

const asideTrending = document.querySelector("#trendingAside");
asideTrending.addEventListener("click", () => (location.hash = "trending"));

const searchIcon = document.querySelector(".search__icon");
searchIcon.addEventListener("click", searchHash);

const searchForm = document.querySelector(".search__input");
searchForm.addEventListener("keyup", (e) => {
  e.key === "Enter" ? searchHash() : null;
});

function startPage() {
  renderHomePage();
  navigator();
}
function navigator() {
  closeModals();
  const indexPage = pages.findIndex((page) =>
    location.hash.startsWith(page.hash)
  );
  indexPage !== -1 ? pages[indexPage].go() : pages[0].go();
}
function searchHash() {
  const searchedValue = searchForm.value;
  const arraySearch = searchedValue.trim().split(" ").join("_");
  arraySearch.length > 0 ? (location.hash = `search=${arraySearch}`) : null;
}
function closeModals() {
  const modals = document.querySelectorAll(".modal");
  const nodesArray = Array.from(modals);
  nodesArray.forEach((node) => node.remove());
}

const pages = [
  {
    hash: "#home",
    go: () => {
      closeModals();
    },
  },
  {
    hash: "#trend",
    go: () => {
      renderTrendsModal();
    },
  },
  {
    hash: "#favorites",
    go: () => {
      renderUserSelectionModal("favorite_movies");
    },
  },
  {
    hash: "#toWatch",
    go: () => {
      renderUserSelectionModal("toWatch_movies");
    },
  },
  {
    hash: "#search=",
    go: () => {
      const searchValueArr = splitHash().split("_");
      const searchValueString = searchValueArr.join(" ");
      renderSearchModal(searchValueString);
    },
  },
  {
    hash: "#movie=",
    go: () => {
      const id = splitHash();
      renderMovieDetailsModal(id);
    },
  },
  {
    hash: "#category=",
    go: () => {
      const id = splitHash();
      renderCategoryModal(id);
    },
  },
];
function splitHash() {
  const hash = location.hash;
  const hashArray = hash.split("=");
  const data = hashArray[1];
  return data;
}