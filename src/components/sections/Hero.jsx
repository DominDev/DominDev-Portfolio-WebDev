/**
 * sections/Hero.jsx
 * Main hero section with a stable and readable offer message.
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contactInfo, heroContent } from "../../data/content";
import { PrimaryButton, GhostButton } from "../ui/Button";
import { ArrowRightIcon, ExternalLinkIcon } from "../ui/Icons";
import { DotGridCanvas, MeshBackground } from "../effects/Backgrounds";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const [typedWordIndex, setTypedWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const githubHref =
    contactInfo.socials.find((item) => item.label === "GitHub")?.href ||
    "https://github.com/";
  const rotatingWords = heroContent.rotatingWords;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTypedText(rotatingWords[0]);
      return;
    }

    const currentWord = rotatingWords[typedWordIndex];
    const isWordComplete = typedText === currentWord;
    const isWordCleared = typedText === "";

    const typingDelay = isDeleting ? 48 : 78;
    const pauseDelay = isWordComplete
      ? 1400
      : isWordCleared && isDeleting
        ? 180
        : typingDelay;

    const timeout = setTimeout(() => {
      if (!isDeleting && !isWordComplete) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
        return;
      }

      if (!isDeleting && isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isWordCleared) {
        setTypedText(currentWord.slice(0, typedText.length - 1));
        return;
      }

      setIsDeleting(false);
      setTypedWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, pauseDelay);

    return () => clearTimeout(timeout);
  }, [isDeleting, rotatingWords, typedText, typedWordIndex]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-28 pt-32 sm:px-8 lg:px-10"
    >
      <MeshBackground />
      <DotGridCanvas className="z-[1]" />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_90%),linear-gradient(180deg,transparent_70%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_45%,black_20%,transparent_80%)]" />

      <div className="pointer-events-none absolute right-[-2rem] top-1/2 hidden -translate-y-1/2 select-none text-[18rem] font-bold leading-none tracking-[-0.08em] text-white/[0.03] lg:block">
        DD
      </div>

      <div className="relative z-[3] mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-zinc-200 sm:px-5"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]">
              <span className="absolute inset-[-4px] animate-ping rounded-full bg-emerald-400/40" />
            </span>
            {heroContent.badge}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-8 text-center font-semibold leading-none tracking-[-0.06em] text-white text-balance"
          >
            <span className="block text-[3.05rem] max-[380px]:text-[2.65rem] sm:text-[4.65rem] lg:text-[5.45rem]">
              {heroContent.titleLead}
            </span>
            <span className="mt-4 inline-flex min-h-[1.1em] items-center justify-center font-medium text-[2.65rem] tracking-[-0.05em] text-zinc-400 max-[380px]:text-[2.3rem] sm:text-[4rem] lg:text-[4.7rem]">
              [<span className="text-white">{typedText || " "}</span>]
              <span className="hero-typed-caret ml-1 inline-block text-white">|</span>
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="muted-copy mx-auto mt-6 max-w-[44rem] text-base leading-7 sm:text-lg sm:leading-8"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <PrimaryButton as="a" href="#work" className="w-full sm:w-auto">
              {heroContent.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton
              as="a"
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              {heroContent.secondaryCta}
              <ExternalLinkIcon className="h-4 w-4" />
            </GhostButton>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Przejdź do sekcji O mnie"
        className="group absolute bottom-6 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white focus-visible:text-white"
      >
        <span>Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-gradient-to-b from-transparent to-zinc-400/70 transition group-hover:to-white/80 group-focus-visible:to-white/80">
          <span
            className="absolute left-0 top-[-50%] h-1/2 w-full bg-gradient-to-b from-transparent to-white"
            style={{
              animation: "scrollLine 2.2s cubic-bezier(0.25,0.6,0.3,1) infinite",
            }}
          />
        </span>
      </a>
    </section>
  );
}
