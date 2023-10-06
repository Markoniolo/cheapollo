import {Basket} from "../tools/Basket"
import { addProductInFavorites, deleteProductFromFavorites } from "../tools/FavoritePosts";

const modalBasket = document.querySelector('[data-element="modal-basket"]')

if (modalBasket) setTimeout(modalBasketInit, 0)

function modalBasketInit () {
  const counterElement = document.querySelector('[data-element="modal-basket__counter"]')

  new InputCount(counterElement)
  new Product(modalBasket)
}

class Product {
  constructor(productElement) {
    this._view = productElement
    this._buttonRemove = this.view.querySelector('[data-element="modal-basket__counter-button_delete"]')
    this._buttonRemove.addEventListener('click', () => { this.remove() })
    this._buttonFavorite = this.view.querySelector('[data-element="modal-basket__button_like"]')
    this._buttonFavorite.addEventListener('click', () => { this.toggleFavorites() })
  }

  toggleFavorites() {
    const id = this._buttonFavorite.getAttribute("data-id")
    if (this._buttonFavorite.classList.contains('modal-basket__button_like-active')) {
      deleteProductFromFavorites(this._buttonFavorite, id, 'modal-basket__button_like-active')
    } else {
      addProductInFavorites(this._buttonFavorite, id, 'modal-basket__button_like-active')
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
    const dataId = this._buttonRemove.getAttribute("data-id")
    Basket.removeProduct(dataId)
    modalBasket.getElementsByClassName('modal-box__close')[0].click()
    try {
      const buttonBasket = document.querySelector('[data-element="product__buy-button"]')
      buttonBasket.classList.remove('product__buy-button_add')
      buttonBasket.innerText = 'Заказать'
      buttonBasket.setAttribute("data-modal-box", "true")
      buttonBasket.addEventListener('click', addProductInBasket)
    } catch (e) {
      console.dir(e)
    }
  }
}

class InputCount {
  constructor(countElement) {
    this._view = countElement
    this._input = this._view.querySelector('[data-element="modal-basket__counter-number"]')
    this._step = +this._input.getAttribute('data-step')
    this._buttonDown = this._view.querySelector('[data-element="modal-basket__count-button_down"]')
    this._buttonUp = this._view.querySelector('[data-element="modal-basket__count-button_up"]')
    this._buttonRemove = this._view.querySelector('[data-element="modal-basket__counter-button_delete"]')
    this._buttonRemove.addEventListener('click', () => { this.remove() })
    this._input.addEventListener('change', () => this.validation())
    this._buttonDown.addEventListener('click', () => this.down())
    this._buttonUp.addEventListener('click', () => this.up())
    this.validation()
  }

  remove () {
    const dataId = this._buttonRemove.getAttribute("data-id")
    Basket.removeProduct(dataId)
    const closeBtn = document.getElementsByClassName("modal-box__close")[0]
    closeBtn.click()
  }

  get value () {
    return +this._input.value
  }

  set value (value) {
    this._input.value = value
  }

  validation () {
    this.value = Math.trunc(this.value)
    if (this.value <= 1) this.hideDown()
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
    this._buttonRemove.style.display = 'none'
  }

  showClose () {
    this._buttonRemove.style.display = 'block'
  }

  down () {
    if (this._step) {
      this.value -= this._step.toFixed(2)
    } else {
      this.value -= 1
    }
    if (this.value <= 1) {
      this.hideDown()
      this.value = 1
    }
  }

  up () {
    if (this._step) {
      this.value = (this.value + this._step).toFixed(2)
    } else {
      this.value += 1
    }
    if (this.value > 1) this.showDown()
  }
}

const buttonBasket = document.querySelector('[data-element="product__button-basket"]')

if (buttonBasket) setTimeout(initProductBasket, 0)
let productId

function initProductBasket () {
  productId = +buttonBasket.getAttribute("data-id")
  const inBasket = Basket.checkProduct(productId)

  if (inBasket) {
    buttonBasket.removeAttribute("data-modal-box")
    return activateClassFromButtonBasket()
  }

  try {
    buttonBasket.addEventListener('click', addProductInBasket)
  } catch (e) {
    console.dir(e)
  }
}

function addProductInBasket (event) {
  // event.preventDefault()

  Basket.addProduct(
    productId,
    () => {
      console.log('Ошибка')
    },
    () => {
      try {
        buttonBasket.removeEventListener('click', addProductInBasket)
      } catch (e) {
        console.dir(e)
      }

      activateClassFromButtonBasket()
      buttonBasket.removeAttribute("data-modal-box")
    }
  )
  activateClassFromButtonBasket()
}

function activateClassFromButtonBasket () {
  try {
    buttonBasket.classList.add('product__buy-button_add')
    const count = Basket.getCountProducts()
    const tovar = morph(count)
    buttonBasket.innerText = `${count} ${tovar} в корзине`
  } catch (e) {
    console.dir(e)
  }
}

function morph(int, array) {
  return (array = array || ['товар', 'товара', 'товаров']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}
