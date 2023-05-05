import { createModal, createNodeList } from "./microConstructors.mjs";

//! Creacion seccion por Categoria
export function createCategorySection(list, { name, id }, getDataFunction, totalPages) {
  const { modal, mainContent, modalTitle } = createModal();
  let page = 1;
  modal.classList.add("category-modal");
  mainContent.classList.add("category-container");

  modalTitle.innerText = name;
  modalTitle.classList.add("category__title");

  const nodeList = createNodeList(list);
  mainContent.append(...nodeList);

  let newPageLoading = false;
  const mainContentContainer = mainContent.parentNode;
  mainContentContainer.addEventListener("scroll", async () => {
    const { scrollTop, clientHeight, scrollTopMax } = mainContentContainer;
    const isCloseToBottom = scrollTop + (clientHeight / 2) >= scrollTopMax;
    if (isCloseToBottom && !newPageLoading && page < totalPages) {
      newPageLoading = true;
      page++;
      const {dataList: newData} = await getDataFunction(id, page);
      const newNodeList = createNodeList(newData);
      mainContent.append(...newNodeList);
      newPageLoading = false;
    }
  });

  return modal;
}
