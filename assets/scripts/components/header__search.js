import { createHeaderSearchMainBox, createTag } from "../tools/CreateNodesForSearch";

const dataArray = {
  categories: [
    { name: "Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы Бензопилы Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы, Бензопилы Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы Бензопилы ", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } },
    { name: "Бензопилы Бензопилы Бензопилы", link: "#", picture: { src32: "https://via.placeholder.com/32x24", srcset32: "https://via.placeholder.com/32x24", srcset64: "https://via.placeholder.com/64x48" } }
  ],
  products: [
    {
      link: '#',
      discount: "−23%",
      picture: {
        src140: "https://via.placeholder.com/140x140",
        srcset140: "https://via.placeholder.com/140x140", //это webp
        srcset48: "https://via.placeholder.com/48x48", //это webp 1x
        srcset96: "https://via.placeholder.com/96x96", //это webp 2x
      },
      price: 16,
      priceOld: "18 ₽",
      ratingFill: "70%",
      ratingCount: 132,
      availability: "В наличии",
      text: "Лента тефлоновая уплотнительная чёрная"
    },
    {
      link: '#',
      picture: {
        src140: "https://via.placeholder.com/140x140",
        srcset140: "https://via.placeholder.com/140x140", //это webp
        srcset48: "https://via.placeholder.com/48x48", //это webp 1x
        srcset96: "https://via.placeholder.com/96x96", //это webp 2x
      },
      price: 32,
      ratingFill: "70%",
      ratingCount: 132,
      availability: "В наличии",
      text: "Клей строительный"
    }
  ],
  productsCount: 5,
  journalCount: 0,
}

const headerSearchInput = document.querySelector('[data-element="header__search-input"]')

if (headerSearchInput) setTimeout(headerSearchInputInit, 0)

function headerSearchInputInit () {
  const header = document.querySelector('[data-element="header"]')
  const headerMobileSearch = document.querySelector('[data-element="header-mobile__search"]')
  const headerMobileSearchClose = document.querySelector('[data-element="header__search-close-mobile"]')
  const headerSearchBtnClose = document.querySelector('[data-element="header__search-btn_close"]')
  const headerSearch = document.querySelector('[data-element="header-search"]')
  const headerSearchForm = document.querySelector('[data-element="header__search-form"]')
  const headerCont = document.querySelector('[data-element="header-search__cont"]')
  const headerLayer = document.querySelector('[data-element="header__layer"]')
  const headerSearchYouLookingFor = document.querySelector('[data-element="header-search__you-looking-for"]')

  headerMobileSearch.addEventListener("click", searchOpen)
  headerMobileSearchClose.addEventListener("click", searchHide)

  headerSearchInput.addEventListener("focus", searchOpen)
  headerSearchBtnClose.addEventListener("click", searchHide)
  headerLayer.addEventListener("click", searchHide)
  headerSearchInput.addEventListener("input", searchModalHide)

  const linkRequest = headerSearchForm.action
  let textSearch = headerSearchInput.value

  headerSearchForm.addEventListener("submit", saveSearchText)

  function saveSearchText(event) {
    event.preventDefault()

    if (headerSearchInput.value) {
      let savedSearchList = JSON.parse(localStorage.getItem("savedSearchList"))
      if (savedSearchList) {
        if (savedSearchList.length < 3) {
          savedSearchList[savedSearchList.length] = headerSearchInput.value
        } else {
          savedSearchList.unshift(headerSearchInput.value)
          savedSearchList.pop()
        }
        localStorage.setItem("savedSearchList", JSON.stringify(savedSearchList))
      } else {
        savedSearchList = JSON.stringify([headerSearchInput.value])
        localStorage.setItem("savedSearchList", savedSearchList)
      }
    }

    event.currentTarget.submit()
  }

  const tileSearchItemArray = document.querySelectorAll('[data-element="tile-search__item"]')
  for (let i = 0; i < tileSearchItemArray.length; i++) {

  }

  function _eventKey (event) {
    if (event.code === 'Escape') {
      searchHide()
    }
  }

  headerSearchInput.addEventListener('input', _eventInputForm)

  function SearchAutoComplete (url, text, cb) {
    const request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.addEventListener('readystatechange', event => {
      const response = event.currentTarget
      if (response.readyState !== XMLHttpRequest.DONE) return false
      if (response.status !== 200) return console.log('Error send form')
      const dataArray = JSON.parse(response.response)
      cb(dataArray, headerCont)
    })
    request.send(`query=${text}`)
  }

  function _eventInputForm (event) {
    textSearch = event.target.value
    timeOut(textSearch)
  }

  function timeOut (text) {
    setTimeout(() => {
      if (text === textSearch) SearchAutoComplete(linkRequest, text, createHeaderSearchMainBox)
    }, 300)
  }

  function searchOpen () {
    document.addEventListener('keydown', _eventKey)
    header.classList.add("header_search-active")
    headerSearch.classList.add("header-search_active")
    headerSearchInput.focus()
    headerLayer.classList.add("header__layer_active")
  }

  function createListYouLookingFor() {
    let savedSearchList = JSON.parse(localStorage.getItem("savedSearchList"))

    if (savedSearchList) {
      const headerSearchList = createTag('div', ['header-search__list'])
      for (let i = 0; i < savedSearchList.length; i++) {
        const headerSearchLink = createTag('a', ['header-search__link', 'text'], savedSearchList[i])
        headerSearchLink.addEventListener('click', submitYouLookingFor)
        headerSearchList.appendChild(headerSearchLink)
      }
      const headerSearchNote = document.getElementsByClassName("header-search__note")[0]
      headerSearchNote.after(headerSearchList)
    }
  }

  function submitYouLookingFor(event) {
    const text = event.currentTarget.textContent
    headerSearchInput.value = text
    headerSearchForm.submit()
  }

  createListYouLookingFor()

  function searchHide() {
    document.removeEventListener('keydown', _eventKey)
    header.classList.remove("header_search-active")
    headerSearch.classList.remove("header-search_active")
    headerLayer.classList.remove("header__layer_active")
    headerSearchInput.blur()
  }

  function searchModalHide() {
    headerSearchYouLookingFor.classList.add("header-search__you-looking-for_hidden")
  }
}
