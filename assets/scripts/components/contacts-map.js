const contactsMap = document.querySelector('[data-element="contacts-map"]')

if (contactsMap) setTimeout(contactsMapInit, 0)

function contactsMapInit () {
  const contactsMapShowInfoArray = contactsMap.querySelectorAll('[data-element="contacts-map__show-info"]')

  for (let i = 0; i < contactsMapShowInfoArray.length; i++) {
    contactsMapShowInfoArray[i].addEventListener('click', toggleInfoList)
  }

  initMap()
}

function toggleInfoList() {
  const infoList = this.previousElementSibling
  if (infoList.classList.contains('contacts-map__info_active')) {
    infoList.classList.remove('contacts-map__info_active')
    this.classList.remove("contacts-map__show-info_active")
    this.textContent = "Показать фото и описание пункта"
  } else {
    infoList.classList.add('contacts-map__info_active')
    this.classList.add("contacts-map__show-info_active")
    this.textContent = "Скрыть описание"
  }
}

// async function initMap () {
//   const map = document.getElementById(`contacts-map__map`)
//   const centerCoords = map.getAttribute('data-coords-center')
//
//   const script = document.createElement("script")
//   const body = document.getElementsByTagName("body")[0]
//   body.append(script)
//   script.addEventListener('load', scriptLoaded)
//   script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU"
//
//   function scriptLoaded() {
//     createMap(centerCoords)
//   }
// }

async function createMap(centerCoords) {
  ymaps.ready(init);

  async function init() {
    const zoom = window.innerWidth > 950 ? 14 : 15
    console.log(JSON.parse(centerCoords))
    var myMap = new ymaps.Map(`contacts-map__map`, {
      center: JSON.parse(centerCoords),
      zoom: zoom
    });

    // const modalOrderMapItemArray = document.querySelectorAll('[data-element="contacts-map__item"]')
    // for (let i = 0; i < modalOrderMapItemArray.length; i++) {
    //   createPlacemark(modalOrderMapItemArray[i])
    // }
    //
    // function createPlacemark (item) {
    //   const coords = JSON.parse(item.getAttribute('data-coords'))
    //   const caption = item.getAttribute('data-map-caption')
    //   const placemark = new ymaps.Placemark(coords, {
    //     iconCaption: caption
    //   })
    //   myMap.geoObjects.add(placemark)
    // }

    const modalOrderMapAddressArray = document.querySelectorAll('[data-element="contacts-map__address"]')
    for (let i = 0; i < modalOrderMapAddressArray.length; i++) {
      modalOrderMapAddressArray[i].addEventListener("click", setMapCenter)
    }

    function setMapCenter () {
      const centerCoords = JSON.parse(this.parentElement.getAttribute("data-coords"))
      myMap.setCenter(centerCoords)
    }
  }
}

function initMap () {
  const map = document.getElementById(`contacts-map__map`)
  const centerMap = map.getAttribute('data-coords-center')
  const zoom = window.innerWidth > 950 ? 5 : 3

  loadMap()

  function loadMap () {
    const mapScript = document.createElement('script')

    mapScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
    document.body.appendChild(mapScript)

    mapScript.addEventListener('load', function () {
      ymaps.ready(contactMapInit)
    })
  }

  function contactMapInit () {
    let myMap
    const zoom = window.innerWidth > 950 ? 14 : 15
    myMap = new ymaps.Map('contacts-map__map', {
      center: JSON.parse(centerMap),
      zoom: zoom
    })

    const modalOrderMapItemArray = document.querySelectorAll('[data-element="contacts-map__item"]')
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

    const modalOrderMapAddressArray = document.querySelectorAll('[data-element="contacts-map__address"]')
    for (let i = 0; i < modalOrderMapAddressArray.length; i++) {
      modalOrderMapAddressArray[i].addEventListener("click", setMapCenter)
    }

    function setMapCenter () {
      const centerCoords = JSON.parse(this.parentElement.getAttribute("data-coords"))
      myMap.setCenter(centerCoords)
    }
  }
}
