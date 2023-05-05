import { createModal, createNodeList } from "./microConstructors.mjs";

//!Crear modal de busqueda
export function createSearchModal(
  list,
  searchedValue,
  getSearchedMovie,
  totalPages
) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("search-modal");
  mainContent.classList.add("search-container");
  modalTitle.classList.add("search-title");
  modalTitle.innerHTML = `Resultados de busqueda: <span class="search-modal__value">${searchedValue}</span>`;

  const nodeList = createNodeList(list);
  let page = 1;
  let newPageLoading = false;
  const mainContentContainer = mainContent.parentNode;
  mainContentContainer.addEventListener("scroll", async () => {
    const { scrollTop, clientHeight, scrollTopMax } = mainContentContainer;
    const isCloseToBottom = scrollTop + clientHeight / 2 >= scrollTopMax;
    if (isCloseToBottom && !newPageLoading && page < totalPages) {
      newPageLoading = true;
      page++;
      const { dataList: newData } = await getSearchedMovie(searchedValue, page);
      const newNodeList = createNodeList(newData);
      // console.log("newNodeList");
      // console.log(newNodeList);
      mainContent.append(...newNodeList);
      newPageLoading = false;
    }
  });
  mainContent.append(...nodeList);
  return modal;
}
export function createEmptySearchResults(searchedValue) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("empty-search-modal");
  mainContent.classList.add("empty-search-container");
  modalTitle.classList.add("empty-search-title");
  modalTitle.innerHTML = `NO hay Resultados para la busqueda: <span class="search-modal__value">${searchedValue}</span>`;

  return modal;
}
