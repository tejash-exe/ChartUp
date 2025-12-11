import { useEffect } from "react";

const useTheme = (theme, setTheme) => {

  const apply = (value) => {
    const root = document.documentElement;
    if (value === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newTheme = prefersDark ? "dark" : "light";
      setTheme(newTheme);
      apply(newTheme);
      return;
    }

    apply(theme);
  }, [theme, setTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (theme === "light" || theme === "dark") {
        return;
      }

      const prefersDark = media.matches;
      const newTheme = prefersDark ? "dark" : "light";
      setTheme(newTheme);
      apply(newTheme);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, setTheme]);

  return null;
};

export default useTheme;