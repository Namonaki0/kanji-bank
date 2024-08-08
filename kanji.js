import { KanjiAPI } from "./kanjiFetchHelper.js";
import { KanjiListManager } from "./lists.js";
import { bank as importedBank } from "./bank.js";

export class KanjiApp {
  constructor() {
    this.bank = importedBank;
    this.defaultList = "joyo";
    this.initializeBank();
    this.init();
    this.addClosePanelHandler();
    this.addCornerBankHandler();
  }

  initializeBank() {
    const storedBank = localStorage.getItem("kanjiBank");
    if (storedBank) {
      this.bank = JSON.parse(storedBank);
    }
  }

  async init() {
    try {
      const kanjiOutput = document.getElementById("output");
      const kanjiApi = new KanjiAPI();
      const data = await kanjiApi.fetchKanji(this.defaultList);
      kanjiOutput.innerHTML = data;
      this.attachClickHandlers();
    } catch (err) {
      console.error(err);
    }
  }

  async clickedList(list) {
    try {
      const kanjiOutput = document.getElementById("output");
      const kanjiApi = new KanjiAPI();
      const data = await kanjiApi.fetchKanji(list);
      kanjiOutput.innerHTML = data;
      this.attachClickHandlers();
    } catch (err) {
      console.error(err);
    }
  }

  attachClickHandlers() {
    const kanjiSymbols = document.querySelectorAll(".kanji-symbol");
    kanjiSymbols.forEach((symbol) => {
      symbol.addEventListener("click", async (event) => {
        event.preventDefault();
        kanjiSymbols.forEach((sym) => sym.classList.remove("kanji__selected"));
        symbol.classList.add("kanji__selected");
        const kanji = event.target.getAttribute("data-kanji");
        const kanjiApi = new KanjiAPI();
        const details = await kanjiApi.showDetails(kanji);
        this.renderDetails(details);
      });
    });
  }

  renderDetails(details) {
    const panel = document.getElementById("panel");
    panel.classList.add("panel__show");
    const detailsOutput = document.getElementById("details-output");
    detailsOutput.classList.remove("bank-wrapper");
    detailsOutput.innerHTML = `
      <h2>${details.kanji}</h2>
      <p>Meaning: ${details.meanings}</p>
      <p>Grade: ${details.grade}</p>
      <p>Kun Readings: ${details.kun_readings}</p>
      <p>On Readings: ${details.on_readings}</p>
      <p>Name Readings: ${details.name_readings}</p>
      <p>Stroke Count: ${details.stroke_count}</p>
      <p>JLPT Level: ${details.jlpt}</p>
      <p>Mainichi Shinbum: ${details.freq_mainichi_shinbun}</p>
      <button id="bank" class="add-to-bank">+</button>
    `;

    this.addBankButtonHandler(details);
  }

  addBankButtonHandler(details) {
    const addToBankButton = document.getElementById("bank");
    const isAlreadyInBank = this.bank.some(
      (item) => item.kanji === details.kanji
    );
    if (isAlreadyInBank) {
      addToBankButton.disabled = true;
      addToBankButton.textContent = "Added";
    } else {
      addToBankButton.addEventListener("click", () => {
        this.bank.push(details);
        localStorage.setItem("kanjiBank", JSON.stringify(this.bank));
        addToBankButton.disabled = true;
        addToBankButton.textContent = "Added";
      });
    }
  }

  addCornerBankHandler() {
    const cornerBank = document.getElementById("corner-bank");
    cornerBank.addEventListener("click", () => {
      this.renderKanjiBank();
    });
  }

  renderKanjiBank() {
    const panel = document.getElementById("panel");
    panel.classList.add("panel__show");
    const detailsOutput = document.getElementById("details-output");
    detailsOutput.classList.add("bank-wrapper");
    detailsOutput.innerHTML = "";

    this.bank.forEach((k) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `<p>${k.kanji} | KUN: ${k.kun_readings} | ON: ${k.on_readings} | ${k.meanings}</p>`;
      listItem.classList.add("bank-item");
      detailsOutput.appendChild(listItem);
    });
  }

  addClosePanelHandler() {
    const closePanel = document.querySelector(".panel-close");
    closePanel.addEventListener("click", () => {
      const panel = document.getElementById("panel");
      panel.classList.remove("panel__show");
    });
  }
}

window.onload = () => {
  new KanjiApp();
};
