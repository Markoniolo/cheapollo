const modalBoxButtons = document.querySelectorAll('[data-modal-box="true"]')

if (modalBoxButtons.length) setTimeout(modalBoxButtonsInit, 0)

function modalBoxButtonsInit() {
  for (let i = 0; i < modalBoxButtons.length; i++) {
    modalBoxButtons[i].addEventListener('click', openModal)
  }
}

function openModal(event) {
  event.preventDefault()

  const href = this.getAttribute("data-src")

  const modal = document.getElementById(href.slice(1))
  const buttonClose = modal.querySelector('[data-role="modal-box__close"]')
  const layer = modal.querySelector('[data-role="modal-box__layer"]')

  buttonClose.addEventListener("click", closeModal)
  layer.addEventListener("click", closeModal)

  function closeModal() {
    modal.classList.remove("modal-box_opacity")
    setTimeout(hideDisplay, 300)
  }

  function hideDisplay() {
    modal.classList.remove("modal-box_display")
  }

  modal.classList.add("modal-box_display")
  setTimeout(showOpacity, 0)

  function showOpacity() {
    modal.classList.add("modal-box_opacity")
  }
}


