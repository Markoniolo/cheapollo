const delivery = document.querySelector('[data-element="delivery"]')

if (delivery) setTimeout(deliveryInit, 0)

function deliveryInit () {
  const deliveryNavItemArray = delivery.querySelectorAll('[data-element="delivery__nav-item"]')
  for (let i = 0; i < deliveryNavItemArray.length; i++) {
    deliveryNavItemArray[i].addEventListener('click', toggleDeliverySection)
  }
}

function toggleDeliverySection () {
  if (this.classList.contains('delivery__nav-item_active')) return
  const oldActiveItem = delivery.getElementsByClassName("delivery__nav-item_active")[0]
  if (oldActiveItem) oldActiveItem.classList.remove("delivery__nav-item_active")
  this.classList.add("delivery__nav-item_active")
  const oldActiveSection = document.getElementsByClassName("delivery-section_show")[0]
  if (oldActiveSection) oldActiveSection.classList.remove("delivery-section_show")
  const selector = this.getAttribute("data-show")
  const newActiveSection = document.querySelector('[data-element="' + selector + '"]')
  newActiveSection.classList.add("delivery-section_show")
}
