// export async function sendFavoriteResponse(formData, url) {
//   const response = await fetch(url, {
//     method: 'POST',
//     body: formData
//   })
//   if (!response.ok) return
//   const result = await response.json()
//   const serverFavorites = result.products
//
//   localStorage.setItem('favorites', JSON.stringify(serverFavorites))
// }
//
// export async function checkLocalStorage(elem, productId, className) {
//   const localFavorites = JSON.parse(localStorage.getItem('favorites'))
//   if (localFavorites) {
//     for (let i = 0; i < localFavorites.length; i++) {
//       if (localFavorites[i] == productId) {
//         elem.classList.add(className)
//       }
//     }
//   } else {
//     const response = await sendFavoriteResponse(false, '/get-favorites')
//     if (!response.ok) return
//     checkLocalStorage()
//   }
// }
//
// export async function deleteProductFromFavorites(elem, id, className) {
//   const formData = new FormData()
//   formData.append('id', id)
//
//   sendFavoriteResponse(formData, '/product/remove-from-favorites')
//
//   elem.classList.remove(className)
// }
//
// export async function addProductInFavorites(elem, id, className) {
//   const formData = new FormData()
//   formData.append('id', id)
//
//   sendFavoriteResponse(formData, '/product/add-to-favorites')
//
//   elem.classList.add(className)
// }
