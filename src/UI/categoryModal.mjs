import { createModal, createNodeList } from "./microConstructors.mjs";

//! Creacion seccion por Categoria
export function createCategorySection(list, categoryName) {
  const { modal, mainContent, modalTitle } = createModal();

  modal.classList.add("category-modal");
  mainContent.classList.add("category-container");

  modalTitle.innerText = categoryName;
  modalTitle.classList.add("category__title");

  const nodeList = createNodeList(list);

  mainContent.append(...nodeList);

  return modal;
}