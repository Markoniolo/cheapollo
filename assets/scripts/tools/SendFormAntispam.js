import IsInvalidationPhone from '../tools/IsInvalidationPhone'

export function disabledButton (component, dataElement) {
  const button = component.querySelector(dataElement)
  button.disabled = true
}

export function enabledButton (component, dataElement) {
  const button = component.querySelector(dataElement)
  button.disabled = false
}

export function getData (form, dataMod) {
  const data = new FormData(form)
  if (dataMod === "basket") {
    const basketInputCounter = document.querySelectorAll('[data-element="basket__input-counter"]')
    for (let i = 0; i < basketInputCounter.length; i++) {
      data.append(basketInputCounter[i].name, basketInputCounter[i].value)
    }
  }
  const hiddenInput = form.querySelector('[data-role="input-spam"]')
  if (hiddenInput) data.delete(hiddenInput.name)
  return data
}

export function sendForm (formData, url) {
  fetch(url, { method: 'POST', body: formData })
    .then(res => { return res.json() })
    .then(data => { if (data) window.location.assign('/thanks') })
    .catch(console.error)
}

export function validation(phone, mail, component) {
  if (phone) {
    if (validatePhone(phone, component)) return
  }
  if (mail) {
    if (validationMail(mail, component)) return
  }
  enabledButton(component, '[data-role="autocomplete-spam-form-button"]')
}

function validatePhone(phone, component) {
  if (IsInvalidationPhone(phone.value)) {
    phone.classList.add("input_wrong")
    disabledButton(component, '[data-role="autocomplete-spam-form-button"]')
    return true
  } else {
    phone.classList.remove("input_wrong")
  }
}

function validationMail(mail, component) {
  if ((mail.validity.valid === false)) {
    mail.classList.add("input_wrong")
    disabledButton(component, '[data-role="autocomplete-spam-form-button"]')
    return true
  } else {
    mail.classList.remove("input_wrong")
  }
}
