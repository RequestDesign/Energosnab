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

  var swiperProjects = document.querySelector(".mySwiper2");
  if (swiperProjects) {
    var swiper = new Swiper(".mySwiper2", {
      slidesPerView: "auto",
      spaceBetween: 32,
      navigation: {
        nextEl: "#nextBtn",
        prevEl: "#prevBtn",
      },
      grabCursor: true,
      breakpoints: {
        789: {
          slidesPerView: "auto",
          spaceBetween: 32,
        },
        0: {
          spaceBetween: 22,
        },
      },
    });
  } else {
    console.warn("Swiper контейнер не найден: .mySwiper2");
  }

  var swiperProject4 = document.querySelector(".mySwiper4");
  if (swiperProject4) {
    var swiper = new Swiper(".mySwiper4", {
      loop: true,
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 26,
      navigation: {
        nextEl: "#nextBtn",
        prevEl: "#prevBtn",
      },
      grabCursor: true,
      breakpoints: {
        789: {
          slidesPerView: 3,
          spaceBetween: 26,
        },
        0: {
          slidesPerView: "auto",
          spaceBetween: 22,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          updateSlideSizes();
        },
      },
    });

    function updateSlideSizes() {
      const slides = document.querySelectorAll(".mySwiper4 .swiper-slide");
      slides.forEach((slide) => {
        slide.classList.remove("left", "center", "right");
      });

      const activeIndex = swiper.activeIndex % slides.length;
      const leftIndex = (activeIndex - 1 + slides.length) % slides.length;
      const rightIndex = (activeIndex + 1) % slides.length;

      slides[activeIndex].classList.add("center");
      slides[leftIndex].classList.add("left");
      slides[rightIndex].classList.add("right");
    }

    updateSlideSizes();
  } else {
    console.warn("Swiper контейнер не найден: .mySwiper4");
  }

  const items = document.querySelectorAll(".working-block_item");

  if (items.length > 0) {
    items.forEach((item) => {
      const topItem = item.querySelector(".services-item_top");

      topItem.addEventListener("click", function () {
        const isActive = item.classList.contains("working-block_active");

        items.forEach((innerItem) => {
          innerItem.classList.remove("working-block_active");
          const innerSvgUp = innerItem.querySelector(".arrow-drop-up");
          const innerSvgDown = innerItem.querySelector(".arrow-drop-down");
          innerSvgUp.style.display = "none";
          innerSvgDown.style.display = "grid";
        });

        if (!isActive) {
          item.classList.add("working-block_active");
          const svgUp = topItem.querySelector(".arrow-drop-up");
          const svgDown = topItem.querySelector(".arrow-drop-down");
          svgUp.style.display = "block";
          svgDown.style.display = "none";
        }
      });
    });
  } else {
    console.log('Блоки с классом "working-block_item" не найдены на странице.');
  }

  var myMap;
  window.onload = function () {
    ymaps.ready(function () {
      if (document.getElementById("map")) {
        init("moscow");
      }
      if (document.getElementById("map2")) {
        initMap2();
      }
    });

    function init(city) {
      if (myMap) {
        myMap.destroy();
      }

      var coordinates;
      var addressText;
      if (city === "moscow") {
        coordinates = [55.975, 37.5165];
        addressText =
          "Московская область, г. Долгопрудный, ул. Заводская, дом 2";
      } else if (city === "sochi") {
        coordinates = [43.4231, 39.9257];
        addressText = "г. Сочи, Адлерский район, ул. Гастелло, д. 42";
      }

      myMap = new ymaps.Map("map", {
        center: coordinates,
        zoom: 16,
        controls: ["zoomControl"],
      });

      var myPlacemark = new ymaps.Placemark(
        coordinates,
        {},
        {
          iconImageSize: [30, 30],
          iconImageOffset: [-15, -30],
        }
      );
      myMap.geoObjects.add(myPlacemark);

      var addressDiv = document.createElement("div");
      addressDiv.className = "address-label";
      addressDiv.innerHTML = addressText;

      myMap.container.getElement().appendChild(addressDiv);

      function updateAddressPosition() {
        if (myMap.projection) {
          var coords = myPlacemark.geometry.getCoordinates();
          var pixelCoords = myMap.projection.toGlobalPixels(
            coords,
            myMap.getZoom()
          );
          addressDiv.style.left = pixelCoords[0] + "px";
          addressDiv.style.top = pixelCoords[1] - 30 + "px";
        }
      }

      updateAddressPosition();

      myPlacemark.events.add("drag", updateAddressPosition);
      myPlacemark.events.add("dragend", updateAddressPosition);
    }

    function initMap2() {
      var myMap2 = new ymaps.Map("map2", {
        center: [43.4231, 39.9257],
        zoom: 16,
        controls: ["zoomControl"],
      });

      var myPlacemark2 = new ymaps.Placemark(
        [43.4231, 39.9257],
        {
          hintContent: "Здесь мы находимся!",
          balloonContent:
            "Здесь находится офис: г. Сочи, Адлерский район, ул. Гастелло, д. 42",
        },
        {
          preset: "islands#redIcon",
        }
      );
      myMap2.geoObjects.add(myPlacemark2);
    }
  };

  document.querySelectorAll(".addresses-link").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".addresses-link")
        .forEach((btn) => btn.classList.remove("addresses-link_active"));
      this.classList.add("addresses-link_active");
      init(this.dataset.city);
    });
  });

  const buttons = document.querySelectorAll(".addresses-link");
  const descriptions = document.querySelectorAll(".addresses_top-description");

  if (descriptions.length > 0) {
    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("addresses-link_active"));
        button.classList.add("addresses-link_active");

        descriptions.forEach((desc) => {
          if (desc) {
            desc.classList.remove("addresses-top_description-active");
          }
        });

        if (descriptions[index]) {
          descriptions[index].classList.add("addresses-top_description-active");
        }
      });
    });
  }

  document.querySelector(".burger-btn").addEventListener("click", function () {
    const menu = document.querySelector(".header-content_links");
    menu.classList.toggle("open");
  });
  document
    .querySelector(".burgar-btn_close")
    .addEventListener("click", function () {
      const menu = document.querySelector(".header-content_links");
      menu.classList.remove("open");
    });

  const btnSpecifications = document.getElementById("btn-specifications");
  const btnDescription = document.getElementById("btn-description");
  const specificationsBlock = document.getElementById("specifications");
  const descriptionBlock = document.getElementById("description");
  if (
    btnSpecifications &&
    btnDescription &&
    specificationsBlock &&
    descriptionBlock
  ) {
    btnSpecifications.addEventListener("click", function () {
      toggleContent("specifications");
      setActiveButton(btnSpecifications, btnDescription);
    });

    btnDescription.addEventListener("click", function () {
      toggleContent("description");
      setActiveButton(btnDescription, btnSpecifications);
    });
  }

  function toggleContent(contentType) {
    document.getElementById("specifications").style.display = "none";
    document.getElementById("description").style.display = "none";
    document.getElementById(contentType).style.display = "grid";
  }
  function setActiveButton(activeButton, inactiveButton) {
    inactiveButton.classList.remove("productcard-btn_active");
    activeButton.classList.add("productcard-btn_active");
  }
  const strip = document.getElementById("strip");
  const movingText = document.getElementById("movingText");

  if (strip && movingText) {
    movingText.innerHTML += movingText.innerHTML;
    strip.style.width = `${movingText.scrollWidth}px`;

    const setAnimationDuration = () => {
      const speed = 30;
      strip.style.animationDuration = `${
        movingText.scrollWidth / (movingText.scrollWidth / speed)
      }s`;
    };

    setAnimationDuration();
    window.addEventListener("resize", setAnimationDuration);
  }

  const contentBlocks = document.querySelectorAll(
    ".content-rigth_block-p.services-hidden"
  );
  if (contentBlocks.length > 0) {
    const descriptionTitles = document.querySelectorAll(".description-title");
    descriptionTitles.forEach((title, index) => {
      title.addEventListener("click", () => {
        contentBlocks[index].classList.toggle("services-hidden");

        const arrowUp = title.querySelector(".arrow-ser-up");
        const arrowDown = title.querySelector(".arrow-ser-down");
        arrowUp.style.display =
          arrowUp.style.display === "none" ? "block" : "none";
        arrowDown.style.display =
          arrowDown.style.display === "none" ? "block" : "none";
      });
    });
  }

  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.getElementById("closeModalButton");

  if (modal && openModalButton && closeModalButton) {
    openModalButton.onclick = function () {
      modal.style.display = "flex";
    };

    closeModalButton.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  const openReviewButtons = document.querySelectorAll(".open-modal");
  if (openReviewButtons.length > 0) {
    const reviewModals = document.querySelectorAll(".modal-reviews");
    const closeReviewButtons = document.querySelectorAll(".close-reviews");

    const openReviewModal = (modal) => {
      if (modal) {
        modal.style.display = "flex";
      }
    };
    const closeReviewModal = (modal) => {
      if (modal) {
        modal.style.display = "none";
      }
    };
    openReviewButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        openReviewModal(reviewModals[index]);
      });
    });
    closeReviewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal-reviews");
        closeReviewModal(modal);
      });
    });
    window.addEventListener("click", (event) => {
      reviewModals.forEach((modal) => {
        if (event.target === modal) {
          closeReviewModal(modal);
        }
      });
    });
  }

  $(function () {
    var showcase = $("#showcase");
    if (showcase.length) {
      var activeIndex = 0;
      function getYRadius() {
        if (window.matchMedia("(max-width: 48em)").matches) {
          return 50; 
        }
        return 200;
      }

      // Инициализация карусели с динамическим yRadius
      showcase.Cloud9Carousel({
        yRadius: getYRadius(),
        itemClass: "card",
        buttonLeft: $(".snav-left"),
        buttonRight: $(".snav-right"),
        bringToFront: true,
        onLoaded: function () {
          showcase.css("visibility", "visible");
          showcase.fadeIn(100);
          adjustCardSizes();
        },
        onChange: function (newIndex) {
          activeIndex = newIndex;
          adjustCardSizes();
        },
      });

      // Обработчик клика на карточки
      showcase.on("click", ".card", function () {
        var clickedIndex = $(this).index();
        console.log(
          "Clicked Index: " + clickedIndex + ", Active Index: " + activeIndex
        );

        if (clickedIndex !== activeIndex) {
          activeIndex = clickedIndex;
          console.log("New Active Index: " + activeIndex);
          adjustCardSizes();
          showcase.data("carousel").go(clickedIndex - activeIndex);
        }
      });

      function adjustCardSizes() {
        var cards = showcase.find(".card");
        cards.each(function (index) {
          $(this).removeClass("active-card");
          $(this).css({ width: "34rem", height: "25rem" });

          if (index === activeIndex) {
            $(this).css({
              width: "60.8rem",
              height: "35rem",
            });
            $(this).addClass("active-card");
          }
        });
      }

      // Обработка касаний и мыши
      $("#cloud9").on("touchstart", function (event) {
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function (event) {
          var xMove = event.originalEvent.touches[0].pageX;
          if (Math.floor(xClick - xMove) > 5) {
            $(this).data("carousel").go(1);
            $(this).off("touchmove");
          } else if (Math.floor(xClick - xMove) < -5) {
            $(this).data("carousel").go(-1);
            $(this).off("touchmove");
          }
        });
        $("#cloud9").on("touchend", function () {
          $(this).off("touchmove");
        });
      });

      var xClick;
      var mouseDown;
      $("#cloud9").on("mousedown", function (event) {
        xClick = event.pageX;
        mouseDown = true;
      });
      $("#cloud9").on("mousemove", function (event) {
        if (mouseDown) {
          var xMove = event.pageX;
          if (Math.floor(xClick - xMove) > 5) {
            $(this).data("carousel").go(1);
            mouseDown = false;
          } else if (Math.floor(xClick - xMove) < -5) {
            $(this).data("carousel").go(-1);
            mouseDown = false;
          }
        }
      });
      $("#cloud9").on("mouseup", function (event) {
        mouseDown = false;
      });
      $(window).resize(function () {
  
        showcase.data("carousel").yRadius = getYRadius();
        showcase.data("carousel").update();
      });
    }
  });
});
