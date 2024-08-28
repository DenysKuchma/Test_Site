// Один слайдер зроблю кастомным з нескінченним скролом без автоскорлу
// другий слайдер буде зроблено с використанням ліби
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  const totalSlides = dots.length;

  function getSlideWidth() {
    return window.innerWidth >= 1440 ? 552 : 300;
  }

  function showSlide(index) {
    const slideWidth = getSlideWidth();
    slides.style.transition = "transform 0.5s ease";
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    updatePagination(index);
  }

  function updatePagination(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  let startX = 0;
  let isDragging = false;

  slides.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    slides.style.cursor = "grabbing";
  });

  slides.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const diff = startX - e.clientX;
      if (diff > 50) {
        nextSlide();
        startX = e.clientX;
      } else if (diff < -50) {
        prevSlide();
        startX = e.clientX;
      }
    }
  });

  slides.addEventListener("mouseup", () => {
    isDragging = false;
    slides.style.cursor = "grab";
  });

  slides.addEventListener("mouseleave", () => {
    isDragging = false;
    slides.style.cursor = "grab";
  });

  slides.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slides.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const diff = startX - e.touches[0].clientX;
      if (diff > 50) {
        nextSlide();
        startX = e.touches[0].clientX;
      } else if (diff < -50) {
        prevSlide();
        startX = e.touches[0].clientX;
      }
    }
  });

  slides.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("resize", () => {
    showSlide(currentIndex);
  });

  showSlide(currentIndex);

  let swiper;

  function initSwiper() {
    if (window.innerWidth < 1440) {
      if (!swiper) {
        swiper = new Swiper(".swiper", {
          spaceBetween: 10,
          centeredSlides: true,
          loop: true,
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

  initSwiper();

  window.addEventListener("resize", initSwiper);
});
