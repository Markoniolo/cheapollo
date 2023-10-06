const about = document.querySelector('[data-element="about"]')

if (about) setTimeout(aboutInit, 0)

function aboutInit() {
  const aboutTable = about.querySelector('[data-element="about__table"]')
  const aboutTableMore = about.querySelector('[data-element="about__table-more"]')
  aboutTableMore.addEventListener("click", toggleAboutTable)

  if (aboutTable.clientHeight > 200) {
    aboutTable.classList.add("about__table_scroll")
    aboutTableMore.classList.add("about__table-more_active")
  }

  function toggleAboutTable () {
    if (aboutTable.classList.contains("about__table_scroll-active")) {
      aboutTable.classList.remove("about__table_scroll-active")
      aboutTableMore.innerHTML = "Показать всё"
      aboutTableMore.classList.remove("about__table-more_reverse")
    } else {
      aboutTable.classList.add("about__table_scroll-active")
      aboutTableMore.innerHTML = "Свернуть"
      aboutTableMore.classList.add("about__table-more_reverse")
    }
  }
}
