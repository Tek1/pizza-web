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

  addToCart(item, size) {
    if (this.cart[item]) {
      if (this.cart[item][size]) {
        this.cart[item][size] += 1;
      } else {
        this.cart[item][size] = 1;
      }
    } else {
      this.cart[item] = {};
      this.cart[item][size] = 1;
    }
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
    this.handleOrderType = handler
  }

  bindHandleAddToCart(handler) {
    this.handleAddToCart = handler
  }

  displayCartItems(cart) {
    while(this.summaryOrder.firstChild) {
      this.summaryOrder.removeChild(this.summaryOrder.firstChild);
    }

    for (const item of Object.keys(cart)) {
      for (const size of Object.keys(cart[item])) {
        const itemLine = document.createElement('p');
        const itemCount = document.createElement('span');
        const itemNameAndSize = document.createElement('span');
        const addItem = document.createElement('i');
        const subtractItem = document.createElement('i');
        addItem.classList.add('fas');
        addItem.classList.add('fa-plus-circle');
        subtractItem.classList.add('fas');
        subtractItem.classList.add('fa-minus-circle') 
        itemCount.textContent = ` ${cart[item][size]}`;
        itemNameAndSize.textContent = ` ${size} ${item}`;
        itemLine.append(addItem, itemCount, subtractItem, itemNameAndSize);
        this.summaryOrder.append(itemLine);
      }
    }
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
        const size = document.getElementById(`${id}-size`).value;
        this.handleAddToCart(id, size);
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

  handleAddToCart = (item, size) => {
    this.model.addToCart(item, size);
  }
}

app = new Controller(new Model(), new View());