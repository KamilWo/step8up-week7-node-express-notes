document.addEventListener("DOMContentLoaded", () => {
  /**
   * Sets up the event listener and initial state for the theme toggle button.
   */
  const setupThemeToggle = () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (!themeToggleBtn) return;

    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("notes-theme", theme);
    };

    const toggleTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
    };

    themeToggleBtn.addEventListener("click", toggleTheme);

    // Apply saved theme or system preference on initial load
    const savedTheme = localStorage.getItem("notes-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (systemPrefersDark) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  };

  setupThemeToggle();
});
