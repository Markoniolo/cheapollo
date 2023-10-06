import { addProductInFavorites, deleteProductFromFavorites, checkLocalStorage } from "../tools/FavoritePosts"

const orderAboutFavoriteArray = document.querySelectorAll('[data-element="order-about-in__favorite"]')

if (orderAboutFavoriteArray.length) setTimeout(orderAboutFavoriteArrayInit, 0)

function orderAboutFavoriteArrayInit () {
  console.log(orderAboutFavoriteArray)
  for (let i = 0; i < orderAboutFavoriteArray.length; i++) {
    const id = orderAboutFavoriteArray[i].getAttribute("data-id")
    checkLocalStorage(orderAboutFavoriteArray[i], id, "order-about-in__favorite_active")

    orderAboutFavoriteArray[i].addEventListener("click", (event) => {
      event.preventDefault()
      if (orderAboutFavoriteArray[i].classList.contains('order-about-in__favorite_active')) {
        deleteProductFromFavorites(orderAboutFavoriteArray[i], id, "order-about-in__favorite_active")
      } else {
        addProductInFavorites(orderAboutFavoriteArray[i], id, "order-about-in__favorite_active")
      }
    })
  }
}
