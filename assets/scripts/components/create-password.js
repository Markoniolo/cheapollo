const createPasswordForm = document.querySelector('[data-element="create-password__form"]')

if (createPasswordForm) setTimeout(createPasswordFormInit, 0)

function createPasswordFormInit () {
  const password1 = createPasswordForm.querySelector('[data-element="password1"]')
  const password2 = createPasswordForm.querySelector('[data-element="password2"]')
  const createPasswordSubmit = createPasswordForm.querySelector('[data-element="create-password__submit"]')

  createPasswordForm.addEventListener("input", validateForm)

  function validateForm () {
    if (password1.value === password2.value) {
      createPasswordSubmit.disabled = false
    } else {
      createPasswordSubmit.disabled = true
    }
  }
}
