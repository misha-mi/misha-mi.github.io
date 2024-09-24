window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href*="#"]');

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (e) => {
      let navHeight = document.querySelector("nav").clientHeight;
      navHeight = navHeight > 100 ? 50 : navHeight;
      e.preventDefault();
      const blockId = navLink.getAttribute("href").replace("#", "");
      window.scrollTo({
        top: document.getElementById(blockId).offsetTop - navHeight,
        behavior: "smooth",
      });
    });
  });
});
