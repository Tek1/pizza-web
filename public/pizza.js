class Model {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || {}
  }

  bindHandleOnCartChange(handler) {
    this.onCartChange = handler;
  }

  saveOrderType(orderType) {
    this.orderType = orderType;
  }

  addToCart(item, size, quantityPrice) {
    if (this.cart[item]) {
      if (this.cart[item][size]) {
        this.cart[item][size]['quantity'] += 1;
      } else {
        this.cart[item][size]['quantityPrice'] = quantityPrice;
        this.cart[item][size]['quantity'] = 1;
      }
    } else {
      this.cart[item] = {};
      this.cart[item][size] = {};
      this.cart[item][size]['quantityPrice'] = quantityPrice;
      this.cart[item][size]['quantity'] = 1;
    }
    this.onCartChange(this.cart);
  }

  subtractFromCart(item, size) {
    this.cart[item][size]['quantity'] -= 1;
    if (this.cart[item][size]['quantity'] === 0) {
      delete this.cart[item][size];
    }
    if (Object.keys(this.cart[item]).length === 0) {
      delete this.cart[item];
    }
    this.onCartChange(this.cart);
  }

  removeItem(item, size) {
    delete this.cart[item][size];
    this.onCartChange(this.cart);
  }

}

 class View {
  constructor() {
    this.summaryOrder = document.querySelector('.summary-order')
    this.summaryAmount = document.querySelector('.summary-amount')
    this.initListeners()
  }

  bindOrderOptions(handler) {
    this.handleOrderType = handler;
  }

  bindHandleAddToCart(handler) {
    this.handleAddToCart = handler;
  }

  bindHandleSubtractFromCart(handler) {
    this.handleSubtractFromCart = handler;
  }

  bindHandleRemoveItem(handler) {
    this.handleRemoveItem = handler;
  }

  displayCartItems(cart) {
    while(this.summaryOrder.firstChild) {
      this.summaryOrder.removeChild(this.summaryOrder.firstChild);
    }

    for (const item of Object.keys(cart)) {
      for (const size of Object.keys(cart[item])) {
        const itemLine = this.createElement('p');
        const itemCount = this.createElement('span');
        const itemNameAndSize = this.createElement('span');
        const addItem = this.createElement('i', 'fas', 'fa-plus-circle');
        addItem.addEventListener('click', () => {
          this.handleAddToCart(item, size);
        })
        const subtractItem = this.createElement('i', 'fas', 'fa-minus-circle');
        subtractItem.addEventListener('click', () => {
          this.handleSubtractFromCart(item, size);
        })
        const removeItem = this.createElement('i', 'fas', 'fa-times-circle');
        removeItem.addEventListener('click', () => {
          this.handleRemoveItem(item, size);
        })
        itemCount.textContent = ` ${cart[item][size]['quantity']}`;
        itemNameAndSize.textContent = ` ${size} ${item} `;
        itemLine.append(addItem, itemCount, subtractItem, itemNameAndSize, removeItem);
        this.summaryOrder.append(itemLine);
      }
    }
  }

  createElement(tag, firstClassName, secondClassName) {
   const element = document.createElement(tag);
   element.classList.add(firstClassName);
   element.classList.add(secondClassName);
   return element;
  }

  initListeners() {
    document.querySelectorAll('.order-option').forEach(button => {
      button.addEventListener('click', event => {
        const id = event.target.id;
          this.handleOrderType(id);
          this.hideOrderOptions();
          document.querySelector('.left-half').style.margin = '0px';
          document.querySelector('.cart').style.display = 'block';
      });
    });

    document.querySelectorAll('.item-button').forEach(button => {
      button.addEventListener('click', event => {
        const id = event.target.id;
        const selectValue = JSON.parse(document.getElementById(`${id}-size`).value)
        const size = selectValue['size'];
        const quantityPrice = selectValue['quantityPrice'];
        this.handleAddToCart(id, size, quantityPrice);
      });
    });
  }

  hideOrderOptions() {
    document.querySelector('.order-options').style.display = 'none';
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    //  explicit this binding.
    this.view.bindOrderOptions(this.handleOrderType)
    this.view.bindHandleAddToCart(this.handleAddToCart)
    this.view.bindHandleSubtractFromCart(this.handleSubtractFromCart);
    this.view.bindHandleRemoveItem(this.handleRemoveItem);
    this.model.bindHandleOnCartChange(this.handleOnCartChange)
    
    
    // display initial cart items
    this.view.displayCartItems(this.model.cart)

  }

  handleOnCartChange = cart => {
    this.view.displayCartItems(cart);
  } 

  handleOrderType = orderType => {
    this.model.saveOrderType(orderType)
  }

  handleAddToCart = (item, size, quantityPrice) => {
    this.model.addToCart(item, size, quantityPrice);
  }

  handleSubtractFromCart = (item, size) => {
    this.model.subtractFromCart(item, size);
  }

  handleRemoveItem = (item, size) => {
    this.model.removeItem(item, size);
  }
}

app = new Controller(new Model(), new View());