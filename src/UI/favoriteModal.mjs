import { createModal, createNodeList } from "./microConstructors.mjs";

export function createFavoriteModal(list, name) {
  const { modal, mainContent, modalTitle } = createModal();
	
	modal.classList.add("favorite-modal");
  mainContent.classList.add("favorite-container");

  modalTitle.innerText = name;
  modalTitle.classList.add("favorite__title");

  const nodeList = createNodeList(list);
  mainContent.append(...nodeList);

	return modal;
}
