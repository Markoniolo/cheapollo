const order = document.querySelector('[data-element="order"]')

if (order) setTimeout(orderInit, 0)

function orderInit () {
  const orderItemManager = order.querySelector('[data-element="order__item_manager"]')
  orderItemManager.addEventListener("click", chooseManager)

  const orderInputRadioPaymentArray = order.querySelectorAll('[data-element="order__input-radio_payment"]')
  for (let i = 0; i < orderInputRadioPaymentArray.length; i++) {
    orderInputRadioPaymentArray[i].addEventListener("click", paymentStepDone)
  }

  function paymentStepDone () {
    const orderStepPayment = order.getElementsByClassName("order__step_payment")[0]
    orderStepPayment.classList.add("order__step_done")
    for (let i = 0; i < orderInputRadioPaymentArray.length; i++) {
      orderInputRadioPaymentArray[i].removeEventListener("click", paymentStepDone)
    }
  }

  const orderDeliveryChangeArray = order.querySelectorAll('[data-element="order__delivery-change"]')
  for (let i = 0; i < orderDeliveryChangeArray.length; i++) {
    orderDeliveryChangeArray[i].addEventListener("click", toggleOrderListDelivery)
  }

  const orderSidebarBox = order.getElementsByClassName("order__sidebar-box")[0]
  orderSidebarBox.addEventListener('click', showInputs)
  function showInputs() {
    console.log(orderSidebarBox.elements)
  }

  const modalCourierButton = document.querySelector('[data-element="modal-courier__button"]')
  modalCourierButton.addEventListener('click', updateCourierDelivery)

  const modalTransportButton = document.querySelector('[data-element="modal-transport__button"]')
  modalTransportButton.addEventListener('click', updateTransportDelivery)

  const orderReceiverLinkButtonArray = order.querySelectorAll('[data-element="order__receiver-link-button"]')
  for (let i = 0; i < orderReceiverLinkButtonArray.length; i++) {
    orderReceiverLinkButtonArray[i].addEventListener('click', checkoutLoginRegisterForm)
  }

  const orderStep = order.querySelectorAll('[data-element="order__step"]')
  for (let i = 0; i < orderStep.length; i++) {
    initDropdawnButton(orderStep[i])
  }

  const modalUserButton = document.querySelector('[data-element="modal-user__button"]')
  modalUserButton.addEventListener("click", updateOrderUser)

  const orderReceiverTypeBtnArray = order.querySelectorAll('[data-element="order__receiver-type-btn"]')
  for (let i = 0; i < orderReceiverTypeBtnArray.length; i++) {
    orderReceiverTypeBtnArray[i].addEventListener("click", toggleType)
  }
}

function chooseManager () {
  orderListDeliveryHide()
  const orderDeliveryResultManager = order.querySelector('[data-element="order__delivery-result_manager"]')
  orderDeliveryResultManager.classList.add("order__delivery-result_show")
}

function toggleOrderListDelivery () {
  const orderListDelivery = order.querySelector('[data-element="order__list_delivery"]')
  if (orderListDelivery.classList.contains("order__list_hide")) {
    orderListDelivery.classList.remove("order__list_hide")
    this.classList.add("order__delivery-change_active")
  } else {
    orderListDelivery.classList.add("order__list_hide")
    this.classList.remove("order__delivery-change_active")
  }
}

function updateTransportDelivery () {
  const modalBoxClose = this.parentElement.getElementsByClassName("modal-box__close")[0]
  const orderTitleDelivery = order.querySelector('[data-element="order__title_delivery"]')
  const orderDeliveryResult = document.querySelector('[data-element="order__delivery-result_transport"]')
  const text = orderDeliveryResult.getElementsByClassName("order__text")[0]
  const modalCourier = document.getElementById("modal-transport")
  const city = modalCourier.querySelector('[data-element="city"]')
  const street = modalCourier.querySelector('[data-element="street"]')
  const house = modalCourier.querySelector('[data-element="house"]')
  const room = modalCourier.querySelector('[data-element="room"]')
  const entrance = modalCourier.querySelector('[data-element="entrance"]')
  const floor = modalCourier.querySelector('[data-element="floor"]')

  text.textContent = `${city.value}, ${street.value}, д. ${house.value}`
  if (room.value) text.textContent = text.textContent + `, кв. ` + room.value
  if (entrance.value) text.textContent = text.textContent + `, подъезд ` + entrance.value
  if (floor.value) text.textContent = text.textContent + `, этаж ` + floor.value

  const deliveryTransport = document.querySelector('[data-role="delivery-transport"]')

  orderTitleDelivery.textContent = `Шаг 1 — доставка ТК ${deliveryTransport.value}`
  orderListDeliveryHide()
  orderDeliveryResult.classList.add("order__delivery-result_show")
  const orderItemTransport = order.querySelector('[data-element="order__item_transport"]')
  const input = orderItemTransport.getElementsByClassName("order__input-radio")[0]
  input.checked = true
  orderDeliveryChangeActiveRemove()
  modalBoxClose.click()
}

function updateCourierDelivery () {
  const modalBoxClose = this.parentElement.getElementsByClassName("modal-box__close")[0]
  const orderTitleDelivery = order.querySelector('[data-element="order__title_delivery"]')
  const orderDeliveryResult = document.querySelector('[data-element="order__delivery-result_courier"]')
  const text = orderDeliveryResult.getElementsByClassName("order__text")[0]

  const modalCourier = document.getElementById("modal-courier")

  const city = modalCourier.querySelector('[data-element="city"]')
  const street = modalCourier.querySelector('[data-element="street"]')
  const house = modalCourier.querySelector('[data-element="house"]')
  const room = modalCourier.querySelector('[data-element="room"]')
  const entrance = modalCourier.querySelector('[data-element="entrance"]')
  const floor = modalCourier.querySelector('[data-element="floor"]')

  const span = orderDeliveryResult.getElementsByClassName("order__span")[0]
  const deliveryTime = document.querySelector('[data-role="delivery-time"]')
  const deliveryDate = document.querySelector('[data-role="delivery-date"]')
  const comment = modalCourier.querySelector('[data-element="comment"]')
  text.textContent = `${city.value}, ${street.value}, д. ${house.value}`
  if (room.value) text.textContent = text.textContent + `, кв. ` + room.value
  if (entrance.value) text.textContent = text.textContent + `, подъезд ` + entrance.value
  if (floor.value) text.textContent = text.textContent + `, этаж ` + floor.value
  if (comment.value) span.textContent = `Комментарий: ${comment.value}`

  orderTitleDelivery.textContent = `Шаг 1 — доставка курьером ${deliveryDate.value}, ${deliveryTime.value}`

  orderListDeliveryHide()
  orderDeliveryResult.classList.add("order__delivery-result_show")
  const orderItemCourier = order.querySelector('[data-element="order__item_courier"]')
  const input = orderItemCourier.getElementsByClassName("order__input-radio")[0]
  input.checked = true
  orderDeliveryChangeActiveRemove()
  modalBoxClose.click()
}

function orderDeliveryChangeActiveRemove () {
  const orderDeliveryChangeActive = order.getElementsByClassName("order__delivery-change_active")[0]
  if (orderDeliveryChangeActive) orderDeliveryChangeActive.classList.remove("order__delivery-change_active")
}

function orderListDeliveryHide() {
  const orderListDelivery = order.querySelector('[data-element="order__list_delivery"]')
  orderListDelivery.classList.add("order__list_hide")
  const orderStepDelivery = order.getElementsByClassName("order__step_delivery")[0]
  orderStepDelivery.classList.add("order__step_done")
  const orderDeliveryResultOld = order.getElementsByClassName("order__delivery-result_show")[0]
  if (orderDeliveryResultOld) orderDeliveryResultOld.classList.remove("order__delivery-result_show")
}

function checkoutLoginRegisterForm() {
  this.parentElement.parentElement.classList.add("order__display-hidden")
  const searchQuery = this.getAttribute("data-show")
  const formToShow = order.querySelector('[data-element="' + searchQuery + '"]')
  formToShow.classList.remove("order__display-hidden")
}

function initDropdawnButton (block) {
  const orderDropdawn = block.querySelector('[data-element="order__dropdawn"]')
  const orderMobileHiddenBlock = block.querySelector('[data-role="order-mobile-hidden-block"]')

  orderDropdawn.addEventListener('click', orderDropdawnToggle)

  function orderDropdawnToggle() {
    if (this.classList.contains("order__dropdawn_hidden")) {
      this.classList.remove("order__dropdawn_hidden")
      this.textContent = "Скрыть"
      orderMobileHiddenBlock.classList.remove("order__display-hidden")
    } else {
      this.classList.add("order__dropdawn_hidden")
      this.textContent = "Показать"
      orderMobileHiddenBlock.classList.add("order__display-hidden")
    }
  }
}

function updateOrderUser() {
  const modalBoxClose = this.parentElement.getElementsByClassName("modal-box__close")[0]
  const userName = document.querySelector('[data-element="user-name"]')
  const userPhone = document.querySelector('[data-element="user-phone"]')
  const userInputName = document.querySelector('[data-element="modal-user__input-name"]')
  const userInputPhone = document.querySelector('[data-element="modal-user__input-phone"]')
  userName.textContent = userInputName.value
  userPhone.textContent = userInputPhone.value
  modalBoxClose.click()
}

function toggleType () {
  const oldBtn = order.getElementsByClassName("order__receiver-type-btn_active")[0]
  const oldBox = order.getElementsByClassName("order__receiver-box_active")[0]
  oldBox.classList.remove("order__receiver-box_active")
  oldBtn.classList.remove("order__receiver-type-btn_active")
  this.classList.add("order__receiver-type-btn_active")
  const id = this.getAttribute("data-receiver-type")
  const orderReceiverBox = order.querySelector('[data-receiver-box="' + id + '"]')
  orderReceiverBox.classList.add("order__receiver-box_active")
}
