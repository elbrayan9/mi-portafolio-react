import { motion as Motion, useReducedMotion } from "motion/react";

export default function Section({ children, id }) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion.section
      id={id}
      tabIndex={-1}
      className="max-w-[900px] mx-auto py-12 px-5"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      {children}
    </Motion.section>
  );
}
