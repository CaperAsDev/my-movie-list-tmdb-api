import { createModal } from "./microConstructors.mjs";

export function createErrorModal(error) {
  const { modal, mainContent, modalTitle } = createModal();
	
	modal.classList.add("error-modal");
  mainContent.classList.add("error-container");

  modalTitle.innerText = "¡¡Upps!! 🙈💀🤖Something went wrong";
  modalTitle.classList.add("error-title");

  const errorImage = document.createElement("img");
  errorImage.setAttribute("src", "https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000");
  errorImage.classList.add("error-image");

  mainContent.append(errorImage);

	return modal;
}