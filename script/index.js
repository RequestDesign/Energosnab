document.addEventListener("DOMContentLoaded", function () {
  var swiperContainer = document.querySelector(".mySwiper1");

  if (swiperContainer) {
    var swiper = new Swiper(".mySwiper1", {
      slidesPerView: "auto",
      spaceBetween: 40,
      navigation: {
        nextEl: "#nextBtn",
        prevEl: "#prevBtn",
      },
      grabCursor: true,
      breakpoints: {
        789: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
        0: {
          spaceBetween: 10,
        },
      },
    });
  } else {
    console.warn("Swiper контейнер не найден: .mySwiper1");
  }
  const items = document.querySelectorAll(".working-block_item");

  items.forEach((item) => {
    const topItem = item.querySelector(".services-item_top");
    const svgElement = topItem.querySelector(".svg-clo");

    topItem.addEventListener("click", function () {
      // Проверяем, открыт ли текущий элемент
      const isActive = item.classList.contains("working-block_active");

      // Закрываем все элементы
      items.forEach((innerItem) => {
        innerItem.classList.remove("working-block_active");
        const innerSvg = innerItem.querySelector(".svg-clo");
        innerSvg.outerHTML = 
        `<svg class="svg-clo" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9L12.7809 14.3306C12.3316 14.7158 11.6684 14.7158 11.2191 14.3306L5 9" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`;
      });

      // Если текущий элемент не был активен, открываем его
      if (!isActive) {
        item.classList.add("working-block_active");
        svgElement.outerHTML = 
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15L11.2191 9.66939C11.6684 9.2842 12.3316 9.2842 12.7809 9.66939L19 15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`;
      }
    });
  });
});
