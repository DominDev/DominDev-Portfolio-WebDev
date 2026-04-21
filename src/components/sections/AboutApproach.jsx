/**
 * sections/AboutApproach.jsx
 * About and Approach sections.
 */

import React from "react";
import { motion } from "framer-motion";
import { aboutSection, principles } from "../../data/content";
import { PrimaryButton, GhostButton } from "../ui/Button";
import { ArrowRightIcon } from "../ui/Icons";
import { MeshBackground } from "../effects/Backgrounds";
import { SurfaceCard, SectionHeader } from "../ui/Cards";
import * as Icons from "../ui/Icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  const handleGlowMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-white/10 px-5 py-24 sm:px-8 lg:px-10"
    >
      <MeshBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_90%)]" />

      <div className="relative z-[3] mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-block border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            {aboutSection.eyebrow}
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {aboutSection.titleLead}
            <br />
            <span className="text-zinc-400">{aboutSection.titleAccent}</span>
          </h2>

          <p className="mt-6 max-w-[48ch] text-lg leading-8 text-zinc-300">
            {aboutSection.description}
          </p>
          <p className="muted-copy mt-5 max-w-[52ch] text-base leading-7 sm:text-[17px] sm:leading-8">
            {aboutSection.supportingText}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton as="a" href="#contact">
              {aboutSection.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton as="a" href="#work">
              {aboutSection.secondaryCta}
            </GhostButton>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {aboutSection.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] border border-white/10 bg-white/[0.03] px-5 py-5"
              >
                <div className="text-xl font-semibold text-white">{item.title}</div>
                <div className="muted-copy mt-2 text-sm leading-6">{item.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <SurfaceCard
            glow
            onPointerMove={handleGlowMove}
            className="rounded-[28px] border-white/12 bg-white/[0.04] p-7 sm:p-8"
          >
            <div className="flex h-full flex-col gap-6">
              <div>
                <div className="mb-4 inline-block border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {aboutSection.sideCard.eyebrow}
                </div>
                <h3 className="max-w-[14ch] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.35rem]">
                  {aboutSection.sideCard.title}
                </h3>
                <p className="muted-copy mt-5 max-w-[42ch] text-sm leading-7 sm:text-[15px]">
                  {aboutSection.sideCard.description}
                </p>
              </div>

              <div className="grid gap-3">
                {aboutSection.sideCard.points.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-black/30 px-4 py-4"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] font-mono text-[11px] text-white">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-zinc-200">{point}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {aboutSection.sideCard.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[11px] text-zinc-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="muted-copy border-t border-white/10 pt-5 text-sm leading-7">
                {aboutSection.sideCard.note}
              </p>
            </div>
          </SurfaceCard>
        </motion.div>
      </div>
    </section>
  );
}

export function Approach() {
  const handleGlowMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="approach" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader eyebrow="02 · Podejście" title="Zasady, od których nie odchodzę." />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(240px,auto)]">
        {principles.map((item, index) => {
          const Icon = Icons[item.iconName] || Icons.CodeIcon;
          const layoutClass =
            index === 0
              ? "lg:col-span-7"
              : index === 1
                ? "lg:col-span-5"
                : index === 2
                  ? "lg:col-span-5"
                  : "lg:col-span-7";

          return (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onPointerMove={handleGlowMove}
              className={`glow-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 ease-out hover:-translate-y-1 ${layoutClass}`}
            >
              <div className="relative z-10 flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                      {item.number}
                    </span>
                    <h3 className="mt-2 max-w-[12ch] text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.15rem]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white transition group-hover:border-white/20 group-hover:bg-white/[0.07]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-auto max-w-[36ch] pt-3 text-sm leading-7 text-zinc-400 sm:text-[15px]">
                  {item.text}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
