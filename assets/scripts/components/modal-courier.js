const modalCourier = document.getElementById("modal-courier")

if (modalCourier) setTimeout(modalCourierInit, 0)

function modalCourierInit () {
  const modalCourierButton = modalCourier.querySelector('[data-element="modal-courier__button"]')
  const requiredInputArray = modalCourier.querySelectorAll('[required]')
  for (let i = 0; i < requiredInputArray.length; i++) {
    requiredInputArray[i].addEventListener('input', validateReauiredInputs)
  }

  validateReauiredInputs()

  function validateReauiredInputs() {
    modalCourierButton.disabled = false
    for (let i = 0; i < requiredInputArray.length; i++) {
      requiredInputArray[i].classList.remove("input_wrong")
    }
    for (let i = 0; i < requiredInputArray.length; i++) {
      if (!requiredInputArray[i].value) {
        requiredInputArray[i].classList.add("input_wrong")
        modalCourierButton.disabled = true
        break
      }
    }
  }

  const modalCourierBoxSelectArray = modalCourier.querySelectorAll('[data-element="modal-courier__box_select"]')
  for (let i = 0; i < modalCourierBoxSelectArray.length; i++) {
    selectInit(modalCourierBoxSelectArray[i])
    modalCourierBoxSelectArray[i].addEventListener("click", toggleSelectShow)
  }

  function toggleSelectShow() {
    const oldActive = modalCourier.getElementsByClassName("modal-courier__list-box_active")[0]
    if (oldActive) oldActive.classList.remove("modal-courier__list-box_active")
    const listBox = this.parentElement.getElementsByClassName("modal-courier__list-box")[0]
    listBox.classList.add("modal-courier__list-box_active")
    window.addEventListener('click', removeListBox)
  }

  function removeListBox(event) {
    if (!event.target.classList.contains("input-animate-placeholder") && !event.target.classList.contains("modal-courier__input")) {
      const activeListBox = modalCourier.getElementsByClassName("modal-courier__list-box_active")[0]
      activeListBox.classList.remove("modal-courier__list-box_active")
      window.removeEventListener('click', removeListBox)
    }
  }

  const modalCourierInputTextarea = modalCourier.querySelector('[data-element="comment"]')
  modalCourierInputTextarea.addEventListener('input', resizeTextarea)

  function selectInit (block) {
    const input = block.parentElement.getElementsByClassName("modal-courier__input")[0]
    const items = block.parentElement.querySelectorAll('[data-element="modal-courier__select-span"]')
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', toggleInput)
    }
    function toggleInput () {
      if (!this.classList.contains("modal-courier__select-span_active")) {
        const oldActive = block.parentElement.getElementsByClassName("modal-courier__select-span_active")[0]
        oldActive.classList.remove("modal-courier__select-span_active")
        this.classList.add("modal-courier__select-span_active")
        input.value = this.textContent
        const listBox = block.parentElement.getElementsByClassName("modal-courier__list-box")[0]
        listBox.classList.remove("modal-courier__list-box_active")
        window.removeEventListener('click', removeListBox)
      }
    }
  }

  function resizeTextarea () {
    this.style.height = "61px"
    this.style.height = (this.scrollHeight + 5)+"px";
  }
}



