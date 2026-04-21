/**
 * data/content.js
 * Centralized site content for easier edits without touching component structure.
 */

export const navItems = [
  { label: "O mnie", href: "#about" },
  { label: "Podejście", href: "#approach" },
  { label: "Architektura", href: "#architecture" },
  { label: "Realizacje", href: "#work" },
];

export const heroContent = {
  badge: "OTWARTY NA PROJEKTY",
  titleLead: "Projektuję i wdrażam",
  rotatingWords: [
    "landing page'e",
    "interfejsy webowe",
    "wydajne UI",
    "nowoczesny frontend",
  ],
  description:
    "Nowoczesne strony i interfejsy z naciskiem na estetykę, czytelność i płynne działanie.",
  primaryCta: "Zobacz realizacje",
  secondaryCta: "GitHub",
};

export const aboutSection = {
  eyebrow: "01 · O mnie",
  titleLead: "Frontend, w którym liczy się",
  titleAccent: "forma i logika.",
  description:
    "Tworzę landing page'e i interfejsy, które mają wyglądać nowocześnie, działać płynnie i być czytelne dla użytkownika. Łączę techniczne podejście z estetyką, żeby budować projekty, które dobrze się ogląda i dobrze się rozwija.",
  supportingText:
    "Estetyka. Czytelność. Techniczne podejście.",
  imageAlt: "Portret w czarnym swetrze na transparentnym tle.",
  primaryCta: "Współpraca",
  secondaryCta: "Zobacz projekty",
  highlights: [
    { title: "Mocny start", text: "pierwszy ekran ma robić wrażenie" },
    { title: "Czytelny układ", text: "jasny kierunek i dobra hierarchia" },
    { title: "Lekki frontend", text: "płynność, responsywność i porządek" },
  ],
  sideCard: {
    eyebrow: "Focus",
    title: "Techniczne podejście",
    description:
      "Estetyka, responsywność i detale, które wzmacniają odbiór zamiast go rozpraszać.",
    chips: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    note: "Estetyka. Czytelność. Techniczne podejście.",
  },
};

export const approachSection = {
  eyebrow: "02 · Podejście",
  title: "Zasady, od których nie odchodzę.",
};

export const principles = [
  {
    number: "P/01",
    title: "Progressive Enhancement",
    text: "Dobra baza, potem dodatkowe warstwy. Efekty nie mogą zastępować fundamentu.",
    iconName: "LayersIcon",
  },
  {
    number: "P/02",
    title: "WCAG 2.2 AA",
    text: "Dostępność traktuję jako standard, nie opcję dodatkową.",
    iconName: "EyeIcon",
  },
  {
    number: "P/03",
    title: "Mierzalna wydajność",
    text: "Szybkość i responsywność to element projektu, nie końcowa poprawka.",
    iconName: "PulseIcon",
  },
  {
    number: "P/04",
    title: "Zero długu technicznego",
    text: "Czysty kod od pierwszego commitu. Skalowalna struktura zamiast szybkich hacków.",
    iconName: "CodeIcon",
  },
];

export const architectureMap = {
  eyebrow: "03 · Architektura",
  title: "Jak układam projekt.",
  description:
    "Od warstwy wizualnej po logikę działania i jakość wykonania.",
  root: {
    eyebrow: "Core / Web Experience",
    title: "Product Surface",
    description:
      "Tu spotykają się komunikat, interfejs i odbiór całości. Reszta warstw ma ten efekt wspierać.",
  },
  branches: [
    {
      layer: "Layer / 01",
      title: "Frontend",
      iconName: "MonitorIcon",
      summary: "Interfejs, komponenty i doświadczenie użytkownika.",
      chips: ["React", "Next.js", "Tailwind", "UI / UX"],
    },
    {
      layer: "Layer / 02",
      title: "Backend",
      iconName: "DatabaseIcon",
      summary: "API, logika aplikacji i dane potrzebne do działania produktu.",
      chips: ["Node.js", "REST API", "PostgreSQL", "Integracje"],
    },
    {
      layer: "Layer / 03",
      title: "Workflow",
      iconName: "CloudIcon",
      summary: "Sposób pracy, iteracje i droga od pomysłu do wdrożenia.",
      chips: ["GitHub", "Wersjonowanie", "Deploy", "CI/CD"],
    },
    {
      layer: "Layer / 04",
      title: "Quality",
      iconName: "CodeIcon",
      summary: "Czytelność kodu, responsywność i dbałość o końcowy odbiór.",
      chips: ["Czytelny kod", "Responsywność", "SEO basics", "Performance"],
    },
  ],
};

export const workSection = {
  eyebrow: "04 · Realizacje",
  title: "Projekty pokazujące kierunek i sposób myślenia.",
  description:
    "Projekty, w których forma idzie w parze z logiką.",
};

export const workItems = [
  {
    number: "Case 01",
    year: "2026",
    title: "Nowoczesny landing page dla lokalnej marki.",
    text: "Koncepcja landing page'a nastawionego na mocny hero, czytelną ofertę i prosty układ prowadzący użytkownika do działania.",
    metrics: [
      { value: "Układ", label: "czytelny" },
      { value: "Styl", label: "nowoczesny" },
      { value: "CTA", label: "widoczne" },
    ],
    tags: ["Landing page", "Frontend", "Konwersja"],
  },
  {
    number: "Case 02",
    year: "2026",
    title: "Projekt aplikacji webowej w rozwoju.",
    text: "Koncepcja aplikacji webowej pokazująca strukturę widoków, podejście komponentowe i kierunek rozwoju w stronę fullstacku.",
    metrics: [
      { value: "Code", label: "czysty" },
      { value: "Flow", label: "spójny" },
      { value: "System", label: "rozwijalny" },
    ],
    tags: ["Web app", "Fullstack", "Architektura"],
  },
];

export const contactSection = {
  eyebrow: "05 · Kontakt",
  titleLead: "Masz pomysł",
  titleAccent: "na projekt?",
  description:
    "Możesz napisać w sprawie projektu, współpracy albo po prostu kontaktu.",
};

export const contactInfo = {
  email: "contact@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "external" },
    { label: "LinkedIn", href: "#", icon: "external" },
    { label: "CV (PDF)", href: "#", icon: "external" },
  ],
};

export const footerContent = {
  signature: "Damian Dominiak",
  tagline: "© 2026 · Portfolio / Frontend / UI",
  mobileTagline: "Damian Dominiak · Frontend / UI",
};
