export class KanjiAPI {
  constructor() {
    this.rootUrl = "http://kanjiapi.dev/v1/kanji/";
  }

  async fetchKanji(list) {
    try {
      const response = await fetch(`${this.rootUrl}${list}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Kanji list");
      }
      const data = await response.json();
      return this.formatKanji(data);
    } catch (error) {
      console.error("Error fetching Kanji list:", error);
      return "";
    }
  }

  async showDetails(kanji) {
    try {
      const response = await fetch(`${this.rootUrl}${kanji}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for ${kanji}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Kanji details:", error);
      return null;
    }
  }

  async formatKanji(kanjiArray) {
    return kanjiArray
      .map(
        (k) => `
               <a href="#" class="kanji-symbol" data-kanji="${k}">${k}</a><br />
          `
      )
      .join("");
  }
}
