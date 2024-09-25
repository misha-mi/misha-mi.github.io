window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");

  nav.addEventListener("click", (e) => {
    const toggle = () => {
      nav.classList.toggle("nav__open");
      nav.classList.contains("nav__open")
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    };
    if (
      e.target.classList.contains("nav__burger") ||
      e.target.classList.contains("nav__burger-elem")
    ) {
      toggle();
    } else if (nav.classList.contains("nav__open")) {
      toggle();
    }
  });
});
