const indexCap = document.querySelector('[data-element="index-cap"]')

if (indexCap) setTimeout(indexCapInit, 0)

function indexCapInit() {
  let activeIndex = 0

  const indexCapArrowNext = indexCap.querySelector('[data-element="index-cap__arrow_next"]')
  const indexCapArrowPrev = indexCap.querySelector('[data-element="index-cap__arrow_prev"]')

  const indexCapPictures = indexCap.querySelectorAll('[data-element="index-cap__picture"]')

  indexCapArrowNext.addEventListener("click", nextSlide)
  indexCapArrowPrev.addEventListener("click", prevSlide)

  const indexCapNavItems = indexCap.querySelectorAll('[data-element="index-cap__nav-item"]')

  for (let i = 0; i < indexCapNavItems.length; i++) {
    indexCapNavItems[i].addEventListener("click", checkoutNavItem)
  }

  function checkoutNavItem () {
    const oldActive = indexCap.getElementsByClassName("index-cap__nav-item_active")[0]
    if (oldActive) oldActive.classList.remove("index-cap__nav-item_active")
    this.classList.add("index-cap__nav-item_active")
    const id = this.getAttribute("data-id")
    checkoutSlide(id)
  }

  function checkoutSlide (index) {
    activeIndex = index
    const oldActive = indexCap.getElementsByClassName("index-cap__picture_active")[0]
    if (oldActive) oldActive.classList.remove("index-cap__picture_active")
    indexCapPictures[activeIndex].classList.add("index-cap__picture_active")
  }

  function nextSlide () {
    activeIndex = ++activeIndex
    if (activeIndex === indexCapPictures.length) {
      activeIndex = 0
    }
    checkNavItem(activeIndex)
    checkoutSlide(activeIndex)
  }

  function prevSlide () {
    activeIndex = --activeIndex
    if (activeIndex === -1) {
      activeIndex = indexCapPictures.length - 1
    }
    checkNavItem(activeIndex)
    checkoutSlide(activeIndex)
  }

  function checkNavItem (activeIndex) {
    const oldActive = indexCap.getElementsByClassName("index-cap__nav-item_active")[0]
    if (oldActive) oldActive.classList.remove("index-cap__nav-item_active")
    indexCapNavItems[activeIndex].classList.add("index-cap__nav-item_active")
  }
}
