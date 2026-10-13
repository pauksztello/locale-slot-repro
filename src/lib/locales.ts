export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const text = {
  en: { home: "Home", people: "People", media: "Media", books: "Books" },
  fr: { home: "Accueil", people: "Personnes", media: "Médias", books: "Livres" },
} satisfies Record<Locale, Record<string, string>>;

export type Page = keyof (typeof text)["en"];
