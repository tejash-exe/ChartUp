import { useEffect } from "react";

const useTheme = (themeOption, setTheme) => {
  const apply = (value) => {
    const root = document.documentElement;
    if (value === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };

  // Resolve final theme whenever themeOption changes
  useEffect(() => {
    let finalTheme;

    if (themeOption === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      finalTheme = prefersDark ? "dark" : "light";
    } else {
      finalTheme = themeOption; // already "light" or "dark"
    }

    setTheme(finalTheme);
    apply(finalTheme);
  }, [themeOption, setTheme]);

  // Update on system theme change (only when option = system)
  useEffect(() => {
    if (themeOption !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      const finalTheme = media.matches ? "dark" : "light";
      setTheme(finalTheme);
      apply(finalTheme);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [themeOption, setTheme]);

  return null;
};

export default useTheme;