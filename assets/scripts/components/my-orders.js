import { addProductInFavorites, deleteProductFromFavorites, checkLocalStorage } from "../tools/FavoritePosts"

const myOrdersFavoriteArray = document.querySelectorAll('[data-element="my-orders__favorite"]')

if (myOrdersFavoriteArray.length) setTimeout(myOrdersFavoriteArrayInit, 0)

function myOrdersFavoriteArrayInit () {
  console.log(myOrdersFavoriteArray)
  for (let i = 0; i < myOrdersFavoriteArray.length; i++) {
    const id = myOrdersFavoriteArray[i].getAttribute("data-id")
    checkLocalStorage(myOrdersFavoriteArray[i], id, "my-orders__favorite_active")

    myOrdersFavoriteArray[i].addEventListener("click", (event) => {
      event.preventDefault()
      if (myOrdersFavoriteArray[i].classList.contains('my-orders__favorite_active')) {
        deleteProductFromFavorites(myOrdersFavoriteArray[i], id, "my-orders__favorite_active")
      } else {
        addProductInFavorites(myOrdersFavoriteArray[i], id, "my-orders__favorite_active")
      }
    })
  }
}
