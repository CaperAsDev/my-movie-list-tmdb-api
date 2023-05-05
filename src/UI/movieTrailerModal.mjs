import { createModal } from "./microConstructors.mjs";

export function createTrailerModal(trailer, movieName) {
  const { modal, mainContent, modalTitle } = createModal();
	
	modal.classList.add("trailer-modal");
  mainContent.classList.add("trailer-container");

	const key = trailer.key

  modalTitle.innerText = `${movieName} Trailer`;
  modalTitle.classList.add("trailer__title");

	const iframe = document.createElement("iframe");
	iframe.classList.add("trailer")

	iframe.setAttribute("src", `https://www.youtube.com/embed/${key}`);
	

  mainContent.append(iframe);

	return modal;
}
