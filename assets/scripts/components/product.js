const product = document.querySelector('[data-element="product"]')

if (product) setTimeout(productInit, 0)

function productInit () {
  const productNavPictures = product.querySelectorAll('[data-element="product__nav-picture"]')
  const productGalleryPictures = product.querySelectorAll('[data-element="product__gallery-picture"]')

  for (let i = 0; i < productNavPictures.length; i++) {
    productNavPictures[i].addEventListener("click", checkoutNavPicture)
  }

  function checkoutNavPicture () {
    const oldActiveNavPicture = product.getElementsByClassName("product__nav-picture_active")[0]
    if (oldActiveNavPicture) oldActiveNavPicture.classList.remove("product__nav-picture_active")
    this.classList.add("product__nav-picture_active")
    const dataId = this.getAttribute("data-id")
    checkoutGalleryPicture(dataId)
  }

  function checkoutGalleryPicture (id) {
    const oldActive = product.getElementsByClassName("product__gallery-picture_active")[0]
    oldActive.classList.remove("product__gallery-picture_active")
    productGalleryPictures[id].classList.add("product__gallery-picture_active")
  }
}
