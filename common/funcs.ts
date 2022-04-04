import "@logseq/libs";
const settingsVersion = "v1";
export const defaultSettings = {
  myLanguage: "zh-TW",
  settingsVersion
};

export type DefaultSettingsType = typeof defaultSettings;
export const initSettings = () => {
  let settings = logseq.settings;

  const shouldUpdateSettings =
    !settings || settings.settingsVersion != defaultSettings.settingsVersion;

  if (shouldUpdateSettings) {
    settings = defaultSettings;
    logseq.updateSettings(settings);
  }
};

export const getSettings = (): DefaultSettingsType => {
  let settings = logseq.settings;
  const merged = Object.assign(defaultSettings, settings);
  return merged;
};
