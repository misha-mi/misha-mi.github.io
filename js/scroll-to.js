window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href*="#"]');
  const navHeight = document.querySelector("nav").clientHeight;

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      const blockId = navLink.getAttribute("href").replace("#", "");
      document.scrollTo({
        top: document.getElementById(blockId).offsetTop - navHeight,
        behavior: "smooth",
      });
    });
  });
});
