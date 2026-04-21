/**
 * sections/Architecture.jsx
 * Prezentacja stosu technologicznego w układzie Bento Grid.
 */

import React from "react";
import { motion } from "framer-motion";
import { architectureCards } from "../../data/content";
import { SectionHeader } from "../ui/Cards";
import * as Icons from "../ui/Icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Architecture() {
  const handleGlowMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="architecture" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow="03 · Architektura"
          title="Stos, warstwa po warstwie."
          description="Układ bento grid wzmacnia techniczny charakter portfolio i daje lepsze pole do pokazania stacku niż zwykłe równe karty."
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)]">
        {architectureCards.map((item, index) => {
          const Icon = Icons[item.iconName] || Icons.CodeIcon;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              onPointerMove={handleGlowMove}
              className={`glow-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 ease-out hover:-translate-y-1 ${item.className}`}
            >
              <div className="relative z-10 flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="muted-label block font-mono text-[11px] uppercase tracking-[0.12em]">
                      {item.layer}
                    </span>
                    <h3 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 font-mono text-[11px] text-zinc-200 transition group-hover:border-white/15 group-hover:text-white"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * sections/Work.jsx
 * Prezentacja projektów jako case studies z metrykami i mockupami.
 */
import { workItems } from "../../data/content";
import { SurfaceCard } from "../ui/Cards";
import { MockupChart, MockupTopology } from "../ui/Mockups";

export function Work() {
  const handleGlowMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow="04 · Realizacje"
          title="Case studies zamiast zwykłych kart."
          description="Sekcja wygląda dojrzalej, bardziej ekspercko i daje miejsce na metryki oraz mockupy."
        />
      </motion.div>

      <div className="space-y-16">
        {workItems.map((item, index) => (
          <motion.article
            key={item.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <SurfaceCard
                glow
                className="overflow-hidden border-white/15 bg-[#0a0a0a] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
                onPointerMove={handleGlowMove}
              >
                <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="flex-1 truncate rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-zinc-500">
                    <span className="mr-1 text-emerald-400">●</span>
                    project.local/view
                  </div>
                </div>
                {index === 0 ? <MockupChart /> : <MockupTopology />}
              </SurfaceCard>
            </div>

            <div>
              <div className="muted-label mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
                <span className="text-white">{item.number}</span>
                <span className="h-px flex-1 bg-white/10" />
                <span>{item.year}</span>
              </div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                {item.title}
              </h3>
              <p className="muted-copy mt-4 max-w-[42ch] text-sm leading-7 sm:text-base">
                {item.text}
              </p>

              <div className="mt-6 grid overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03] sm:grid-cols-3">
                {item.metrics.map((metric, mIdx) => (
                  <div
                    key={metric.label}
                    className={`bg-black/60 p-5 ${mIdx < item.metrics.length - 1 ? "border-b border-r border-white/10 sm:border-b-0" : ""}`}
                  >
                    <div className="text-3xl font-semibold tracking-[-0.03em] text-white">{metric.value}</div>
                    <div className="muted-label mt-2 font-mono text-[11px] uppercase tracking-[0.1em]">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[11px] text-zinc-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/**
 * sections/Contact.jsx
 * Sekcja kontaktowa z tłem Mesh i linkami społecznościowymi.
 */
import { contactInfo } from "../../data/content";
import { DotGridCanvas, MeshBackground } from "../effects/Backgrounds";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 py-28 sm:px-8 lg:px-10">
      <MeshBackground />
      <DotGridCanvas className="z-[1] opacity-80" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_90%),linear-gradient(180deg,transparent_70%,#000_100%)]" />

      <div className="relative z-[3] mx-auto max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto inline-block border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            05 · Kontakt
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl text-balance">
            Porozmawiajmy <br />
            <span className="font-medium text-zinc-500">o Twoim projekcie.</span>
          </h2>

          <a
            href={`mailto:${contactInfo.email}`}
            className="mx-auto mt-10 inline-flex min-h-[56px] max-w-full items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-lg font-medium text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.08] focus-visible:border-white focus-visible:bg-white/[0.08]"
          >
            <span className="truncate">{contactInfo.email}</span>
            <Icons.ArrowRightIcon className="h-5 w-5 shrink-0" />
          </a>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            {contactInfo.socials.map(link => (
              <a key={link.label} href={link.href} className="muted-link flex min-h-[44px] items-center transition">
                {link.label} ↗
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
