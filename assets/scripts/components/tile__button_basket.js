import {Basket} from "../tools/Basket"
import {checkLocalStorage} from "../tools/FavoritePosts";

const tileButtonBasketArray = document.querySelectorAll('[data-element="tile__button_basket"]')

if (tileButtonBasketArray) setTimeout(tileButtonBasketArrayInit, 0)

function tileButtonBasketArrayInit() {
  for (let i = 0; i < tileButtonBasketArray.length; i++) {
    tileButtonBasketArray[i].addEventListener("click", addInBasket)
    checkLocalBasket(tileButtonBasketArray[i])
  }
}

function checkLocalBasket(button) {
  const dataId = +button.getAttribute("data-id")
  const inBasket = Basket.checkProduct(dataId)

  if (inBasket) {
    button.removeEventListener("click", addInBasket)
    button.classList.add("tile__button_basket-add")
  }
}

function addInBasket(event) {
  event.preventDefault()

  const buttonBasket = this
  const productId = buttonBasket.getAttribute("data-id")
  Basket.addProduct(
    productId,
    () => {
      console.log('Ошибка')
    },
    () => {
      try {
        buttonBasket.removeEventListener('click', addInBasket)
      } catch (e) {
        console.dir(e)
      }
      buttonBasket.classList.add("tile__button_basket-add")
    }
  )
}
