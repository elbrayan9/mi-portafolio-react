import { useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";

function Section({ children, id }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <Motion.section
      id={id}
      ref={ref}
      className="max-w-[900px] mx-auto py-20 px-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible || prefersReducedMotion ? 1 : 0,
        y: isVisible || prefersReducedMotion ? 0 : 20,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: "easeOut",
      }}
    >
      {children}
    </Motion.section>
  );
}

export default Section;
