// import { addProductInFavorites, deleteProductFromFavorites, checkLocalStorage } from "../tools/FavoritePosts";
//
// const tileButtonFavoriteArray = document.querySelectorAll('[data-element="tile__button_favorite"]')
//
// if (tileButtonFavoriteArray) setTimeout(tileButtonFavoriteArrayInit, 0)
//
// function tileButtonFavoriteArrayInit () {
//   for (let i = 0; i < tileButtonFavoriteArray.length; i++) {
//     const id = tileButtonFavoriteArray[i].getAttribute("data-id")
//     checkLocalStorage(tileButtonFavoriteArray[i], id, "tile__button_favorite-active")
//
//     tileButtonFavoriteArray[i].addEventListener("click", (event) => {
//       event.preventDefault()
//       if (tileButtonFavoriteArray[i].classList.contains('tile__button_favorite-active')) {
//         deleteProductFromFavorites(tileButtonFavoriteArray[i], id, "tile__button_favorite-active")
//       } else {
//         addProductInFavorites(tileButtonFavoriteArray[i], id, "tile__button_favorite-active")
//       }
//     })
//   }
// }
