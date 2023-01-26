import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersecting: () => void;
}

export function useIntersectionObserver({
  onIntersecting,
}: UseIntersectionObserverProps) {
  const elementRef = useRef(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onIntersecting();
      }
    });

    const { current: element } = elementRef;
    if (element) {
      intersectionObserver.observe(element);
    }
    return () => intersectionObserver.disconnect();
  }, [onIntersecting]);

  return { elementRef };
}
