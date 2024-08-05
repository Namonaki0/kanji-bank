import { clickedList } from "./kanji.js";

export const lists = [
  "joyo",
  "jouyou",
  "jinmeiyo",
  "jinmeiyou",
  "heisig",
  "kyouiku",
  "kyoiku",
  "grade-1",
  "grade-2",
  "grade-3",
  "grade-4",
  "grade-5",
  "grade-6",
  "grade-8",
  "all",
];

const listsOutput = document.getElementById("lists");

(async function displayLists(lists) {
  lists.forEach((list) => {
    const listItem = document.createElement("a");
    listItem.href = "#";
    listItem.textContent = list;
    listItem.classList.add("list");
    listItem.dataset.listId = list;
    listsOutput.appendChild(listItem);
  });
})(lists);

listsOutput.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "A") {
    listsOutput.querySelectorAll(".list").forEach((list) => {
      list.classList.remove("list__selected");
    });
    e.target.classList.add("list__selected");
    clickedList(e.target.dataset.listId);
  }
});
