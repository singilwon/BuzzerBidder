import { useEffect, useState } from "react";

type UseExpandableProductListParams<T> = {
  items: T[];
};

export const useExpandableProductList = <T>({ items }: UseExpandableProductListParams<T>) => {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setVisibleCount(5);
        return;
      }

      if (width >= 640) {
        setVisibleCount(3);
        return;
      }

      setVisibleCount(2);
    };

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => {
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  const shownItems = expanded ? items : items.slice(0, visibleCount);
  const canToggle = items.length > visibleCount;

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  return {
    expanded,
    visibleCount,
    shownItems,
    canToggle,
    toggleExpanded,
  };
};
