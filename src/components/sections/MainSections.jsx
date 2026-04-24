/**
 * Main sections below the About/Approach area.
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  architectureMap,
  contactInfo,
  contactSection,
  workItems,
  workSection,
} from "../../data/content";
import { DotGridCanvas, MeshBackground } from "../effects/Backgrounds";
import { ArrowRightIcon, ExternalLinkIcon } from "../ui/Icons";
import * as Icons from "../ui/Icons";
import { SectionHeader, SurfaceCard } from "../ui/Cards";
import { MockupChart, MockupTopology } from "../ui/Mockups";
import { updateGlowPosition } from "../../utils/glow";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const branchHoverOffsets = [
  { x: -12, y: -12, scale: 1.025 },
  { x: 12, y: -12, scale: 1.025 },
  { x: -12, y: 8, scale: 1.025 },
  { x: 12, y: 8, scale: 1.025 },
];

const branchEntryOffsets = [
  { x: -118, y: 52 },
  { x: 118, y: 52 },
  { x: -104, y: -48 },
  { x: 104, y: -48 },
];

const mobileBranchScrollRanges = [
  [0.02, 0.48],
  [0.16, 0.62],
  [0.3, 0.76],
  [0.44, 0.9],
];

const desktopBranchScrollRanges = [
  [0.08, 0.56],
  [0.08, 0.56],
  [0.36, 0.88],
  [0.36, 0.88],
];

const hoverSpring = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.7,
};

function ArchitectureBranch({
  item,
  index,
  scrollYProgress,
  shouldReduceMotion,
  isDesktop,
}) {
  const Icon = Icons[item.iconName] || Icons.CodeIcon;
  const branchHover = shouldReduceMotion ? undefined : branchHoverOffsets[index];
  const branchEntry = branchEntryOffsets[index] || { x: 0, y: 16 };
  const branchRanges = isDesktop ? desktopBranchScrollRanges : mobileBranchScrollRanges;
  const branchRange = branchRanges[index] || [0.1, 0.7];
  const branchX = useTransform(scrollYProgress, branchRange, [branchEntry.x, 0]);
  const branchY = useTransform(scrollYProgress, branchRange, [branchEntry.y, 0]);
  const branchScale = useTransform(scrollYProgress, branchRange, [0.965, 1]);
  const branchOpacity = useTransform(scrollYProgress, branchRange, [0.38, 1]);

  return (
    <motion.article
      style={
        shouldReduceMotion
          ? undefined
          : { x: branchX, y: branchY, scale: branchScale, opacity: branchOpacity }
      }
      className="relative"
    >
      <motion.div
        whileHover={branchHover}
        transition={hoverSpring}
        onPointerMove={updateGlowPosition}
        className="glow-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-5 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.9)] transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/22 hover:bg-black/55 hover:shadow-[0_30px_90px_-28px_rgba(255,255,255,0.18)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent transition group-hover:via-white/28 group-focus-within:via-white/28" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              {item.layer}
            </span>
            <h3 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">
              {item.title}
            </h3>
            <p className="muted-copy mt-3 max-w-[34ch] text-sm leading-7">
              {item.summary}
            </p>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition group-hover:border-white/25 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]">
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-zinc-200 transition group-hover:border-white/20 group-hover:bg-white/[0.07] group-hover:text-white"
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Architecture() {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const architectureTreeRef = useRef(null);
  // Desktop joins happen in row pairs, while mobile keeps a single-column stagger.
  const { scrollYProgress } = useScroll({
    target: architectureTreeRef,
    offset: ["start 90%", "end 60%"],
  });
  const rootHover = shouldReduceMotion ? undefined : { y: -10, scale: 1.015 };
  const connectorOpacity = useTransform(scrollYProgress, [0, 0.75], [0.18, 1]);
  const verticalConnectorScale = useTransform(scrollYProgress, [0, 0.75], [0.35, 1]);
  const horizontalConnectorScale = useTransform(scrollYProgress, [0.2, 1], [0.2, 1]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      id="architecture"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow={architectureMap.eyebrow}
          title={architectureMap.title}
          description={architectureMap.description}
        />
      </motion.div>

      <motion.div
        ref={architectureTreeRef}
        initial={{ opacity: 0.92 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.35 }}
        style={{ position: "relative" }}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_45%)]" />

        <div className="relative z-10">
          <div className="mx-auto max-w-2xl">
            <motion.div
              whileHover={rootHover}
              transition={hoverSpring}
              onPointerMove={updateGlowPosition}
              className="glow-card rounded-[24px] border border-white/10 bg-white/[0.04] px-6 py-6 text-center shadow-[0_10px_30px_-20px_rgba(0,0,0,0.7)] transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/18 hover:bg-white/[0.06] hover:shadow-[0_26px_70px_-24px_rgba(255,255,255,0.12)] sm:px-8 sm:py-8"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                {architectureMap.root.eyebrow}
              </div>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.6rem]">
                {architectureMap.root.title}
              </h3>
              <p className="muted-copy mx-auto mt-4 max-w-[42rem] text-sm leading-7 sm:text-[15px]">
                {architectureMap.root.description}
              </p>
            </motion.div>
          </div>

          <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center">
            <motion.span
              style={
                shouldReduceMotion
                  ? undefined
                  : { opacity: connectorOpacity, scaleY: verticalConnectorScale }
              }
              className="h-10 w-px origin-top bg-gradient-to-b from-white/30 to-white/5"
            />
            <motion.span
              style={shouldReduceMotion ? undefined : { opacity: connectorOpacity }}
              className="h-2.5 w-2.5 rounded-full border border-white/20 bg-black shadow-[0_0_18px_rgba(255,255,255,0.18)]"
            />
            <motion.span
              style={
                shouldReduceMotion
                  ? undefined
                  : { opacity: connectorOpacity, scaleX: horizontalConnectorScale }
              }
              className="mt-4 hidden h-px w-[76%] origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent lg:block"
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {architectureMap.branches.map((item, index) => (
              <ArchitectureBranch
                key={item.title}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
                shouldReduceMotion={shouldReduceMotion}
                isDesktop={isDesktop}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Work() {
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
          eyebrow={workSection.eyebrow}
          title={workSection.title}
          description={workSection.description}
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
                onPointerMove={updateGlowPosition}
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
                {item.metrics.map((metric, metricIndex) => (
                  <div
                    key={metric.label}
                    className={`bg-black/60 p-5 ${
                      metricIndex < item.metrics.length - 1
                        ? "border-b border-r border-white/10 sm:border-b-0"
                        : ""
                    }`}
                  >
                    <div className="text-3xl font-semibold tracking-[-0.03em] text-white">
                      {metric.value}
                    </div>
                    <div className="muted-label mt-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[11px] text-zinc-200"
                  >
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

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 px-5 py-28 sm:px-8 lg:px-10"
    >
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
            {contactSection.eyebrow}
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white text-balance sm:text-6xl">
            {contactSection.titleLead}
            <br />
            <span className="font-medium text-zinc-500">
              {contactSection.titleAccent}
            </span>
          </h2>
          <p className="muted-copy mx-auto mt-5 max-w-[32rem] text-sm leading-7 sm:text-base">
            {contactSection.description}
          </p>

          <a
            href={`mailto:${contactInfo.email}`}
            className="mx-auto mt-10 inline-flex min-h-[58px] max-w-full items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.09] px-6 py-4 text-lg font-medium text-white shadow-[0_18px_50px_-24px_rgba(255,255,255,0.2)] transition hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.14] hover:shadow-[0_24px_70px_-26px_rgba(255,255,255,0.28)] focus-visible:border-white focus-visible:bg-white/[0.14] sm:px-7"
          >
            <span className="truncate">{contactInfo.email}</span>
            <ArrowRightIcon className="h-5 w-5 shrink-0" />
          </a>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            {contactInfo.socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external && !link.download ? "_blank" : undefined}
                rel={link.external && !link.download ? "noreferrer" : undefined}
                download={link.download ? "" : undefined}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-zinc-100 transition hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.09] hover:text-white focus-visible:border-white/30 focus-visible:bg-white/[0.09] focus-visible:text-white"
              >
                <span>{link.label}</span>
                <ExternalLinkIcon className="h-4 w-4 shrink-0 text-zinc-300" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
