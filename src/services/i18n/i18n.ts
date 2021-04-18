import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { isProd } from "@/env";

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (cb: Function) => cb("en"),
  init: () => {},
  cacheUserLanguage: () => {},
};

export const initPromise = i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["common"],
    defaultNS: "common",

    resources: {
      en: {
        common: require("@/translations/en/common.json"),
      },
    },

    debug: !isProd,

    interpolation: {
      // React escapes values for us.
      escapeValue: false,
    },

    react: {
      wait: true,
    },
  });

export default i18n;
