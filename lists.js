import { KanjiApp } from "./kanji.js";

export class KanjiListManager {
  constructor(lists) {
    this.lists = lists;
    this.listsOutput = document.getElementById("lists");
    this.displayLists();
    this.addClickHandler();
  }

  displayLists() {
    this.lists.forEach((list) => {
      const listItem = document.createElement("a");
      listItem.href = "#";
      listItem.textContent = list;
      listItem.classList.add("list");
      listItem.dataset.listId = list;
      this.listsOutput.appendChild(listItem);
    });
  }

  addClickHandler() {
    this.listsOutput.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName === "A") {
        this.clearSelectedClass();
        e.target.classList.add("list__selected");
        const kanjiApp = new KanjiApp();
        kanjiApp.clickedList(e.target.dataset.listId);
      }
    });
  }

  clearSelectedClass() {
    this.listsOutput.querySelectorAll(".list").forEach((list) => {
      list.classList.remove("list__selected");
    });
  }
}

const kanjiListManager = new KanjiListManager([
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
]);
