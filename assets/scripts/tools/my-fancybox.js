const fancyboxItems = document.querySelectorAll('[data-role="data-my-fancybox-item"]')

if (fancyboxItems) setTimeout(initMyFancybox, 0)

function initMyFancybox() {
  for (let i = 0; i < fancyboxItems.length; i++) {
    fancyboxItems[i].addEventListener('click', initOneFancybox)
  }
}

function initOneFancybox() {
  const name = this.getAttribute("data-my-fancybox-name")
  const items = document.querySelectorAll('[data-my-fancybox-name="' + name + '"]')
  createMyFancybox(items, this)
}

function createMyFancybox(children, currentItem) {
  const myFancybox = document.createElement("aside")
  myFancybox.classList.add("my-fancybox", "my-fancybox")
  myFancybox.setAttribute("data-role", "my-fancybox")
  const myFancyboxCont = createMyFancyboxCont(children)
  myFancybox.appendChild(myFancyboxCont)
  const body = document.getElementsByTagName("body")[0]
  body.appendChild(myFancybox)
  const fancybox = new fancyboxClass(myFancybox)
  fancybox.openFancybox(currentItem)
}

function createMyFancyboxCont(data) {
  const cont = document.createElement("div")
  cont.classList.add("my-fancybox__cont")
  const myFancyboxWrapper = createMyFancyboxWrapper(data)
  cont.appendChild(myFancyboxWrapper)
  return cont
}

function createMyFancyboxWrapper(data) {
  const myFancyboxWrapper = document.createElement("div")
  myFancyboxWrapper.classList.add("my-fancybox__wrapper")
  myFancyboxWrapper.setAttribute("data-role", "my-fancybox__wrapper")
  let myData = []
  for (let i = 0; i < data.length; i++) {
    const href = data[i].getAttribute("data-href")
    const type = data[i].getAttribute("data-my-fancybox-type")
    const text = data[i].getAttribute("data-caption")
    const myDataObject = {
      href: href,
      type: type,
      text: text
    }
    myData[i+1] = myDataObject
  }
  const stringData = JSON.stringify(myData)
  myFancyboxWrapper.setAttribute("data-info", stringData)
  const myFancyboxInner = document.createElement("div")
  myFancyboxInner.classList.add("my-fancybox__inner")
  myFancyboxWrapper.appendChild(myFancyboxInner)

  const menu = createMyFanciboxMenu(data)
  myFancyboxInner.appendChild(menu)

  const close = createMyFanciboxClose()
  myFancyboxInner.appendChild(close)
  const next = createMyFanciboxButton("next", data)
  const prev = createMyFanciboxButton("prev", data)
  myFancyboxInner.appendChild(next)
  myFancyboxInner.appendChild(prev)
  const area = createMyFanciboxArea(data)
  myFancyboxInner.appendChild(area)

  const listBox = createMyFanciboxListBox(data)
  myFancyboxWrapper.appendChild(listBox)
  return myFancyboxWrapper
}

function createMyFanciboxMenu(data) {
  const div = document.createElement("div")
  div.classList.add("my-fancybox__btn-menu")
  if (data.length === 1) div.classList.add("my-fancybox__btn-menu_hide")
  div.setAttribute("data-role", "my-fancybox__btn-menu")
  return div
}

function createMyFanciboxClose() {
  const div = document.createElement("div")
  div.classList.add("my-fancybox__btn-close")
  div.setAttribute("data-role", "my-fancybox__btn-close")
  return div
}

function createMyFanciboxButton(mod, data) {
  const div = document.createElement("div")
  div.classList.add("my-fancybox__button")
  if (data.length === 1) div.classList.add("my-fancybox__button_hide")
  div.classList.add(`my-fancybox__button_${mod}`)
  div.setAttribute("data-role", `my-fancybox-${mod}`)
  return div
}

function createMyFanciboxListBox(data) {
  const listBox = document.createElement("div")
  listBox.classList.add("my-fancybox__list-box")
  listBox.setAttribute("data-role", "my-fancybox__list-box")
  const list = createMyFanciboxList(data)
  const div = document.createElement("div")
  div.classList.add("my-fancybox__list-container")
  div.appendChild(list)
  listBox.appendChild(div)
  return listBox
}

function createMyFanciboxList(data) {
  const list = document.createElement('ul')
  list.classList.add("my-fancybox__list")
  for (let i = 0; i < data.length; i++) {
    const item = createMyFancyboxItem(data[i], i)
    list.appendChild(item)
  }
  return list
}

function createMyFancyboxItem(data, index) {
  const item = document.createElement("li")
  item.classList.add("my-fancybox__item")
  if (index === 1) item.classList.add("my-fancybox__item_active")
  item.setAttribute("data-index", `${index+1}`)
  const srcBig = data.getAttribute("data-href")
  item.setAttribute("data-src-big-image", srcBig)
  const text = data.getAttribute("data-caption")
  item.setAttribute("data-text", text)
  item.setAttribute("data-role", "my-fancybox__item")
  const picture = createMyFancyboxPicture(data)
  item.appendChild(picture)
  return item
}

function createMyFancyboxPicture(data) {
  const picture = document.createElement("picture")
  picture.classList.add("my-fancybox__picture")

  if (data.getAttribute("data-thumb-2x")) {
    const source = document.createElement("source")
    source.srcset = data.getAttribute("data-thumb") + ' 1x, ' + data.getAttribute("data-thumb-2x") + ' 2x'
    picture.appendChild(source)
  }

  if (data.getAttribute("data-my-fancybox-type") === "video") {
    picture.classList.add("my-fancybox__thumb-video")
  }

  const image = createMyFancyboxImage(data)
  picture.appendChild(image)
  return picture
}

function createMyFancyboxImage(data) {
  const image = document.createElement("img")
  image.classList.add("my-fancybox__image")
  image.src = data.getAttribute("data-thumb")
  image.setAttribute("loading", "lazy")
  return image
}

function createMyFanciboxArea(data) {
  const area = document.createElement('div')
  area.classList.add("my-fancybox__area")
  const box = createMyFancyboxBox(data[0])
  area.appendChild(box)
  return area
}

function createMyFancyboxBox(data) {
  const box = document.createElement("div")
  box.classList.add("my-fancybox__box")
  box.classList.add("my-fancybox__box_active")
  if (data.getAttribute("data-my-fancybox-type") === "video") {
    const iframe = createMyFancyboxIframeBoxBig(data)
    box.appendChild(iframe)
  } else {
    const picture = createMyFancyboxPictureBig(data)
    box.appendChild(picture)
  }
  const layer = createMyFancyboxLayer()
  box.appendChild(layer)

  const caption = data.getAttribute("data-caption")
  if (caption) {
    const p = createMyFanciboxText(caption)
    box.appendChild(p)
  }

  return box
}

function createMyFanciboxText(caption) {
  const p = document.createElement("p")
  p.classList.add("my-fancybox__text")
  p.setAttribute("data-role", "my-fancybox__text")
  p.innerHTML = caption
  return p
}

function createMyFancyboxLayer() {
  const div = document.createElement("div")
  div.classList.add("my-fancybox__layer")
  div.setAttribute("data-role", "my-fancybox-layer")
  return div
}

function createMyFancyboxPictureBig(data) {
  const picture = document.createElement("picture")
  picture.classList.add("my-fancybox__picture-big")
  picture.classList.add("my-fancybox__picture-big_loading")
  picture.setAttribute("data-role", "my-fancybox__picture-big")
  const image = createMyFancyboxImageBig(data)
  picture.appendChild(image)
  return picture
}

function createMyFancyboxIframeBoxBig(data) {
  const box = document.createElement("div")
  box.classList.add("my-fancybox__picture-big")
  box.classList.add("my-fancybox__picture-big_loading")
  box.classList.add("my-fancybox__iframe-box")
  box.addEventListener("click", playFrame)

  function playFrame() {
    const frame = box.getElementsByClassName("my-fancybox__iframe")[0]
    frame.contentWindow.postMessage(JSON.stringify({ event: 'command',
    func: 'playVideo' }), '*')
    box.classList.add("my-fancybox__iframe-box_play")
  }

  box.setAttribute("data-role", "my-fancybox__picture-big")
  const iframe = createMyFancyboxIframeBig(data)
  box.appendChild(iframe)
  return box
}

function createMyFancyboxIframeBig(data) {
  const iframe = document.createElement("iframe")
  iframe.classList.add("my-fancybox__image-big")
  iframe.setAttribute("data-role","my-fancybox__iframe-big")
  iframe.classList.add("my-fancybox__iframe")
  iframe.src = data.getAttribute("data-href")
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
  iframe.setAttribute("allowfullscreen", true)
  return iframe
}

function createMyFancyboxImageBig(data) {
  const image = document.createElement("img")
  image.classList.add("my-fancybox__image-big")
  image.setAttribute("data-role","my-fancybox__image-big")
  image.src = data.getAttribute("data-href")
  image.setAttribute("loading", "lazy")
  return image
}

let fancyboxFunctionBindLink
let myTimer
let coordPrev
let coordNext
let myClass
class fancyboxClass {
  constructor (myFancybox) {
    myClass = this
    this.fancybox = myFancybox
    this.wrapper = this.fancybox.querySelector('[data-role="my-fancybox__wrapper"]')
    this.data = JSON.parse(this.wrapper.getAttribute("data-info"))
    this.layer = this.fancybox.querySelectorAll('[data-role="my-fancybox-layer"]')
    for (let i = 0; i < this.layer.length; i++) {
      this.layer[i].addEventListener('click', this.closeFancybox)
    }
    this.btnMenu = this.fancybox.querySelector('[data-role="my-fancybox__btn-menu"]')
    this.btnMenu.addEventListener('click', this.toggleMenu)
    this.btnClose = this.fancybox.querySelector('[data-role="my-fancybox__btn-close"]')
    this.btnClose.addEventListener('click', this.closeFancybox)
    this.fancyboxItems = this.fancybox.querySelectorAll('[data-role="my-fancybox__item"]')
    for (let i = 0; i < this.fancyboxItems.length; i++) {
      this.fancyboxItems[i].addEventListener('click', () => this.toggleItem(this.fancyboxItems[i]))
    }
    this.prev = this.fancybox.querySelector('[data-role="my-fancybox-prev"]')
    this.next = this.fancybox.querySelector('[data-role="my-fancybox-next"]')
    this.prev.addEventListener('click', () => this.prevFancybox())
    this.next.addEventListener('click', () => this.nextFancybox())

    this.picturesBig = this.fancybox.querySelectorAll('[data-role="my-fancybox__picture-big"]')
    for (let i = 0; i < this.picturesBig.length; i++) {
      const image = this.picturesBig[i].getElementsByClassName("my-fancybox__image-big")[0]
      image.addEventListener("touchstart", this.showTextAndArrows, {passive: true})
      image.addEventListener("touchend", this.svipeEnd, {passive: true})
      image.addEventListener("touchmove", this.svipeSlide, {passive: true})
    }

    this.imagesBig = this.fancybox.querySelectorAll('[data-role="my-fancybox__image-big"]')
    for (let i = 0; i < this.imagesBig.length; i++) {
      this.imagesBig[i].addEventListener("load", this.deleteLoadCircle)
    }

    this.iframesBig = this.fancybox.querySelectorAll('[data-role="my-fancybox__iframe-big"]')
    for (let i = 0; i < this.iframesBig.length; i++) {
      this.iframesBig[i].addEventListener("load", this.deleteLoadCircle)
    }
  }

  deleteLoadCircle(event) {
    event.currentTarget.parentElement.classList.remove("my-fancybox__picture-big_loading")
  }

  svipeEnd(event) {
    const boxActive = document.querySelector('.my-fancybox__box_active')
    const item = boxActive.querySelector('.my-fancybox__picture-big')
    const image = item.getElementsByClassName("my-fancybox__image-big")[0]
    let coord1 = image.style.transform.slice(0, -3)
    let coord2 = coord1.slice(11)
    if (coord2 > 50) {
      myClass.animationSvipeRight()
      setTimeout(myClass.prevFancybox, 500)
    } else if (coord2 < -50) {
      myClass.animationSvipeLeft()
      setTimeout(myClass.nextFancybox, 500)
    } else {
      image.style.transform = "translateX(0px)"
    }
  }

  animationSvipeRight() {
    const boxActive = myClass.fancybox.querySelector('.my-fancybox__box_active')
    const item = boxActive.querySelector('.my-fancybox__picture-big')
    const image = item.getElementsByClassName("my-fancybox__image-big")[0]
    image.style.transform = "translateX(1000px)"
  }

  animationSvipeLeft() {
    const boxActive = myClass.fancybox.querySelector('.my-fancybox__box_active')
    const item = boxActive.querySelector('.my-fancybox__picture-big')
    const image = item.getElementsByClassName("my-fancybox__image-big")[0]
    image.style.transform = "translateX(-1000px)"
  }

  svipeSlide(event) {
    const boxActive = document.querySelector('.my-fancybox__box_active')
    const item = boxActive.querySelector('.my-fancybox__picture-big')
    const image = item.getElementsByClassName("my-fancybox__image-big")[0]
    coordNext = event.touches[0].clientX
    image.style.transform = "translateX(" + (coordNext - coordPrev) + "px)"
  }

  showTextAndArrows(event) {
    coordPrev = event.touches[0].clientX
    clearTimeout(myTimer)
    const prev = document.querySelector('[data-role="my-fancybox-prev"]')
    const next = document.querySelector('[data-role="my-fancybox-next"]')

    const boxActive = document.querySelector('.my-fancybox__box_active')
    const text = boxActive.querySelector('[data-role="my-fancybox__text"]')
    prev.classList.add("my-fancybox__button_show")
    next.classList.add("my-fancybox__button_show")
    if (text) text.classList.add("my-fancybox__text_show")

    myTimer = setTimeout(hide, 3000)

    function hide() {
      prev.classList.remove("my-fancybox__button_show")
      next.classList.remove("my-fancybox__button_show")
      if (text) text.classList.remove("my-fancybox__text_show")
    }
  }

  prevFancybox() {
    const oldActiveItem = myClass.fancybox.getElementsByClassName('my-fancybox__item_active')[0]
    const index = oldActiveItem.getAttribute('data-index')
    let newIndex = index - 1
    if (newIndex === 0) newIndex = myClass.fancyboxItems.length
    const newActiveItem = myClass.fancybox.querySelector('[data-index="' + newIndex + '"]')
    myClass.animationSvipe()

    myClass.toggleItem(newActiveItem)
  }

  animationSvipe() {
    const image = myClass.fancybox.querySelector('[data-role="my-fancybox__image-big"]')
    image.style.transitionDuration = "0s"
    image.style.transform = ""
    setTimeout(qwe, 100)
    function qwe() {
      image.style.transitionDuration = ".5s"
    }
  }

  nextFancybox() {
    const oldActiveItem = myClass.fancybox.getElementsByClassName('my-fancybox__item_active')[0]
    const index = oldActiveItem.getAttribute('data-index')
    let newIndex = +index + 1
    if (newIndex === myClass.fancyboxItems.length + 1) newIndex = 1
    const newActiveItem = myClass.fancybox.querySelector('[data-index="' + newIndex + '"]')

    myClass.animationSvipe()

    myClass.toggleItem(newActiveItem)
  }

  toggleItem(node) {

    const oldActiveSmallItem = this.fancybox.getElementsByClassName('my-fancybox__item_active')[0]
    if (oldActiveSmallItem) oldActiveSmallItem.classList.remove('my-fancybox__item_active')
    node.classList.add('my-fancybox__item_active')
    const index = node.getAttribute('data-index')
    const data = this.data[index]
    const box = this.fancybox.getElementsByClassName('my-fancybox__box_active')[0]
    const image = box.getElementsByClassName("my-fancybox__image-big")[0]
    image.src = data.href
    const text = box.getElementsByClassName("my-fancybox__text")[0]
    if (text) text.innerHTML = data.text
    this.stopPlayingVideo()
  }

  stopPlayingVideo() {
    const playingVideo = this.fancybox.getElementsByClassName("my-fancybox__iframe-box_play")[0]
    if (playingVideo) {
      const frame = playingVideo.getElementsByClassName("my-fancybox__iframe")[0]
      frame.contentWindow.postMessage(JSON.stringify({ event: 'command',
        func: 'stopVideo' }), '*')
      playingVideo.classList.remove("my-fancybox__iframe-box_play")
    }
  }

  openFancybox(currentItem) {
    let currentIndex = 0
    const currentHref = currentItem.getAttribute("data-thumb")

    for (let i = 0; i < this.fancyboxItems.length; i++) {
      if (this.fancyboxItems[i].getElementsByTagName("img")[0].getAttribute("src") === currentHref) {
        currentIndex = i + 1
        break
      }
    }
    const activeItem = this.fancybox.querySelector('[data-index="' + currentIndex + '"]')
    this.toggleItem(activeItem)
    this.fancybox.classList.add('my-fancybox_open')
    setTimeout(setOpacityVisible, 0)
    const fancybox = this.fancybox
    function setOpacityVisible() {
      fancybox.classList.add('my-fancybox_open-opacity')
    }
    fancyboxFunctionBindLink = this.eventCloseFromESC.bind(this)
    window.addEventListener('keydown', fancyboxFunctionBindLink)
  }

  closeFancybox() {
    window.removeEventListener('keydown', fancyboxFunctionBindLink)
    const openFancybox = document.getElementsByClassName('my-fancybox_open')[0]
    openFancybox.classList.remove('my-fancybox_open-opacity')
    setTimeout(hideDisplay, 300)
    function hideDisplay() {
      openFancybox.classList.remove('my-fancybox_open')
      const myFancybox = document.querySelector('[data-role="my-fancybox"]')
      myFancybox.remove()
    }
  }

  toggleMenu() {
    const menu = document.querySelector('[data-role="my-fancybox__list-box"]')
    if (menu.classList.contains("my-fancybox__list-box_show")) {
      menu.classList.remove("my-fancybox__list-box_show")
    } else {
      menu.classList.add("my-fancybox__list-box_show")
    }
  }

  eventCloseFromESC (event) {
    if (event.code === 'Escape') this.closeFancybox()
    else if (event.code === 'ArrowRight') this.nextFancybox()
    else if (event.code === 'ArrowLeft') this.prevFancybox()
  }
}
