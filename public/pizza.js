function eventList() {
  window.onunload = loadSummary();
  
  function loadSummary() { 
    const summaryPizza = document.querySelector('.summary-pizza');
    const localStoragePizza = JSON.parse(localStorage.getItem('pizzas'));
    for (const pizzaType in localStoragePizza) {
      const counterElement = document.createElement('p');
      const trashButton = document.createElement('i');
      trashButton.classList.add('fas');
      trashButton.classList.add('fa-trash-alt');
      trashButton.classList.add(pizzaType);
      
      counterElement.classList.add(`${pizzaType}-count`);
      if (document.querySelector(`.${pizzaType}-count`)) {
        document.querySelector(`.${pizzaType}-count`).textContent = `${pizzaType[0].toUpperCase()}${pizzaType.slice(1)} x ${localStoragePizza[pizzaType]}`;
        document.querySelector(`.${pizzaType}-count`).appendChild(trashButton);
        if (localStoragePizza[pizzaType] === 0) {
          document.querySelector(`.${pizzaType}`).style.display = 'none';
        }
        trashButton.addEventListener('click', (e) => {
          const deleteOnePizza = e.target.parentElement.className.split('-')[0];
          const pizza = JSON.parse(localStorage.getItem('pizzas'));
          pizza[deleteOnePizza] -= 1;
          localStorage.setItem('pizzas', JSON.stringify(pizza));
          loadSummary();
          if (pizza[deleteOnePizza] === 0) {
            document.querySelector(`.${deleteOnePizza}`).style.display = 'none';
          } 
        });
      } else {
        counterElement.textContent = `${pizzaType[0].toUpperCase()}${pizzaType.slice(1)} x ${localStoragePizza[pizzaType]}`;
        counterElement.appendChild(trashButton);
        summaryPizza.appendChild(counterElement);
        // loadSummary();
        document.querySelector('.make-order').style.display = 'block';
        document.querySelector('.summary-amount').style.display = 'block';
        let totalOrder = 0;
        for (const item in localStoragePizza) {
          totalOrder += localStoragePizza[item];
        }
        // document.querySelector('.summary-amount').textContent += ' ' totalOrder;
      }
    }
  }

  const pizzaButtons = document.querySelectorAll('.button');
  pizzaButtons.forEach(element => {
    element.addEventListener('click', (event) => {
      const localStoragekey = event.target.className.split('-')[0];
      if (!(JSON.parse(localStorage.getItem('pizzas')))) {
        localStorage.setItem('pizzas', JSON.stringify({}));
      }
      if (!((JSON.parse(localStorage.getItem('pizzas')))[localStoragekey])) {
        const pizzas = JSON.parse(localStorage.getItem('pizzas'));
        pizzas[localStoragekey] = 1;
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
      } else {
        const pizzas = JSON.parse(localStorage.getItem('pizzas'));
        pizzas[localStoragekey] += 1;
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
      }
      loadSummary();
    });
  });
  
  const makeOrder = document.querySelector('.make-order');
  makeOrder.addEventListener('click', () => {

  })

}

eventList();
