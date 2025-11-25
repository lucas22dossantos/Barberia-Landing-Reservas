import { useState, useEffect, useRef } from "react";

export default function useReveal(
  options = { threshold: 0.15, root: null, rootMargin: "0px" }
) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, visible];
}
