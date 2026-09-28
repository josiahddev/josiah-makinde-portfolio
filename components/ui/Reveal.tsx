"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Variant = "rise" | "fade" | "slide";

const hidden = {
  rise: { opacity: 0, y: 18 },
  fade: { opacity: 0 },
  slide: { opacity: 0, x: -14 },
};

type Props = HTMLMotionProps<"div"> & { variant?: Variant; delay?: number };

/**
 * Scroll-triggered entrance. Plays once; reduced motion is handled globally
 * by <MotionConfig reducedMotion="user"> in the layout.
 */
export function Reveal({ variant = "rise", delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial={hidden[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
