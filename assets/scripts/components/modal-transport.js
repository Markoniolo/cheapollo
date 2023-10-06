const modalTransport = document.getElementById("modal-transport")

if (modalTransport) setTimeout(modalTransportInit, 0)

function modalTransportInit () {
  const modalTransportButton = modalTransport.querySelector('[data-element="modal-transport__button"]')
  const requiredInputArray = modalTransport.querySelectorAll('[required]')
  for (let i = 0; i < requiredInputArray.length; i++) {
    requiredInputArray[i].addEventListener('input', validateReauiredInputs)
  }

  validateReauiredInputs()

  function validateReauiredInputs() {
    modalTransportButton.disabled = false
    for (let i = 0; i < requiredInputArray.length; i++) {
      requiredInputArray[i].classList.remove("input_wrong")
    }
    for (let i = 0; i < requiredInputArray.length; i++) {
      if (!requiredInputArray[i].value) {
        requiredInputArray[i].classList.add("input_wrong")
        modalTransportButton.disabled = true
        break
      }
    }
  }

  const modalTransportBoxSelectArray = modalTransport.querySelectorAll('[data-element="modal-transport__box_select"]')
  for (let i = 0; i < modalTransportBoxSelectArray.length; i++) {
    selectInit(modalTransportBoxSelectArray[i])
    modalTransportBoxSelectArray[i].addEventListener("click", toggleSelectShow)
  }

  function toggleSelectShow() {
    const oldActive = modalTransport.getElementsByClassName("modal-transport__list-box_active")[0]
    if (oldActive) oldActive.classList.remove("modal-transport__list-box_active")
    const listBox = this.parentElement.getElementsByClassName("modal-transport__list-box")[0]
    listBox.classList.add("modal-transport__list-box_active")
    window.addEventListener('click', removeListBox)
  }

  function removeListBox(event) {
    if (!event.target.classList.contains("input-animate-placeholder") && !event.target.classList.contains("modal-transport__input")) {
      const activeListBox = modalTransport.getElementsByClassName("modal-transport__list-box_active")[0]
      activeListBox.classList.remove("modal-transport__list-box_active")
      window.removeEventListener('click', removeListBox)
    }
  }

  function selectInit (block) {
    const input = block.parentElement.getElementsByClassName("modal-transport__input")[0]
    const items = block.parentElement.querySelectorAll('[data-element="modal-transport__select-span"]')
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', toggleInput)
    }
    function toggleInput () {
      if (!this.classList.contains("modal-transport__select-span_active")) {
        const oldActive = block.parentElement.getElementsByClassName("modal-transport__select-span_active")[0]
        oldActive.classList.remove("modal-transport__select-span_active")
        this.classList.add("modal-transport__select-span_active")
        input.value = this.textContent
        const listBox = block.parentElement.getElementsByClassName("modal-transport__list-box")[0]
        listBox.classList.remove("modal-transport__list-box_active")
        window.removeEventListener('click', removeListBox)
      }
    }
  }
}



