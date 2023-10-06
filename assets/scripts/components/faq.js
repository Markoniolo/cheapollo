const faq = document.querySelector('[data-element="faq"]')

if (faq) setTimeout(faqInit, 0)

function faqInit () {
  const faqSubtitles = faq.querySelectorAll('[data-element="faq__subtitle"]')
  for (let i = 0; i < faqSubtitles.length; i++) {
    faqSubtitles[i].addEventListener("click", toggleFaq)
  }
}

function toggleFaq() {
  if (this.classList.contains("faq__subtitle_active")) {
    this.classList.remove("faq__subtitle_active")
  } else {
    this.classList.add("faq__subtitle_active")
  }
}
