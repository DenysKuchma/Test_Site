document.addEventListener("DOMContentLoaded", function () {
  let swiper;
  let swiper2;

  function initSwiper() {
    if (window.innerWidth < 1440) {
      if (!swiper) {
        swiper = new Swiper(".swiper", {
          spaceBetween: 10,
          centeredSlides: true,
          loop: true,
          effect: "cards",
          grabCursor: true,
          cardsEffect: {
            slideShadows: false,
            perSlideRotate: 0,
            perSlideOffset: 8,
            slideVisibleClass: "swiper-slide-visible",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = undefined;
      }
    }
  }

  function initSwiper2() {
    if (!swiper2) {
      swiper2 = new Swiper(".swiper2", {
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        effect: "cards",
        grabCursor: true,
        cardsEffect: {
          slideShadows: false,
          perSlideRotate: 0,
          perSlideOffset: 8,
          rotate: false,
        },
        pagination: {
          el: ".swiper-pagination2",
          clickable: true,
        },
      });
    }
  }

  initSwiper();
  initSwiper2();
  window.addEventListener("resize", initSwiper);
});
