import { addProductInFavorites, deleteProductFromFavorites, checkLocalStorage } from "../tools/FavoritePosts";

const productBuyButtonLike = document.querySelector('[data-element="product__buy-button_like"]')

if (productBuyButtonLike) setTimeout(productBuyButtonLikeInit, 0)

function productBuyButtonLikeInit () {
  const id = productBuyButtonLike.getAttribute("data-id")
  checkLocalStorage(productBuyButtonLike, id, "product__buy-button_like-active")

  productBuyButtonLike.addEventListener("click", (event) => {
      event.preventDefault()
      if (productBuyButtonLike.classList.contains('product__buy-button_like-active')) {
        deleteProductFromFavorites(productBuyButtonLike, id, "product__buy-button_like-active")
      } else {
        addProductInFavorites(productBuyButtonLike, id, "product__buy-button_like-active")
      }
    })
}
