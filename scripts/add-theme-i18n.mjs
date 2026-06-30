#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");

const themeTranslations = {
  pl: {
    light: "Jasny motyw",
    dark: "Ciemny motyw",
    switchToLight: "Włącz jasny motyw",
    switchToDark: "Włącz ciemny motyw",
    currentTheme: "Aktualny motyw: {theme}",
  },
  uk: {
    light: "Світла тема",
    dark: "Темна тема",
    switchToLight: "Увімкнути світлу тему",
    switchToDark: "Увімкнути темну тему",
    currentTheme: "Поточна тема: {theme}",
  },
  ru: {
    light: "Светлая тема",
    dark: "Тёмная тема",
    switchToLight: "Включить светлую тему",
    switchToDark: "Включить тёмную тему",
    currentTheme: "Текущая тема: {theme}",
  },
  de: {
    light: "Helles Design",
    dark: "Dunkles Design",
    switchToLight: "Helles Design aktivieren",
    switchToDark: "Dunkles Design aktivieren",
    currentTheme: "Aktuelles Design: {theme}",
  },
  zh: {
    light: "浅色主题",
    dark: "深色主题",
    switchToLight: "切换到浅色主题",
    switchToDark: "切换到深色主题",
    currentTheme: "当前主题：{theme}",
  },
};

for (const locale of Object.keys(themeTranslations)) {
  const file = join(dir, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  json.theme = themeTranslations[locale];
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Updated ${locale}.json theme keys`);
}
