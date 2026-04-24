/**
 * data/content.js
 * Centralized site content for easier edits without touching component structure.
 */

const cvHref = `${import.meta.env.BASE_URL}domin_dynamics_cv.pdf`;

export const navItems = [
  { label: "O mnie", href: "#about" },
  { label: "Podejście", href: "#approach" },
  { label: "Architektura", href: "#architecture" },
  { label: "Realizacje", href: "#work" },
];

export const heroContent = {
  badge: "OTWARTY NA PROJEKTY",
  titleLead: "Interfejs. Logika. Produkt.",
  rotatingWords: [
    "czytelny UI",
    "spójny flow",
    "skalowalny kod",
    "fullstack direction",
  ],
  description:
    "Projektuję i wdrażam nowoczesne interfejsy oraz zaplecze pod produkty, które mają być czytelne, szybkie i gotowe do rozwoju.",
  primaryCta: "Case studies",
  secondaryCta: "GitHub",
  scrollCue: "Scroll",
  scrollAriaLabel: "Przejdź do sekcji O mnie",
};

export const aboutSection = {
  eyebrow: "01 · O mnie",
  titleLead: "Od interfejsu",
  titleAccent: "do logiki produktu.",
  description:
    "Buduję landing page'e, interfejsy i struktury aplikacji, które mają dobrze wyglądać, działać przewidywalnie i utrzymywać porządek wraz z rozwojem produktu.",
  supportingText: "UI. Logika. Skalowalna struktura.",
  imageAlt: "Portret w czarnym swetrze na transparentnym tle.",
  primaryCta: "Omówmy projekt",
  secondaryCta: "Case studies",
  highlights: [
    { title: "Mocny start", text: "pierwszy ekran ustawia kierunek i priorytety" },
    { title: "Spójny flow", text: "hierarchia i interakcje bez zbędnego chaosu" },
    { title: "Skalowalna struktura", text: "kod i logika gotowe na dalszy rozwój" },
  ],
  sideCard: {
    eyebrow: "Focus",
    title: "Systemowe podejście",
    description:
      "Interfejs, logika i integracje ułożone tak, żeby produkt był spójny nie tylko wizualnie, ale też strukturalnie.",
    chips: ["React", "Node.js", "API", "Tailwind"],
    note: "UI, logika i struktura, które wzmacniają produkt zamiast go komplikować.",
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
    "Od warstwy wizualnej po logikę działania, przepływ danych i jakość wykonania.",
  root: {
    eyebrow: "Core / Web Experience",
    title: "Product Surface",
    description:
      "Tu spotykają się komunikat, interfejs, logika i przepływ danych. Pozostałe warstwy mają wspierać spójny odbiór produktu.",
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
    "Krótki przekrój projektów, w których interfejs, logika i decyzje produktowe grają razem.",
};

export const workItems = [
  {
    number: "Case 01",
    year: "2026",
    title: "Landing page z kierunkiem.",
    text: "Układ pod mocniejszy pierwszy ekran, czytelniejszą ofertę i prostszą drogę do działania.",
    metrics: [
      { value: "Hero", label: "mocniejszy" },
      { value: "CTA", label: "czytelniejsze" },
      { value: "Flow", label: "krótsze" },
    ],
    tags: ["Landing page", "UI / UX", "Konwersja"],
  },
  {
    number: "Case 02",
    year: "2026",
    title: "Web app z porządkiem.",
    text: "Struktura widoków i komponentów ułożona pod spójny interfejs i dalszy rozwój produktu.",
    metrics: [
      { value: "System", label: "spójniejszy" },
      { value: "Flow", label: "stabilniejsze" },
      { value: "Kod", label: "czytelniejszy" },
    ],
    tags: ["Web app", "Fullstack", "Architektura"],
  },
];

export const contactSection = {
  eyebrow: "05 · Kontakt",
  titleLead: "Masz pomysł",
  titleAccent: "na projekt?",
  description:
    "Możesz napisać w sprawie projektu, współpracy albo konkretnego problemu do ułożenia.",
};

export const contactInfo = {
  email: "kontakt@domindynamics.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/DominDev/DominDev-DominDynamics",
      icon: "external",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/p-dominiak-pd/",
      icon: "external",
      external: true,
    },
    { label: "CV (PDF)", href: cvHref, icon: "external", download: true },
  ],
};

export const footerContent = {
  signature: "DominDynamics",
  tagline: "© 2026 · domindynamics.com",
  mobileTagline: "domindynamics.com",
};
