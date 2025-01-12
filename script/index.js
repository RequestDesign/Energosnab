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

  try {
    ymaps.ready(function () {
      var mapElement = document.getElementById("map");
      if (mapElement) {
        init();
      } else {
        console.log(
          "Элемент с ID 'map' не найден. Карта не будет инициализирована."
        );
      }
    });
  } catch (error) {
    console.error(
      "Ошибка: ymaps не определен. Убедитесь, что библиотека Yandex Maps загружена.",
      error
    );
  }
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.975, 37.5165],
      zoom: 16,
      controls: [],
      controls: ["zoomControl"],
    });

    var myPlacemark = new ymaps.Placemark(
      [55.975, 37.5165],
      {},
      {
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -30],
      }
    );
    myMap.geoObjects.add(myPlacemark);

    var addressDiv = document.createElement("div");
    addressDiv.className = "address-label";
    addressDiv.innerHTML =
      "Московская область, г. Долгопрудный, ул. Заводская, дом 2";

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
      } else {
        console.log("myMap.projection не определен.");
      }
    }

    updateAddressPosition();

    myPlacemark.events.add("drag", updateAddressPosition);
    myPlacemark.events.add("dragend", updateAddressPosition);
  }

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
});
