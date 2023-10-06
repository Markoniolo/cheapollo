export const Basket = {
  clean () { localStorage.removeItem('basket') },

  setBasket (products) {
    localStorage.setItem('basket', products)
  },

  getProducts () {
    let products = localStorage.getItem('basket')

    if (products) {
      products = JSON.parse(products)
      return products
    }

    products = []
    localStorage.setItem('basket', JSON.stringify(products))

    return []
  },

  getCountProducts () {
    return this.getProducts().length
  },

  checkProduct (id) {
    return this.getProducts().includes(+id)
  },

  refreshCounts (count) {
    const countElements = document.querySelectorAll('[data-basket-count]')
    count = count > 99 ? 'many' : count

    for (let i = 0; i < countElements.length; i++) {
      const element = countElements[i]
      element.dataset.basketCount = count
    }
  },

  refreshHtmlCountProducts () {
    const count = this.getCountProducts()
    this.refreshCounts(count)
  },

  addProduct: async function (productId, fall, done) {
    const data = new FormData
    data.append('id', productId)

    const response = await fetch('/product/add-to-cart', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(data => {
      Basket.setBasket(JSON.stringify(data))
      Basket.refreshHtmlCountProducts()
      done()
    }).catch((error) => {
      console.error('Error:', error);
    });
  },

  removeProduct: async function (productId) {
    const data = new FormData
    data.append('id', productId)

    const response = await fetch('/product/remove-from-cart', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(data => {
      Basket.setBasket(JSON.stringify(data))
      Basket.refreshHtmlCountProducts()
      done()
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}

Basket.refreshHtmlCountProducts()

if (sessionStorage.getItem('first') !== '1') {
  if (Basket.getCountProducts() > 0) {
    let data = new FormData
    data.append('products', JSON.stringify(Basket.getProducts()))

    let request = new XMLHttpRequest()
    request.open('POST', '/cart/cart-recovery', true)
    request.send(data)
  }

  sessionStorage.setItem('first', '1')
}
