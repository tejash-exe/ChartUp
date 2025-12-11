import { useEffect, useRef, useState } from "react";

const useAnimate = () => {

  const nextLabelIndexRef = useRef(4);
  const [graph, setGraph] = useState([
    { label: "A", value: "20" },
    { label: "B", value: "10" },
    { label: "C", value: "15" },
    { label: "D", value: "8" },
  ]);

  const randValue = () => String(Math.floor(Math.random() * 90) + 5);

  const nextLabel = () => {
    const idx = nextLabelIndexRef.current++;
    const charCode = 65 + (idx % 26);
    const suffix = Math.floor(idx / 26) === 0 ? "" : String(Math.floor(idx / 26));
    return String.fromCharCode(charCode) + suffix;
  };

  useEffect(() => {
    const tick = () => {
      const r = Math.random();

      setGraph((prev) => {
        const copy = prev.map((d) => ({ ...d }));

        // 1) Change random value
        if (r < 0.33) {
          if (copy.length === 0) return copy;
          const i = Math.floor(Math.random() * copy.length);
          copy[i] = { ...copy[i], value: randValue() };
          return copy;
        }

        // 2) Add a bar (ONLY if < 10 labels)
        else if (r < 0.66) {
          if (copy.length < 10) {
            const label = nextLabel();
            const value = randValue();
            return [...copy, { label, value }];
          } else {
            // fallback: change a random bar instead of adding
            const i = Math.floor(Math.random() * copy.length);
            copy[i] = { ...copy[i], value: randValue() };
            return copy;
          }
        }

        // 3) Remove a bar (ONLY if length > 3)
        else {
          if (copy.length <= 3) {
            return copy.map((d) => ({ ...d, value: randValue() }));
          }
          const removeIndex = Math.floor(Math.random() * copy.length);
          copy.splice(removeIndex, 1);
          return copy;
        }
      });
    };

    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, []);

  return graph;
};

export default useAnimate;