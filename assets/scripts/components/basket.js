import {Basket} from '../tools/Basket'

import { deleteProductFromFavorites, addProductInFavorites } from '../tools/FavoritePosts'

const view = document.querySelector('[data-element="basket__box"]')

if (view) setTimeout(initBasket, 0)

const counterElements = document.querySelectorAll('[data-element="basket__counter"]')
const basketInputCounterArray = document.getElementsByClassName("basket__input-counter")
const basketResultValue = document.querySelector('[data-element="basket__result-value"]')
const basketOrderInfoItemValueDiscount = document.querySelector('[data-element="basket__order-info-item-value_discount"]')
const basketOrderInfoItemValuePromocode = document.querySelector('[data-element="basket__order-info-item-value_promocode"]')
const basketOrderInfoItemValuePriceFull = document.querySelector('[data-element="basket__order-info-item-value_price-full"]')
const basketOrderInfoItemValueCountAll = document.querySelector('[data-element="basket__order-info-item-value_count-all"]')
const basketOrderInfoItemValueWeight = document.querySelector('[data-element="basket__order-info-item-value_weight"]')
const basketFixedPriceOld = document.querySelector('[data-element="basket__fixed-price-old"]')
const basketFixedPriceCurrent = document.querySelector('[data-element="basket__fixed-price-current"]')

const headerMobileText = document.querySelector('[data-element="header-mobile__text"]')
const basketTextMain = document.querySelector('[data-element="basket__text-main"]')

function refreshPrice() {
  let priceFull = 0
  let discountFull = 0
  let countAll = 0
  let weight = 0
  let priceResult = 0
  for (let i = 0; i < basketInputCounterArray.length; i++) {
    const price = +basketInputCounterArray[i].getAttribute("data-price") * +basketInputCounterArray[i].value
    const discount = +basketInputCounterArray[i].getAttribute("data-discount") * +basketInputCounterArray[i].value
    priceFull = priceFull + price
    if (discount) discountFull = discountFull + discount
    countAll = countAll + +basketInputCounterArray[i].value
    weight = weight + +basketInputCounterArray[i].getAttribute("data-weight") * +basketInputCounterArray[i].value
  }
  priceResult = (priceFull-discountFull).toFixed(2)
  basketResultValue.textContent = formatPrice(String(priceResult))
  basketFixedPriceCurrent.textContent = formatPrice(String(priceResult))
  if (discountFull) {
    basketOrderInfoItemValueDiscount.textContent = "-" + formatPrice(String(discountFull.toFixed(2)))
  } else {
    basketOrderInfoItemValueDiscount.remove()
  }

  basketOrderInfoItemValuePriceFull.textContent = formatPrice(String(priceFull.toFixed(2)))
  const price = formatPrice(String(priceResult))
  basketFixedPriceCurrent.textContent = price.substring(0, price.length - 1)
  basketFixedPriceOld.textContent = formatPrice(String(priceFull.toFixed(2)))
  basketOrderInfoItemValueCountAll.textContent = countAll.toFixed(2)
  basketOrderInfoItemValueWeight.textContent = formatPrice(String(weight.toFixed(2)))

  headerMobileText.textContent = countAll.toFixed(2) + " " + morph(countAll.toFixed(2)) + " на сумму " + formatPrice(String(priceResult))
  basketTextMain.textContent = countAll.toFixed(2) + " " + morph(countAll.toFixed(2)) + " на сумму " + formatPrice(String(priceResult))
}

function morph(int, array) {
  return (array = array || ['товар', 'товара', 'товаров']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}

function formatPrice (priceString) {
  (+priceString).toFixed(2)
  if (priceString.length < 4) return `${priceString} ₽`.trim()
  return `${priceString.slice(-12, -9)} ${priceString.slice(-9, -6)} ${priceString.slice(-6, -3)} ${priceString.slice(-3, priceString.length)} ₽`.trim()
}

function initBasket () {
  const basket = document.querySelector('[data-element="basket__form"]')
  basket.addEventListener('input', refreshPrice)
  refreshPrice()

  basket.addEventListener('submit', function (event) {
    event.preventDefault()
    Basket.clean()
    basket.submit()
  })

  if (counterElements.length) {
    counterElements.forEach((element) => {
      new InputCount(element)
    })
  }

  const productElements = document.querySelectorAll('[data-element="basket__item"]')
  if (productElements.length) {
    productElements.forEach((element) => {
      new Product(element)
    })
  }
}

class Product {
  constructor(productElement) {
    this._view = productElement
    this._buttonRemove = this.view.querySelector('[data-element="basket__btn_delete"]')
    this._buttonRemove.addEventListener('click', () => { this.remove() })
    this._buttonFavorite = this.view.querySelector('[data-element="basket__favorite"]')
    this._buttonFavorite.addEventListener('click', () => { this.toggleFavorites() })
  }

  toggleFavorites() {
    const id = this._buttonFavorite.getAttribute("data-id")
    if (this._buttonFavorite.classList.contains('basket__favorite_active')) {
      deleteProductFromFavorites(this._buttonFavorite, id, "basket__favorite_active")
    } else {
      addProductInFavorites(this._buttonFavorite, id, "basket__favorite_active")
    }
  }

  get view () {
    return this._view
  }

  get count () {
    return this._count
  }

  set count (count) {
    this._count = count
  }

  remove () {
    this.view.remove()
    const dataId = this._buttonRemove.getAttribute("data-id")
    Basket.removeProduct(dataId)
    const basketBoxArray = document.querySelectorAll('[data-element="basket__box"]')
    for (let i = 0; i < basketBoxArray.length; i++) {
      const items = basketBoxArray[i].querySelectorAll('[data-element="basket__item"]')
      if (!items.length) basketBoxArray[i].remove()
    }
    const productElements = document.querySelectorAll('[data-element="basket__item"]')
    if (!productElements.length) {
      this.removeBlock()
      const infoEmptyPage = document.querySelector('[data-element="info-empty-page"]')
      infoEmptyPage.classList.remove("info-empty-page_hidden")
    }
    refreshPrice()
  }

  removeBlock () {
    const basket = document.querySelector('[data-element="basket"]')
    if (basket) basket.remove()
  }
}

class InputCount {
  constructor(countElement) {
    this._view = countElement
    this._input = this._view.querySelector('[data-element="basket__input-counter"]')
    this._step = this._input.getAttribute('data-step') ? +this._input.getAttribute('data-step') : 1
    this._buttonDown = this._view.querySelector('[data-element="basket__btn_down"]')
    this._buttonUp = this._view.querySelector('[data-element="basket__btn_up"]')
    this._buttonClose = this._view.querySelector('[data-element="basket__btn_delete"]')
    this._input.addEventListener('change', () => this.validation())
    this._buttonDown.addEventListener('click', () => this.down())
    this._buttonUp.addEventListener('click', () => this.up())
    this.validation()
  }

  get value () {
    return +this._input.value
  }

  set value (value) {
    this._input.value = value
  }

  validation () {
    this.value = Math.trunc(this.value)
    if (this.value === 0) this.value = 1
    else this.value = Math.abs(this.value)
    if (this.value === 1) this.hideDown()
    else this.showDown()
  }

  hideDown () {
    this._buttonDown.style.display = 'none'
    this.showClose()
  }

  showDown () {
    this._buttonDown.style.display = 'block'
    this.hideClose()
  }

  hideClose () {
    this._buttonClose.style.display = 'none'
  }

  showClose () {
    this._buttonClose.style.display = 'block'
  }

  down () {
    if (this._step) {
      this.value = (this.value - this._step).toFixed(2)
    } else {
      this.value -= 1
    }
    if (this.value <= 1) {
      this.hideDown()
      this.value = 1
    }
    refreshPrice()
  }

  up () {
    if (this._step) {
      this.value = (this.value + this._step).toFixed(2)
    } else {
      this.value += 1
    }
    if (this.value > 1) this.showDown()
    refreshPrice()
  }
}
