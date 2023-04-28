import { createModal, createNodeList } from "./microConstructors.mjs";

//!Crear modal de trending
export function createTrendsModal(dayList, weekList, title) {
  const { modal, mainContent, modalTitle } = createModal();
  modal.classList.add("trends-modal");
  mainContent.classList.add("trending-container");
  modalTitle.innerText = title;

  const dayTrendsTitle = document.createElement("h5");
  dayTrendsTitle.classList.add("day-trends-title", "trends-title");
  dayTrendsTitle.innerText = "Today";

  const weekTrendsTitle = document.createElement("h5");
  weekTrendsTitle.classList.add("week-trends-title", "trends-title");
  weekTrendsTitle.innerText = "This week";

  const dayTrendsContainer = document.createElement("div");
  dayTrendsContainer.classList.add("trends-container--day", "trends-container");

  const weekTrendsContainer = document.createElement("div");
  weekTrendsContainer.classList.add(
    "trends-container--week",
    "trends-container"
  );

  const dayNodeList = createNodeList(dayList);
  const weekNodeList = createNodeList(weekList);

  dayTrendsContainer.append(...dayNodeList);
  weekTrendsContainer.append(...weekNodeList);

  mainContent.append(
    dayTrendsTitle,
    dayTrendsContainer,
    weekTrendsTitle,
    weekTrendsContainer
  );

  return modal;
}