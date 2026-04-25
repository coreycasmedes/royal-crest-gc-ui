import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.35,
  delay = 0,
}: {
  words: string;
  className?: string;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)", y: 0 },
      { duration, delay: stagger(0.08, { startDelay: delay }) }
    );
  }, [scope.current]);

  return (
    <motion.span ref={scope} className={cn("", className)}>
      {words.split(" ").map((word, idx) => (
        <motion.span
          key={word + idx}
          className="inline-block mr-[0.25em] opacity-0"
          style={{ filter: "blur(8px)", transform: "translateY(10px)" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
