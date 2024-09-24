window.addEventListener("DOMContentLoaded", () => {
  tabInint(document.querySelector(".services"));
  tabInint(document.querySelector(".reviews"));

  function tabInint(tabWrapper) {
    const tabButtons = tabWrapper.querySelectorAll(".tab-button");
    const tabItems = tabWrapper.querySelectorAll(".tab");

    for (let i = 1; i < tabItems.length; i++) {
      tabItems[i].classList.add("tab-hide");
    }

    tabButtons.forEach((item, i) => {
      item.addEventListener("click", () => {
        tabItems.forEach((item, j) => {
          if (j !== i) {
            item.classList.add("tab-hide");
          } else {
            item.classList.remove("tab-hide");
          }
        });
        tabButtons.forEach((item, j) => {
          if (j !== i) {
            item.classList.remove("button_active");
          } else {
            item.classList.add("button_active");
          }
        });
      });
    });
  }
});
