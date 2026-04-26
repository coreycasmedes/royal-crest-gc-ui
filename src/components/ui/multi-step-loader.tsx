import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

type LoadingState = { text: string };

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" className={cn("w-5 h-5", className)}>
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const CheckFilled = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    className={cn("w-5 h-5", className)}>
    <path fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd" />
  </svg>
);

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  const itemHeight = 52;
  return (
    <div className="flex flex-col pt-16">
      {loadingStates.map((state, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.22, 0);
        return (
          <motion.div
            key={index}
            className="flex items-start gap-3 mb-4"
            initial={{ opacity: 0, y: -(value * itemHeight) }}
            animate={{ opacity, y: -(value * itemHeight) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {index > value ? (
                <CheckIcon className="text-text/25" />
              ) : (
                <CheckFilled
                  className={cn(
                    "text-text/30",
                    value === index && "text-accent"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-base text-text/40 leading-snug",
                value === index && "text-text font-medium"
              )}
            >
              {state.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  duration = 2000,
  loop = true,
}: {
  loadingStates: LoadingState[];
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentState(prev =>
        loop
          ? (prev + 1) % loadingStates.length
          : Math.min(prev + 1, loadingStates.length - 1)
      );
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loop, loadingStates.length, duration]);

  return (
    <div className="relative h-52 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
      <LoaderCore value={currentState} loadingStates={loadingStates} />
    </div>
  );
};
