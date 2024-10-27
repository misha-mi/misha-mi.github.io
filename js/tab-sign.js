window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".sign__service");
  const form = document.querySelector(".sign__form");
  const contacts = document.querySelector(".sign__contacts");

  const changeWindow = (dataSign) => {
    if (dataSign === "form") {
      form.style.display = "block";
      contacts.style.display = "none";
    } else if (dataSign === "contacts") {
      form.style.display = "none";
      contacts.style.display = "flex";
    }
  };

  const changeTab = (activeId) => {
    tabs.forEach((tab, i) => {
      if (i === activeId) {
        tab.classList.add("button_active");
      } else {
        tab.classList.remove("button_active");
      }
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      changeTab(i);
      changeWindow(tab.getAttribute("data-sign"));
    });
  });
});
