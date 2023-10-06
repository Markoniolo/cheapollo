const reviews = document.querySelector('[data-element="reviews"]')

if (reviews) setTimeout(reviewsInit, 0)

function reviewsInit () {
  const reviewsItems = reviews.querySelectorAll('[data-element="reviews__item"]')

  for (let i = 0; i < reviewsItems.length; i++) {
    reviewsItemInit(reviewsItems[i])
  }
}

function reviewsItemInit (item) {
  const reviewsTextBox = item.querySelector('[data-element="reviews__text-box"]')
  const reviewsTextMore = item.querySelector('[data-element="reviews__text-more"]')
  reviewsTextMore.addEventListener("click", toggleReviewsTextBox)

  checkHeight()
  window.addEventListener("resize", checkHeight)

  function checkHeight() {
    if (reviewsTextBox.clientHeight > 200) {
      reviewsTextBox.classList.add("reviews__text-box_scroll")
      reviewsTextMore.classList.add("reviews__text-more_active")
    } else {
      reviewsTextBox.classList.remove("reviews__text-box_scroll")
      reviewsTextMore.classList.remove("reviews__text-more_active")
    }
  }

  function toggleReviewsTextBox () {
    if (reviewsTextBox.classList.contains("reviews__text-box_scroll-active")) {
      reviewsTextBox.classList.remove("reviews__text-box_scroll-active")
      reviewsTextMore.innerHTML = "Показать полностью"
      reviewsTextMore.classList.remove("reviews__text-more_reverse")
    } else {
      reviewsTextBox.classList.add("reviews__text-box_scroll-active")
      reviewsTextMore.innerHTML = "Свернуть"
      reviewsTextMore.classList.add("reviews__text-more_reverse")
    }
  }

}


