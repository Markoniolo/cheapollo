const headerMobileBurger = document.querySelector('[data-element="header-mobile__burger"]')

if (headerMobileBurger) setTimeout(headerMobileBurgerInit, 0)

function headerMobileBurgerInit () {
  const headerFixed = document.querySelector('[data-element="header-fixed"]')
  const headerFixedClose = document.querySelector('[data-element="header-fixed__close"]')
  const headerLayer = document.querySelector('[data-element="header__layer"]')

  headerMobileBurger.addEventListener("click", showFixedMenu)
  headerFixedClose.addEventListener("click", hideFixedMenu)
  headerLayer.addEventListener("click", hideFixedMenu)

  function showFixedMenu () {
    headerFixed.classList.add('header-fixed_active')
    headerLayer.classList.add('header__layer_active')
  }

  function hideFixedMenu () {
    headerFixed.classList.remove('header-fixed_active')
    headerLayer.classList.remove('header__layer_active')
  }
}
