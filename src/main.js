import {
  getMainInfo,
  renderCategoryModal,
  renderTrendsModal,
  renderSearchModal,
  goHomePage,
  renderMovieDetailsModal,
} from "./navigation.mjs";
window.addEventListener("DOMContentLoaded", startPage, false);
window.addEventListener("hashchange", navigator, false);

function startPage() {
  getMainInfo();
  navigator();
}

function navigator() {
  console.log({ location });
  goHomePage();
  const indexPage = pages.findIndex((page) =>
    location.hash.startsWith(page.hash)
  );

  if (indexPage !== -1) {
    pages[indexPage].go();
  } else {
    pages[0].go();
  }
}

const pages = [
  {
    hash: "#home",
    go: () => {
      goHomePage();
      console.log(`Estas en home`);
    },
  },
  {
    hash: "#trend",
    go: () => {
      renderTrendsModal();
      console.log(`Estas en trend`);
    },
  },
  {
    hash: "#search=",
    go: () => {
      const hash = location.hash;
      const search = hash.split("=");
      const searchValueArr = search[1].split("_")
      const searchValueString = searchValueArr.join(" ");
      console.log(`Estas en search`);
      renderSearchModal(searchValueString);
    },
  },
  {
    hash: "#movie=",
    go: () => {
      console.log(`Estas en movies`);
      const hash = location.hash;
      const hashArray = hash.split("=");
      const id = hashArray[hashArray.length - 1];
      renderMovieDetailsModal(id);
    },
  },
  {
    hash: "#category=",
    go: () => {
      const hash = location.hash;
      const hashArray = hash.split("=");
      const id = hashArray[hashArray.length - 1];
      console.log(id);
      renderCategoryModal(id);
      console.log(`Estas en categories`);
    },
  },
];
