import { useState, useEffect, useCallback } from "react";
import { useLocation } from "@reach/router";

export type HeaderTheme = "light" | "dark";

const HEADER_HEIGHT = 108;

export function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("light");
  const location = useLocation();

  const createObserver = useCallback(() => {
    if (typeof window === "undefined") return undefined;

    const headerMid = Math.floor(HEADER_HEIGHT / 2);
    const bottomMargin = -(window.innerHeight - headerMid);
    const visibleSections = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
          } else {
            visibleSections.delete(entry.target);
          }
        }

        // Among all sections currently in the header strip,
        // pick the one closest to the top (the one scrolling in)
        let best: Element | null = null;
        let bestTop = -Infinity;

        for (const el of visibleSections) {
          const top = el.getBoundingClientRect().top;
          if (top > bestTop) {
            bestTop = top;
            best = el;
          }
        }

        if (best) {
          const declared = (best as HTMLElement).dataset.headerTheme as HeaderTheme | undefined;
          if (declared === "light" || declared === "dark") {
            setTheme(declared);
          }
        }
      },
      {
        rootMargin: `-${headerMid}px 0px ${bottomMargin}px 0px`,
        threshold: 0,
      }
    );

    document.querySelectorAll("[data-header-theme]").forEach((el) => observer.observe(el));

    return observer;
  }, []);

  useEffect(() => {
    setTheme("light");
    let observer: IntersectionObserver | undefined;

    const raf = requestAnimationFrame(() => {
      observer = createObserver();
    });

    const handleResize = () => {
      observer?.disconnect();
      observer = createObserver();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [createObserver, location.pathname]);

  return theme;
}
