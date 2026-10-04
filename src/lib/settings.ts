export const SETTING_DEFAULTS = {
  hero_note_1: "Operational base: Nigeria",
  hero_note_2: "Working across Africa",
  footer_about:
    "A nonprofit civic hub advancing informed participation, accountable leadership, and inclusive governance across Africa.",
  footer_copyright:
    "© 2026 Civic Bridge Africa. Operating from Nigeria. Registration details to be confirmed.",
  contact_email: "",
};

export type SettingKey = keyof typeof SETTING_DEFAULTS;
export type Settings = Record<SettingKey, string>;