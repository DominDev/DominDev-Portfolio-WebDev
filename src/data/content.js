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
  badge: "Otwarty na współpracę",
  titleLead: "Projektuję i wdrażam",
  rotatingWords: [
    "interfejsy webowe",
    "landing page'e",
    "aplikacje webowe",
    "doświadczenia UX",
  ],
  description:
    "Landing page'e i nowoczesne interfejsy nastawione na czytelność, szybkość oraz dobre doświadczenie użytkownika.",
  primaryCta: "Zobacz realizacje",
  secondaryCta: "GitHub",
};

export const aboutSection = {
  eyebrow: "01 · O mnie",
  titleLead: "Nowoczesny frontend,",
  titleAccent: "który prowadzi do celu.",
  description:
    "Landing page'e i interfejsy, które wyglądają premium, działają szybko i jasno prowadzą użytkownika.",
  supportingText:
    "Estetyka. Hierarchia. Dopracowany frontend.",
  imageAlt: "Portret w czarnym swetrze na transparentnym tle.",
  primaryCta: "Współpraca",
  secondaryCta: "Zobacz projekty",
  highlights: [
    { title: "Premium UI", text: "mocny pierwszy ekran" },
    { title: "UX clarity", text: "jasny kierunek i CTA" },
    { title: "Performance", text: "lekki, szybki frontend" },
  ],
  sideCard: {
    eyebrow: "Focus",
    title: "Nowoczesny frontend",
    description:
      "Estetyka, responsywność i detale, które wzmacniają odbiór zamiast go rozpraszać.",
    chips: ["React", "Tailwind", "Framer Motion"],
    note: "Frontend, UX i performance w jednym flow.",
  },
};

export const principles = [
  {
    number: "P/01",
    title: "Progressive Enhancement",
    text: "Strona działa bez JavaScript. Każda warstwa opcjonalna.",
    iconName: "LayersIcon",
  },
  {
    number: "P/02",
    title: "WCAG 2.2 AA",
    text: "Dostępność to stan domyślny, nie funkcja dodatkowa.",
    iconName: "EyeIcon",
  },
  {
    number: "P/03",
    title: "Mierzalna wydajność",
    text: "LCP < 1.5s, INP < 200ms, CLS < 0.1. Minimum, nie cel.",
    iconName: "PulseIcon",
  },
  {
    number: "P/04",
    title: "Zero długu technicznego",
    text: "Refaktor w roadmapie, nie w ukrytym backlogu.",
    iconName: "CodeIcon",
  },
];

export const architectureMap = {
  eyebrow: "03 · Architektura",
  title: "Jak układam projekt.",
  description:
    "Jedna mapa zamiast kolejnego gridu: od warstwy produktu do zaplecza, workflow i jakości wykonania.",
  root: {
    eyebrow: "Core / Web Experience",
    title: "Product Surface",
    description:
      "To tutaj spotykają się komunikat, interfejs i jakość odbioru. Pozostałe warstwy wspierają ten efekt, a nie konkurują z nim.",
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
      chips: ["Node.js", "API", "Bazy danych", "Integracje"],
    },
    {
      layer: "Layer / 03",
      title: "Workflow",
      iconName: "CloudIcon",
      summary: "Sposób pracy, iteracje i droga od pomysłu do wdrożenia.",
      chips: ["GitHub", "Wersjonowanie", "Deploy", "Iteracyjna praca"],
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

export const workItems = [
  {
    number: "Case 01",
    year: "2026",
    title: "Nowoczesny landing page dla lokalnej marki.",
    text: "Sekcja demonstracyjna pokazująca, jak może wyglądać przyszłe wdrożenie: mocny hero, jasna oferta, czytelny CTA i nacisk na estetykę premium.",
    metrics: [
      { value: "UI", label: "czytelne" },
      { value: "SEO", label: "podstawy" },
      { value: "UX", label: "przemyślany" },
    ],
    tags: ["Landing page", "Frontend", "Konwersja"],
  },
  {
    number: "Case 02",
    year: "2026",
    title: "Projekt aplikacji webowej w rozwoju.",
    text: "Miejsce na projekt pokazujący więcej niż sam wygląd: strukturę widoków, logikę interfejsu, komponentowe podejście i rozwój w stronę fullstacku.",
    metrics: [
      { value: "Code", label: "clean" },
      { value: "Flow", label: "spójny" },
      { value: "Stack", label: "rosnący" },
    ],
    tags: ["Web app", "Fullstack", "Architektura"],
  },
];

export const contactInfo = {
  email: "contact@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "external" },
    { label: "LinkedIn", href: "#", icon: "external" },
    { label: "CV (PDF)", href: "#", icon: "external" },
  ],
};
