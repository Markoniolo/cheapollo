import {getData, sendForm, validation} from './SendFormAntispam'

const forms = document.querySelectorAll('[data-role="autocomplete-spam-form"]')

if (forms) setTimeout(formsInit, 0)

function formsInit() {
  for (let i = 0; i < forms.length; i++) {
    formInit(forms[i])
  }
}

function formInit(form) {
  let personalInformation = sessionStorage.getItem("personalInformation")

  if (personalInformation) {
    personalInformation = JSON.parse(personalInformation)
    autocomplete()
  }

  function autocomplete () {
    const mail = document.querySelector('[data-role="autocomplete-spam-form-mail"]')
    if (mail && personalInformation.mail) mail.value = personalInformation.mail
    const phone = document.querySelector('[data-role="autocomplete-spam-form-phone"]')
    if (phone && personalInformation.phone) phone.value = personalInformation.phone
  }

  form.addEventListener('submit', submitForm)

  const phone = form.querySelector('[data-role="autocomplete-spam-form-phone"]')
  const mail = form.querySelector('[data-role="autocomplete-spam-form-mail"]')
  if (phone) {
    form.addEventListener('input', validate)
  }
  if (mail) {
    form.addEventListener('input', validate)
  }
  function validate () {
    validation(phone, mail, form)
  }

  function submitForm (event) {
    event.preventDefault()
    const form = event.currentTarget
    const button = form.querySelector('[data-role="autocomplete-spam-form-button"]')
    const dataMod = button.getAttribute("data-mod")
    const data = getData(form, dataMod)
    const url = form.getAttribute('action')
    sendForm(data, url)
  }
}
