import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export type ScrollAnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "fade";

interface ScrollRevealProps<T extends ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number; // Milliseconds, e.g. 100, 200, 300
  duration?: number; // Milliseconds, default 650
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}

export function ScrollReveal<T extends ElementType = "div">({
  as,
  children,
  animation = "fade-up",
  delay = 0,
  duration = 500,
  threshold = 0.02,
  rootMargin = "120px 0px 80px 0px",
  triggerOnce = true,
  className,
  ...props
}: ScrollRevealProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ScrollRevealProps<T>>) {
  const Component = as || "div";
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getAnimationClasses = (anim: ScrollAnimationType, visible: boolean) => {
    switch (anim) {
      case "fade-up":
        return visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4";
      case "fade-down":
        return visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4";
      case "fade-left":
        return visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-4";
      case "fade-right":
        return visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-4";
      case "zoom-in":
        return visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-98";
      case "fade":
      default:
        return visible
          ? "opacity-100"
          : "opacity-0";
    }
  };

  return (
    <Component
      ref={ref as any}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
      className={cn(
        "transition-all",
        getAnimationClasses(animation, isVisible),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

