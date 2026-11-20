import { useEffect, useState, useRef, type RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport via IntersectionObserver.
 * Silky smooth, hardware-accelerated, SSR-safe, and respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.02,
    rootMargin = "120px 0px 80px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If SSR or prefers-reduced-motion, show immediately
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: Never let content remain hidden if observer is delayed or blocked
    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 250);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            window.clearTimeout(fallbackTimer);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

