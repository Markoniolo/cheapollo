const headerCatalogBtn = document.querySelector('[data-element="header__catalog"]')

if (headerCatalogBtn) setTimeout(headerCatalogBtnInit, 0)

function headerCatalogBtnInit () {

  const catalogModal = document.querySelector('[data-element="catalog-modal"]')
  const header = document.querySelector('[data-element="header"]')
  const headerLayer = document.querySelector('[data-element="header__layer"]')

  const catalogModalItemArray = catalogModal.querySelectorAll('[data-category="true"]')
  const categoryCapLinkArray = catalogModal.querySelectorAll('[data-element="category-cap__link"]')
  const categoryCapLinkArrayAll = catalogModal.querySelectorAll('[data-category-cap-link-all="true"]')
  const catalogModalBack = catalogModal.querySelector('[data-element="category-cap__back"]')
  const catalogModalList = catalogModal.querySelector('[data-element="category-cap__list"]')
  const catalogModalListModal = catalogModal.querySelector('[data-element="catalog-modal__list_modal"]')

  for (let i = 0; i < categoryCapLinkArray.length; i++) {
    categoryCapLinkArray[i].addEventListener("click", openInnerCategories2)
  }

  function openInnerCategories2() {
    hideAllLink()
    const id = this.getAttribute("data-category-cap-link-id")
    const currentLinkList = catalogModal.querySelectorAll('[data-inner-category-id-2="' + id + '"]')
    for (let i = 0; i < currentLinkList.length; i++) {
      currentLinkList[i].classList.remove("category-cap__link_hidden")
    }
    catalogModalBack.setAttribute("category3", "true")
    catalogModalBack.setAttribute("id", id)
  }

  for (let i = 0; i < catalogModalItemArray.length; i++) {
    catalogModalItemArray[i].addEventListener("click", openInnerCategories)
  }

  catalogModalBack.addEventListener("click", closeInnerCategories)

  function openInnerCategories() {
    const id = this.getAttribute("data-category-id")
    const currentLinkList = catalogModal.querySelectorAll('[data-inner-category-id-1="' + id + '"]')
    for (let i = 0; i < currentLinkList.length; i++) {
      currentLinkList[i].classList.remove("category-cap__link_hidden")
    }
    catalogModalBack.classList.add("category-cap__back_active")

    hideMainCategory()
    catalogModalList.classList.remove("category-cap__list_hidden")
  }

  function hideMainCategory() {
    catalogModalListModal.classList.add("catalog-modal__list_hidden")
  }

  function showMainCategory() {
    catalogModalListModal.classList.remove("catalog-modal__list_hidden")
  }

  function closeInnerCategories() {
    if (catalogModalBack.getAttribute("category3")) {
      const id = catalogModalBack.getAttribute("id")
      const currentLink = catalogModal.querySelector('[data-category-cap-link-id="' + id + '"]')
      const searchId = currentLink.getAttribute("data-inner-category-id-1")
      const currentLinkList2 = catalogModal.querySelectorAll('[data-inner-category-id-1="' + searchId + '"]')
      hideAllLink()
      for (let i = 0; i < currentLinkList2.length; i++) {
        currentLinkList2[i].classList.remove("category-cap__link_hidden")
      }
      catalogModalBack.removeAttribute("category3")
    } else {
      showMainCategory()
      catalogModalList.classList.add("category-cap__list_hidden")
      catalogModalBack.classList.remove("category-cap__back_active")
      hideAllLink()
    }
  }

  function hideAllLink() {
    for (let i = 0; i < categoryCapLinkArrayAll.length; i++) {
      categoryCapLinkArrayAll[i].classList.add("category-cap__link_hidden")
    }
  }

  headerLayer.addEventListener("click", closeCatalog)

  headerCatalogBtn.addEventListener("click", toggleCatalog)

  function toggleCatalog() {
    if (headerCatalogBtn.classList.contains("header__catalog_active")) {
      closeCatalog()
    } else {
      openCatalog()
    }
  }

  function openCatalog () {
    headerCatalogBtn.classList.add("header__catalog_active")
    header.classList.add("header_catalog-active")
    headerLayer.classList.add("header__layer_active")
    openHeaderCatalog()
  }

  function closeCatalog () {
    headerCatalogBtn.classList.remove("header__catalog_active")
    header.classList.remove("header_catalog-active")
    headerLayer.classList.remove("header__layer_active")
    closeHeaderCatalog()
  }

  function closeHeaderCatalog () {
    catalogModal.classList.remove("catalog-modal_opacity-active")
    setTimeout(displayHide, 200)

    function displayHide () {
      catalogModal.classList.remove("catalog-modal_display-active")
    }
  }

  function openHeaderCatalog () {
    catalogModal.classList.add("catalog-modal_display-active")
    setTimeout(opacityActive, 0)

    function opacityActive () {
      catalogModal.classList.add("catalog-modal_opacity-active")
    }
  }
}
