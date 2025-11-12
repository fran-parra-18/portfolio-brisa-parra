"use client";

import { useState, useEffect, useRef, type RefObject } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  triggerOnce?: boolean;
};

export function useInView(options?: UseInViewOptions): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!options?.triggerOnce) {
            setInView(false);
          }
        }
      },
      {
        root: options?.root,
        rootMargin: options?.rootMargin,
        threshold: options?.threshold ?? 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, inView];
}
