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
      const countToFull = Math.trunc(
        sliderLine.clientWidth / slides[0].clientWidth
      );
      const gap =
        (sliderLine.clientWidth % slides[0].clientWidth) / (countToFull - 1);
      sliderLine.style.gap = gap + "px";
      slides.forEach((item) => (item.style.opacity = 1));
      buttonLeft.style.display = "none";
      buttonRight.style.display = "none";
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
    setTimeout(() => (sliderLine.style.transition = "0.5s"));

    for (let i = 0; i < countShow; i++) {
      slides[i].style.opacity = 1;
    }

    slides = sliderLine.querySelectorAll(".slide");

    const disabledButton = () => {
      buttonLeft.disabled = true;
      setTimeout(() => (buttonLeft.disabled = false), 500);
      buttonRight.disabled = true;
      setTimeout(() => (buttonRight.disabled = false), 500);
    };

    const changeSlide = (showId, hideId) => {
      slides[showId].style.opacity = 1;
      slides[showId].classList.add("show-slide");

      slides[hideId].style.opacity = 0;
      slides[hideId].classList.add("hide-slide");
      setTimeout(() => {
        slides[showId].classList.remove("show-slide");
        slides[hideId].classList.remove("hide-slide");
      }, 500);
    };

    const nextSlide = () => {
      disabledButton();
      sliderLine.style.transition = "0.5s";
      changeSlide(showId + countShow, showId);

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
        }, 500);
      }
    };

    const lastSlide = () => {
      disabledButton();
      sliderLine.style.transition = "0.5s";
      showId -= 1;
      changeSlide(showId, showId + countShow);

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
        }, 500);
      }
    };

    buttonRight.addEventListener("click", nextSlide);

    buttonLeft.addEventListener("click", lastSlide);
    // slide
    let posX1, swipeX, posY1, swipeY;
    let isScroll = false,
      isSlide = false;

    sliderLine.addEventListener("touchstart", (e) => {
      posX1 = e.changedTouches[0].clientX;
      posY1 = e.changedTouches[0].clientY;
      console.log(posY1, posX1);
      document.addEventListener("touchmove", swipeAction);
      document.addEventListener("touchend", swipeEnd);
    });

    function swipeAction(e) {
      swipeX = posX1 - e.changedTouches[0].clientX;
      swipeY = posY1 - e.changedTouches[0].clientY;
      if (!isScroll && !isSlide) {
        if (Math.abs(swipeX) - Math.abs(swipeY) < 0 && Math.abs(swipeY) > 10) {
          console.log("isScroll");
          isScroll = true;
        } else if (Math.abs(swipeX) > 10) {
          console.log("isSlide");
          isSlide = true;
        }
      }

      if (isSlide) {
        sliderLine.style.transition = "none";
        sliderLine.style.transform = `translateX(-${
          movedWidht * showId + swipeX
        }px)`;
      }
    }
    function swipeEnd(e) {
      isScroll = false;
      isSlide = false;
      document.removeEventListener("touchmove", swipeAction);
      document.removeEventListener("touchend", swipeEnd);
      if (swipeX > 100) {
        nextSlide();
      } else if (swipeX < -100) {
        lastSlide();
      }
    }
  }
});
