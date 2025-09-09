// Palabras que NO se capitalizan en medio del título
const STOPWORDS_ES = new Set([
  "a",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "del",
  "desde",
  "en",
  "entre",
  "hacia",
  "hasta",
  "para",
  "por",
  "según",
  "sin",
  "sobre",
  "tras",
  "y",
  "e",
  "o",
  "u",
  "ni",
  "que",
  "la",
  "el",
  "los",
  "las",
  "lo",
  "un",
  "una",
  "unos",
  "unas",
  "al",
  "vs",
  "versus",
  "mas",
  "más",
  "vs.",
  "versus.",
]);

export function titleCaseEs(str: string) {
  const parts = str.toLowerCase().split(/(\s+|-|\/)/);
  return parts
    .map((token, i, arr) => {
      if (/^\s+$|^-|^\//.test(token)) return token;

      const isFirstWord = i === 0;
      const isLastWord = i === arr.length - 1;

      if (isFirstWord || isLastWord || !STOPWORDS_ES.has(token)) {
        return token.replace(/^\p{L}/u, (c) => c.toUpperCase());
      }
      return token;
    })
    .join("");
}
