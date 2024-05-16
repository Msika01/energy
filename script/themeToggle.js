const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleDarkIcon.classList.remove("d-none");
} else {
  themeToggleLightIcon.classList.remove("d-none");
}

const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("d-none");
  themeToggleLightIcon.classList.toggle("d-none");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
