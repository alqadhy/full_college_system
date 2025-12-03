// i18next initialization with dynamic translation loading
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

async function loadTranslations() {
  const [enRes, arRes] = await Promise.all([
    // fetch("https://api.jsonbin.io/v3/b/6929b434ae596e708f769794"), // EN translations API
    // fetch("https://api.jsonbin.io/v3/b/692d058243b1c97be9cf9224") //  AR translations API
    fetch("/data/en_content.json"), //  EN translations API
    fetch("/data/ar_content.json") //  AR translations API
  ]);

  const enData = await enRes.json();
  const arData = await arRes.json();

  return {
    // en: endata,
    // ar: ardata
    en: enData,
    ar: arData
  };
}

export async function initI18n() {
  const translations = await loadTranslations();

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: translations.en },
        ar: { translation: translations.ar }
      },
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });

}
