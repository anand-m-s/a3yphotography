"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    chars: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (!isInView) return;

    animate(
      "[data-char]",
      { opacity: 1, y: 0 },
      {
        duration: 0.25,
        delay: stagger(0.035),
        ease: "easeOut",
      }
    );
  }, [isInView]);

  return (
    <div
      className={cn(
        "flex justify-center text-3xl md:text-5xl font-bold",
        className
      )}
    >
      {/* TEXT + CURSOR MUST SHARE THE SAME INLINE FLOW */}
      <span className="inline-flex items-end">
        <motion.span
          ref={scope}
          className="inline-flex flex-wrap"
        >
          {wordsArray.map((word, wi) => (
            <span key={wi} className="inline-flex">
              {word.chars.map((char, ci) => (
                <motion.span
                  key={ci}
                  data-char
                  initial={{ opacity: 0, y: "0.25em" }}
                  className={cn(
                    "inline-block will-change-transform",
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </span>
          ))}
        </motion.span>

        {/* CURSOR */}
        {/* <motion.span
          aria-hidden
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "ml-1 inline-block w-[3px] h-[1em] rounded-sm bg-slate-700 dark:bg-slate-300",
            cursorClassName
          )}
        /> */}
      </span>
    </div>
  );
};
