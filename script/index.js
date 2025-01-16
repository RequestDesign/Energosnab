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

  ymaps.ready(function () {
    init("moscow");
    initMap2(); // Инициализация второй карты
  });

  function init(city) {
    if (myMap) {
      myMap.destroy();
    }

    var coordinates;
    var addressText;
    if (city === "moscow") {
      coordinates = [55.975, 37.5165];
      addressText = "Московская область, г. Долгопрудный, ул. Заводская, дом 2";
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
});
