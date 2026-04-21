/**
 * sections/AboutApproach.jsx
 * About and Approach sections.
 */

import React from "react";
import { motion } from "framer-motion";
import { aboutSection, approachSection, principles } from "../../data/content";
import personImage from "../../assets/images/person-1.png";
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

      <div className="relative z-[3] mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <SurfaceCard
            glow
            onPointerMove={handleGlowMove}
            className="rounded-[32px] border-white/12 bg-[#050505]/90 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)]"
          >
            <div className="relative overflow-hidden rounded-[32px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_24%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(270deg,rgba(255,255,255,0.04),transparent)] lg:block" />

              <div className="relative grid gap-8 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:px-10 lg:py-9">
                <div className="relative z-10 max-w-[36rem]">
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
                  <p className="muted-copy mt-4 max-w-[32ch] text-sm leading-6 sm:text-[15px]">
                    {aboutSection.supportingText}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {aboutSection.highlights.map((item) => (
                      <div
                        key={item.title}
                        className="origin-bottom-left transform-gpu rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/18 hover:bg-white/[0.045] hover:shadow-[0_24px_50px_-28px_rgba(255,255,255,0.14)] hover:[transform:perspective(1200px)_rotateX(5deg)_rotateY(-9deg)_translateY(-4px)] motion-reduce:hover:[transform:none]"
                      >
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <div className="muted-copy mt-2 text-sm leading-6">{item.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <PrimaryButton as="a" href="#contact">
                      {aboutSection.primaryCta}
                      <ArrowRightIcon className="h-4 w-4" />
                    </PrimaryButton>
                    <GhostButton as="a" href="#work">
                      {aboutSection.secondaryCta}
                    </GhostButton>
                  </div>
                </div>

                <div className="relative mx-auto flex w-full max-w-[24rem] flex-col items-center pt-2 lg:items-end lg:pt-0">
                  <div className="pointer-events-none absolute bottom-16 h-[72%] w-[72%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),rgba(255,255,255,0.07)_38%,transparent_72%)] blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-[14%] bottom-6 h-8 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative w-full">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 lg:ml-auto">
                      <span className="text-white">{aboutSection.sideCard.eyebrow}</span>
                      <span className="h-1 w-1 rounded-full bg-white/25" />
                      <span>{aboutSection.sideCard.title}</span>
                    </div>

                    <img
                      src={personImage}
                      alt={aboutSection.imageAlt}
                      className="relative z-10 mx-auto h-auto max-h-[30rem] w-full max-w-[22rem] object-contain object-bottom drop-shadow-[0_34px_60px_rgba(255,255,255,0.12)] lg:ml-auto lg:mr-0"
                    />
                  </div>

                  <div className="relative z-20 -mt-8 w-full max-w-[20rem] rounded-[20px] border border-white/10 bg-black/45 p-4 backdrop-blur-xl sm:-mt-10 lg:mr-0">
                    <div className="flex flex-wrap gap-2">
                      {aboutSection.sideCard.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[11px] text-zinc-200"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    <p className="muted-copy mt-3 text-sm leading-6">
                      {aboutSection.sideCard.note}
                    </p>
                  </div>
                </div>
              </div>
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
        <SectionHeader eyebrow={approachSection.eyebrow} title={approachSection.title} />
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
