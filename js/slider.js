window.addEventListener("DOMContentLoaded", () => {
  sliderInit(document.querySelector(".about__slider-double"));
  sliderInit(document.querySelector(".about__slider"));
  document.querySelectorAll(".services__slider").forEach((item) => {
    sliderInit(item);
  });

  function sliderInit(slider) {
    const sliderLine = slider.querySelector(".line");
    let slides = sliderLine.querySelectorAll(".slide");
    const buttonLeft = slider.querySelector(".slider__left");
    const buttonRight = slider.querySelector(".slider__right");

    if (sliderLine.clientWidth > slides[0].clientWidth * slides.length) {
      slides.forEach((item) => (item.style.opacity = 1));
      buttonLeft.parentElement.style.display = "none";
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
    setTimeout(() => (sliderLine.style.transition = "1s"));

    for (let i = 0; i < countShow; i++) {
      slides[i].style.opacity = 1;
    }

    slides = sliderLine.querySelectorAll(".slide");

    const disabledButton = () => {
      buttonLeft.disabled = true;
      setTimeout(() => (buttonLeft.disabled = false), 1000);
      buttonRight.disabled = true;
      setTimeout(() => (buttonRight.disabled = false), 1000);
    };

    const nextSlide = (showId, hideId) => {
      slides[showId].style.opacity = 1;
      slides[showId].classList.remove("hide-slide");
      slides[showId].classList.add("show-slide");

      slides[hideId].style.opacity = 0;
      slides[hideId].classList.remove("show-slide");
      slides[hideId].classList.add("hide-slide");
    };

    buttonRight.addEventListener("click", (e) => {
      disabledButton();
      sliderLine.style.transition = "1s";
      nextSlide(showId + countShow, showId);

      showId += 1;
      sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
      if (showId >= slides.length - 3) {
        showId = 1;
        setTimeout(() => {
          sliderLine.style.transition = "none";
          sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
          slides.forEach((slide, i) => {
            if (i <= countShow && i >= showId) {
              slide.style.opacity = 1;
              slide.classList.remove("hide-slide");
            } else {
              slide.style.opacity = 0;
              slide.classList.remove("show-slide");
            }
          });
        }, 1000);
      }
    });

    buttonLeft.addEventListener("click", () => {
      disabledButton();
      sliderLine.style.transition = "1s";
      showId -= 1;
      nextSlide(showId, showId + countShow);

      sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
      if (showId <= 0) {
        showId = slides.length - 4;
        setTimeout(() => {
          sliderLine.style.transition = "none";
          sliderLine.style.transform = `translateX(-${movedWidht * showId}px)`;
          slides.forEach((slide, i) => {
            if (i <= countShow + showId - 1 && i >= showId) {
              slide.style.opacity = 1;
              slide.classList.remove("hide-slide");
            } else {
              slide.style.opacity = 0;
              slide.classList.remove("show-slide");
            }
          });
        }, 1000);
      }
    });
  }
});
