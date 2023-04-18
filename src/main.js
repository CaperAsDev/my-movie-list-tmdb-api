import { getMainInfo, renderCategoryModal, renderTrendsModal } from "./navigation.mjs";
window.addEventListener("DOMContentLoaded", startPage, false);
window.addEventListener("hashchange", navigator, false);

function startPage(){
	getMainInfo();
}

function navigator() {
  console.log({ location });

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
      console.log(`Estas en search`);
    },
  },
  {
    hash: "#movie=",
    go: () => {
      console.log(`Estas en movies`);
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
