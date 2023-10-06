const orderItemMapArray = document.querySelectorAll('[data-element="order__item_map"]')

if (orderItemMapArray) setTimeout(orderItemMapArrayInit, 0)

function orderItemMapArrayInit () {
  for (let i = 0; i < orderItemMapArray.length; i++) {
    orderItemMapArray[i].addEventListener("click", initMap, {once: true})
  }
}

async function initMap () {
  const mod = this.getAttribute("data-mod")
  const map = document.getElementById(`modal-order-map__map_${mod}`)
  const centerCoords = map.getAttribute('data-coords-center')
  const oldScript = document.getElementsByClassName("map-script")[0]
  if (oldScript) {
    createMap(mod, centerCoords)
    return
  }

  const script = document.createElement("script")
  script.classList.add("map-script")
  const body = document.getElementsByTagName("body")[0]
  body.append(script)
  script.addEventListener('load', scriptLoaded)
  script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU"

  function scriptLoaded() {
    createMap(mod, centerCoords)
  }
}

const modalOrderMapItemArray = document.querySelectorAll('[data-element="modal-order-map__item"]')
for (let i = 0; i < modalOrderMapItemArray.length; i++) {
  buttonInit(modalOrderMapItemArray[i])
}

async function createMap(mod, centerCoords) {
  ymaps.ready(init);

  async function init() {
    const zoom = window.innerWidth > 950 ? 14 : 15
    var myMap = new ymaps.Map(`modal-order-map__map_${mod}`, {
      center: JSON.parse(centerCoords),
      zoom: zoom
    });

    const mapNode = document.getElementById(`modal-order-map__map_${mod}`)
    const modalOrderMapButtonArray = mapNode.parentElement.querySelectorAll('[data-element="modal-order-map__button"]')
    for (let i = 0; i < modalOrderMapButtonArray.length; i++) {
      modalOrderMapButtonArray[i].addEventListener("click", chooseAddress)
    }

    function chooseAddress () {
      const resultArray = JSON.parse(this.parentElement.getAttribute("data-result"))
      const resultAddress = this.parentElement.getAttribute("data-result-address")
      const orderDeliveryResultPickup = document.querySelector('[data-element="order__delivery-result_pickup"]')
      const text = orderDeliveryResultPickup.getElementsByClassName("order__text")[0]
      const spanArray = orderDeliveryResultPickup.getElementsByClassName("order__span")
      text.textContent = resultAddress
      for (let i = 0; i < spanArray.length; i++) {
        spanArray[i].textContent = resultArray[i]
      }

      const modal = document.getElementById(`modal-${mod}`)
      const closeBtn = modal.querySelector('[data-role="modal-box__close"]')

      const order = document.querySelector('[data-element="order"]')
      const orderListDelivery = order.querySelector('[data-element="order__list_delivery"]')
      orderListDelivery.classList.add("order__list_hide")
      const orderStepDelivery = order.getElementsByClassName("order__step_delivery")[0]
      orderStepDelivery.classList.add("order__step_done")
      const orderDeliveryResultOld = order.getElementsByClassName("order__delivery-result_show")[0]
      if (orderDeliveryResultOld) orderDeliveryResultOld.classList.remove("order__delivery-result_show")

      const orderTitleDelivery = order.querySelector('[data-element="order__title_delivery"]')
      const date = this.parentElement.getAttribute("data-date")
      const price = this.parentElement.getAttribute("data-price")
      if (mod === "pickup") {
        orderTitleDelivery.textContent = `Шаг 1 — доставка в пункт выдачи ${date}, за ${price}`
      } else {
        orderTitleDelivery.textContent = `Шаг 1 — забрать из магазина ${date}, за ${price}`
      }

      orderDeliveryResultPickup.classList.add("order__delivery-result_show")

      function orderDeliveryChangeActiveRemove () {
        const orderDeliveryChangeActive = order.getElementsByClassName("order__delivery-change_active")[0]
        if (orderDeliveryChangeActive) orderDeliveryChangeActive.classList.remove("order__delivery-change_active")
      }
      const orderItemMap = order.querySelector('[data-mod="' + mod + '"]')
      const input = orderItemMap.getElementsByClassName("order__input-radio")[0]
      input.checked = true
      orderDeliveryChangeActiveRemove()
      closeBtn.click()
    }

    for (let i = 0; i < modalOrderMapItemArray.length; i++) {
      createPlacemark(modalOrderMapItemArray[i])
    }

    function createPlacemark (item) {
      const coords = JSON.parse(item.getAttribute('data-coords'))
      const caption = item.getAttribute('data-map-caption')
      const placemark = new ymaps.Placemark(coords, {
        iconCaption: caption
      })
      myMap.geoObjects.add(placemark)
    }

    const modalOrderMapAddressArray = document.querySelectorAll('[data-element="modal-order-map__address"]')
    for (let i = 0; i < modalOrderMapAddressArray.length; i++) {
      modalOrderMapAddressArray[i].addEventListener("click", setMapCenter)
    }

    function setMapCenter () {
      const centerCoords = JSON.parse(this.parentElement.getAttribute("data-coords"))
      myMap.setCenter(centerCoords)
    }
  }
}

function buttonInit (item) {
  const button = item.querySelector('[data-element="modal-order-map__button"]')
  button.textContent = item.getAttribute('data-button-shablon') + item.getAttribute('data-date') + ', за ' + item.getAttribute('data-price')
}

const modalOrderMapShowInfoArray = document.querySelectorAll('[data-element="modal-order-map__show-info"]')

for (let i = 0; i < modalOrderMapShowInfoArray.length; i++) {
  modalOrderMapShowInfoArray[i].addEventListener("click", toggleModalOrderMapInfo)
}

function toggleModalOrderMapInfo () {
  const toggleModalOrderMapInfo = this.previousElementSibling
  if (toggleModalOrderMapInfo.classList.contains('modal-order-map__info_active')) {
    toggleModalOrderMapInfo.classList.remove('modal-order-map__info_active')
    this.classList.remove("modal-order-map__show-info_active")
    this.textContent = "Показать фото и описание пункта"
  } else {
    toggleModalOrderMapInfo.classList.add('modal-order-map__info_active')
    this.classList.add("modal-order-map__show-info_active")
    this.textContent = "Скрыть описание"
  }
}
