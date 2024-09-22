window.addEventListener("DOMContentLoaded", () => {
  function sliderInit(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    const sliderLine = slider.querySelector(".line");
    let slides = sliderLine.querySelectorAll(".slide");
    const buttonLeft = slider.querySelector(".slider__left");
    const buttonRight = slider.querySelector(".slider__right");

    if (sliderLine.clientWidth > slides[0].clientWidth * slides.length) {
      return;
    }

    let showId = 2;
    const countShow = Math.trunc(
      sliderLine.clientWidth / slides[0].clientWidth
    );
    let gapWidth;
    if (countShow === 1) {
      gapWidth = sliderLine.clientWidth - slides[0].clientWidth;
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.margin = `0 ${gapWidth / 2}px`;
      }
    } else {
      gapWidth =
        (sliderLine.clientWidth % slides[0].clientWidth) / (countShow - 1);
      sliderLine.style.gap = gapWidth + "px";
    }

    const movedWidht = slides[0].clientWidth + gapWidth;

    sliderLine.prepend(slides[slides.length - 1].cloneNode(true));
    sliderLine.prepend(slides[slides.length - 2].cloneNode(true));
    sliderLine.append(slides[0].cloneNode(true));
    sliderLine.append(slides[1].cloneNode(true));

    sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
    console.log(movedWidht, showId);
    setTimeout(() => (sliderLine.style.transition = "1s"));

    for (let i = 0; i < countShow; i++) {
      slides[i].style.opacity = 1;
    }

    slides = sliderLine.querySelectorAll(".slide");

    buttonRight.addEventListener("click", (e) => {
      buttonRight.disabled = true;
      setTimeout(() => (buttonRight.disabled = false), 1000);
      slides[showId + countShow].style.opacity = 1;
      slides[showId + countShow].classList.remove("hide-slide");
      slides[showId + countShow].classList.add("show-slide");

      slides[showId].style.opacity = 0;
      slides[showId].classList.remove("show-slide");
      slides[showId].classList.add("hide-slide");

      showId += 1;
      sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
      if (showId >= slides.length - 3) {
        showId = 1;
        for (let i = showId; i < countShow + showId; i++) {
          slides[i].style.opacity = 1;
        }
        setTimeout(() => {
          sliderLine.style.transition = "0s";
          sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
          setTimeout(() => (sliderLine.style.transition = "1s"));
        }, 1000);
      }
    });

    buttonLeft.addEventListener("click", () => {
      buttonLeft.disabled = true;
      setTimeout(() => (buttonLeft.disabled = false), 1000);
      showId -= 1;
      slides[showId].style.opacity = 1;
      slides[showId].classList.remove("hide-slide");
      slides[showId].classList.add("show-slide");

      slides[showId + countShow].style.opacity = 0;
      slides[showId + countShow].classList.remove("show-slide");
      slides[showId + countShow].classList.add("hide-slide");

      sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
      if (showId <= 0) {
        showId = slides.length - 4;
        setTimeout(() => {
          sliderLine.style.transition = "0s";
          sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
          setTimeout(() => (sliderLine.style.transition = "1s"));
        }, 1000);
      }
    });
  }

  sliderInit(".services__slider");
});
