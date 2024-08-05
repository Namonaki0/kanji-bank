import fetchKanji, { showDetails } from "./kanjiFetchHelper.js";
import { lists } from "./lists.js";
import { bank as importedBank } from "./bank.js";

let bank = importedBank;
let defaultList = "joyo";

window.onload = () => {
  const storedBank = localStorage.getItem("kanjiBank");
  if (storedBank) {
    bank = JSON.parse(storedBank);
  }
};

async function init() {
  try {
    const kanjiOutput = document.getElementById("output");
    const data = await fetchKanji(defaultList);
    kanjiOutput.innerHTML = data;
    attachClickHandlers();
  } catch (err) {
    console.error(err);
  }
}

export async function clickedList(list) {
  try {
    const kanjiOutput = document.getElementById("output");
    const data = await fetchKanji(list);
    kanjiOutput.innerHTML = data;
    attachClickHandlers();
  } catch (err) {
    console.error(err);
  }
}

function attachClickHandlers() {
  const kanjiSymbols = document.querySelectorAll(".kanji-symbol");
  kanjiSymbols.forEach((symbol) => {
    symbol.addEventListener("click", async (event) => {
      event.preventDefault();
      kanjiSymbols.forEach((sym) => sym.classList.remove("kanji__selected"));
      symbol.classList.add("kanji__selected");
      const kanji = event.target.getAttribute("data-kanji");
      const details = await showDetails(kanji);
      renderDetails(details);
    });
  });
}

function renderDetails(details) {
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

  const addToBankButton = document.getElementById("bank");
  const isAlreadyInBank = bank.some((item) => item.kanji === details.kanji);
  if (isAlreadyInBank) {
    addToBankButton.disabled = true;
    addToBankButton.textContent = "Added";
  } else {
    addToBankButton.addEventListener("click", () => {
      bank.push(details);
      localStorage.setItem("kanjiBank", JSON.stringify(bank));
      addToBankButton.disabled = true;
      addToBankButton.textContent = "Added";
    });
  }
}

const cornerBank = document.getElementById("corner-bank");
cornerBank.addEventListener("click", () => {
  renderKanjiBank();
});

function renderKanjiBank() {
  const panel = document.getElementById("panel");
  panel.classList.add("panel__show");
  const detailsOutput = document.getElementById("details-output");
  detailsOutput.classList.add("bank-wrapper");
  detailsOutput.innerHTML = "";

  bank.forEach((k) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `<p>${k.kanji} | KUN: ${k.kun_readings} | ON: ${k.on_readings} | ${k.meanings}</p>`;
    listItem.classList.add("bank-item");
    detailsOutput.appendChild(listItem);
  });
}

init();

// close panel
const closePanel = document.querySelector(".panel-close");

closePanel.addEventListener("click", () => {
  const panel = document.getElementById("panel");
  panel.classList.remove("panel__show");
});
