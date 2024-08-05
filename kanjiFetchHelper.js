const root = "http://kanjiapi.dev/v1/kanji/";

export async function showDetails(k) {
  try {
    const response = await fetch(`${root}${k}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${k}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Kanji details:", error);
    return null;
  }
}

async function formatKanji(kanji) {
  return kanji
    .map(
      (k) => `
             <a href="#" class="kanji-symbol" data-kanji="${k}">${k}</a><br />
        `
    )
    .join("");
}

export default async function fetchKanji(list) {
  try {
    const response = await fetch(`${root}${list}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Kanji list");
    }
    const data = await response.json();
    const formattedKanji = await formatKanji(data);
    return formattedKanji;
  } catch (error) {
    console.error("Error fetching Kanji list:", error);
    return "";
  }
}
