import { useState, useEffect, RefObject } from "react";

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInViewport(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [options, ref]);

  return inViewport;
};

export default useIntersectionObserver;
