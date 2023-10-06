const sidebarFilter = document.querySelector('[data-element="category__filters"]')

if (sidebarFilter) {
  setTimeout(sidebarFilterInit, 0)
}

function sidebarFilterInit () {

  const categoryCheckboxBoxArray = sidebarFilter.querySelectorAll('[data-element="category__checkbox-box"]')
  for (let i = 0; i < categoryCheckboxBoxArray.length; i++) {
    categoryCheckboxBoxInit(categoryCheckboxBoxArray[i])
  }

  const openButton = document.querySelector('[data-element="category-cap__filters-open"]')
  const layer = document.getElementsByClassName('category__filters-layer')[0]
  const buttonClose = sidebarFilter.getElementsByClassName('category__filters-close')[0]
  const doubleInputs = sidebarFilter.querySelectorAll('[data-element="category__double-price"]')

  doubleInputs.forEach(filterBlockInit)

  function filterBlockInit (block) {
    const minInput = block.querySelector('[data-element="category__double-input_start"]')
    const maxInput = block.querySelector('[data-element="category__double-input_end"]')

    minInput.addEventListener('input', checkDoubleValue)
    maxInput.addEventListener('input', checkDoubleValue)

    function checkDoubleValue () {
      isValidDoubleIInput(minInput, maxInput)
    }
  }

  function isValidDoubleIInput (start, end) {
    if (+start.value > +end.value) {
      start.classList.add('category__double-input_error')
      end.classList.add('category__double-input_error')
      return false
    }
    start.classList.remove('category__double-input_error')
    end.classList.remove('category__double-input_error')
    return true
  }

  sidebarFilter.addEventListener('submit', checkSubmit)

  function checkSubmit (event) {
    if (notValidInputs()) return event.preventDefault()
  }

  function notValidInputs () {
    const invalidInputs = sidebarFilter.getElementsByClassName('category__double-input_error')
    return !!invalidInputs.length
  }

  openButton.addEventListener('click', showFilter)

  function showFilter () {
    layer.classList.add('category__filters-layer_active')
    sidebarFilter.classList.add('category__filters_active')
  }

  layer.addEventListener('click', hideFilter)
  buttonClose.addEventListener('click', hideFilter)

  function hideFilter () {
    layer.classList.remove('category__filters-layer_active')
    sidebarFilter.classList.remove('category__filters_active')
  }
}

function categoryCheckboxBoxInit (box) {
  const categoryCheckboxList = box.querySelector('[data-element="category__checkbox-list"]')
  const categoryCheckboxLabelArray = categoryCheckboxList.querySelectorAll('[data-element="category__checkbox-label"]')
  if (categoryCheckboxLabelArray.length < 10) {
    const categoryCheckboxMore = box.querySelector('[data-element="category__checkbox-more"]')
    categoryCheckboxMore.style.display = "none"
    return
  }

  const categoryCheckboxMore = box.querySelector('[data-element="category__checkbox-more"]')
  categoryCheckboxMore.addEventListener('click', toggleList)
  hideList(categoryCheckboxMore)

  function toggleList () {
    if (this.classList.contains("category__checkbox-more_active")) {
      hideList(this)
    } else {
      this.classList.add("category__checkbox-more_active")
      for (let i = 0; i < categoryCheckboxLabelArray.length; i++) {
        categoryCheckboxLabelArray[i].classList.remove("category__checkbox-label_hidden")
      }
      this.textContent = "Скрыть"
    }
  }

  function hideList (btn) {
    btn.classList.remove("category__checkbox-more_active")
    for (let i = 10; i < categoryCheckboxLabelArray.length; i++) {
      categoryCheckboxLabelArray[i].classList.add("category__checkbox-label_hidden")
    }
    btn.textContent = `Ещё ${categoryCheckboxLabelArray.length - 5}`
  }
}
