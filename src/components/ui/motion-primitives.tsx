"use client";

/**
 * Adaptado de Motion Primitives (motion-primitives.com): InView, AnimatedGroup e
 * SlidingNumber. Ajustes: respeito a prefers-reduced-motion, variantes de
 * entrada sutis (16–24px) e tipagem para React 19.
 */
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
  motionValue,
  type MotionValue,
  type Transition,
  type UseInViewOptions,
  type Variants,
} from "motion/react";
import React, { useEffect, useId, useRef, useState, type ReactNode } from "react";
import useMeasure from "react-use-measure";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------ InView ------------------------------ */
type InViewProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2" | "figure" | "header";
  delay?: number;
  y?: number;
  viewOptions?: UseInViewOptions;
};

export function InView({ children, className, as = "div", delay = 0, y = 24, viewOptions }: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px", ...viewOptions });
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={seen || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/* --------------------------- AnimatedGroup -------------------------- */
type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
  itemAs?: "div" | "li";
  inViewOnly?: boolean;
};

export function AnimatedGroup({
  children,
  className,
  itemClassName,
  stagger = 0.08,
  as = "div",
  itemAs = "div",
  inViewOnly = true,
}: AnimatedGroupProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: stagger } } };
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } as Transition },
      };
  const Comp = motion[as] as typeof motion.div;
  const Item = motion[itemAs] as typeof motion.div;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      variants={container}
      initial="hidden"
      animate={!inViewOnly || inView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, i) =>
        child == null ? null : (
          <Item key={i} variants={item} className={itemClassName}>
            {child}
          </Item>
        ),
      )}
    </Comp>
  );
}

/* --------------------------- SlidingNumber -------------------------- */
const SPRING = { stiffness: 280, damping: 18, mass: 0.3 };

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const [initial] = useState(() => motionValue(valueRoundedToPlace));
  const animated = useSpring(initial, SPRING);
  useEffect(() => {
    animated.set(valueRoundedToPlace);
  }, [animated, valueRoundedToPlace]);
  return (
    <span className="relative inline-block w-[1ch] overflow-y-clip leading-none tabular-nums">
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <DigitNumber key={i} mv={animated} number={i} />
      ))}
    </span>
  );
}

function DigitNumber({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uid = useId();
  const [ref, bounds] = useMeasure();
  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const place = latest % 10;
    const offset = (10 + number - place) % 10;
    let memo = offset * bounds.height;
    if (offset > 5) memo -= 10 * bounds.height;
    return memo;
  });
  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }
  return (
    <motion.span
      style={{ y }}
      layoutId={`${uid}-${number}`}
      className="absolute inset-0 flex items-center justify-center"
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

/** Preço animado no formato brasileiro: R$ 1.234,56 */
export function SlidingPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const cents = Math.round(value * 100);
  const intPart = Math.floor(cents / 100);
  const dec = cents % 100;
  const formattedInt = intPart.toLocaleString("pt-BR");
  if (reduce) {
    return (
      <span className="tabular-nums">
        R$ {formattedInt},{String(dec).padStart(2, "0")}
      </span>
    );
  }
  const intDigits = String(intPart).split("");
  return (
    <span className="inline-flex items-center tabular-nums" aria-label={`R$ ${formattedInt},${String(dec).padStart(2, "0")}`}>
      <span aria-hidden className="mr-1">R$</span>
      <span aria-hidden className="inline-flex">
        {intDigits.map((_, i) => {
          const place = Math.pow(10, intDigits.length - i - 1);
          const showDot = intDigits.length > 3 && (intDigits.length - i - 1) % 3 === 0 && i !== intDigits.length - 1;
          return (
            <React.Fragment key={`p-${place}`}>
              <Digit value={intPart} place={place} />
              {showDot && <span>.</span>}
            </React.Fragment>
          );
        })}
        <span>,</span>
        <Digit value={dec} place={10} />
        <Digit value={dec} place={1} />
      </span>
    </span>
  );
}
