export function createTag(tagName, className, text, href, dataElement) {
  const tag = document.createElement(tagName)
  tag.classList.add(...className)
  if (text) tag.textContent = text
  if (href) tag.setAttribute("href", href)
  if (dataElement) tag.setAttribute("data-element", dataElement)
  return tag
}

export function createHeaderSearchMainBox(dataArray, cont) {
  removeOldHeaderSearchMainBox(cont)

  const headerSearchMainBox = createTag("div", ["header-search__main-box"])

  // const headerSearchMenu = createHeaderSearchMenu(dataArray)
  // headerSearchMainBox.appendChild(headerSearchMenu)

  const headerSearchProductsBox = createHeaderSearchProductsBox(dataArray)
  headerSearchMainBox.appendChild(headerSearchProductsBox)

  const buttonAll = createTag("button", ["header-search__all-result", "button-white"], "Все результаты")
  buttonAll.type = "submit"
  buttonAll.setAttribute("form", "header__search-form")
  headerSearchMainBox.appendChild(buttonAll)

  cont.appendChild(headerSearchMainBox)
}

function createHeaderSearchProductsBox(dataArray) {
  const headerSearchProductsBox = createTag("div", ["header-search__products-box"])

  if (dataArray.categories.length || dataArray.products.length) {
    if (dataArray.categories.length) {
      const headerSearchCategoryList = createTag("div", ["header-search__category-list"])
      for (let i = 0; i < dataArray.categories.length; i++) {
        const category = createCategory(dataArray.categories[i])
        headerSearchCategoryList.appendChild(category)
      }
      headerSearchProductsBox.appendChild(headerSearchCategoryList)
    }

    if (dataArray.products.length) {
      const tileSearch = createTileSearch(dataArray)
      headerSearchProductsBox.appendChild(tileSearch)
    }
  } else {
    console.log('empty')
  }

  return headerSearchProductsBox
}

function createTileSearch(dataArray) {
  const list = createTag("div", ["tile-search__list"])
  for (let i = 0; i < dataArray.products.length; i++) {
    const item = createItem(dataArray.products[i])
    list.appendChild(item)
  }
  return list
}

function createItem(product) {
  const item = createTag("a", ["tile-search__item"], '', product.link)
  item.setAttribute("data-element", "tile-search__item")

  const picture = createTileSearchPicture(product)
  item.appendChild(picture)

  const priceBox = createTileSearchPriceBox(product)
  item.appendChild(priceBox)

  const infoLine = createTileSearchInfoLine(product)
  item.appendChild(infoLine)

  const text = createTag("p", ["tile-search__text", "text-small"], "Лента тефлоновая уплотнительная чёрная")
  item.appendChild(text)

  return item
}

function createTileSearchInfoLine(product) {
  const infoLine = createTag("div", ["tile-search__info-line"])
  const rating = createTag("div", ["tile-search__rating"])
  const ratingFill = createTag("div", ["tile-search__rating-fill"])
  ratingFill.style = `width: ${product.ratingFill}`
  const ratingValue = createTag("div", ["tile-search__rating-value", "text-small"], product.ratingCount)
  const ratingAvailability = createTag("div", ["tile-search__availability", "text-small"], product.availability)

  rating.appendChild(ratingFill)
  infoLine.appendChild(rating)
  infoLine.appendChild(ratingValue)
  infoLine.appendChild(ratingAvailability)

  return infoLine

}

function createTileSearchPriceBox(product) {
  const priceBox = createTag("div", ["tile-search__price-box"])
  const price = createTag("div", ["tile-search__price"], product.price)
  const priceInfo = createTag("div", ["tile-search__price-info"])

  let priceOld
  if (product.priceOld) {
    priceOld = createTag("div", ["tile-search__price-old"], product.priceOld)
    priceInfo.appendChild(priceOld)
  }

  const priceRouble = createTag("div", ["tile-search__price-rouble"], "₽/шт.")

  priceInfo.appendChild(priceRouble)
  priceBox.appendChild(price)
  priceBox.appendChild(priceInfo)

  return priceBox
}

function createTileSearchPicture(product) {
  const picture = createTag("picture", ["tile-search__picture"])

  let discount
  if (product.discount) {
    discount = createTag("div", ["tile-search__discount", "text-small"], product.discount)
    picture.appendChild(discount)
  }

  const source2x = document.createElement("source")
  source2x.srcset = product.picture.srcset48 + ' 1x, ' + product.picture.srcset96 + ' 2x'
  source2x.type = "image/webp"
  source2x.media = "(max-width: 1240px)"

  const source140 = document.createElement("source")
  source140.srcset = product.picture.srcset140
  source140.type = "image/webp"

  const image = document.createElement("img")
  image.src = product.picture.src140
  image.classList.add("tile-search__image")

  picture.appendChild(source2x)
  picture.appendChild(source140)
  picture.appendChild(image)

  return picture
}

function createCategory(category) {
  const headerSearchCategoryItem = createTag("a", ["header-search__category-item"], '', category.link)

  const headerSearchCategoryText = createTag("span", ["header-search__category-text"], category.name)
  headerSearchCategoryItem.appendChild(headerSearchCategoryText)

  const headerSearchCategoryPicture = createHeaderSearchCategoryPicture(category.picture)
  headerSearchCategoryItem.appendChild(headerSearchCategoryPicture)

  return headerSearchCategoryItem
}

function createHeaderSearchCategoryPicture(category) {
  const headerSearchCategoryPicture = createTag("picture", ["header-search__category-picture"])
  const source32 = document.createElement("source")
  source32.srcset = category.srcset32
  source32.type = "image/webp"

  const source64 = document.createElement("source")
  source64.srcset = category.srcset32 + ' 1x, ' + category.srcset64 + ' 2x'
  source64.type = "image/webp"
  source64.media = "(max-width: 1240px)"

  const image = document.createElement("img")
  image.src = category.src32
  image.classList.add("header-search__category-image")

  headerSearchCategoryPicture.appendChild(source64)
  headerSearchCategoryPicture.appendChild(source32)
  headerSearchCategoryPicture.appendChild(image)

  return headerSearchCategoryPicture
}

function createHeaderSearchMenu(dataArray) {
  const headerSearchMenu = createTag("div", ["header-search__menu"])

  let headerSearchMenuLink1, headerSearchMenuLink2
  if (dataArray.productsCount !== 0) {
    headerSearchMenuLink1 = createTag("div", ["header-search__menu-link", "header-search__menu-link_active", "text-small"], `В каталоге — ${dataArray.productsCount}`)
  } else {
    headerSearchMenuLink1 = createTag("div", ["header-search__menu-link", "header-search__menu-link_disactive", "text-small"], `В каталоге — 0`)
  }

  if (dataArray.journalCount !== 0) {
    headerSearchMenuLink2 = createTag("div", ["header-search__menu-link", "header-search__menu-link_active", "text-small"], `Новости и статьи — ${dataArray.journalCount}`)
  } else {
    headerSearchMenuLink2 = createTag("div", ["header-search__menu-link", "header-search__menu-link_disactive", "text-small"], `Новости и статьи — 0`)
  }

  headerSearchMenu.appendChild(headerSearchMenuLink1)
  headerSearchMenu.appendChild(headerSearchMenuLink2)

  return headerSearchMenu
}

function removeOldHeaderSearchMainBox(cont) {
  const oldHeaderSearchMainBox = cont.getElementsByClassName("header-search__main-box")[0]
  if (oldHeaderSearchMainBox) oldHeaderSearchMainBox.remove()
}
