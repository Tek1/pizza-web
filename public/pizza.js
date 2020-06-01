function eventList() {
  window.onunload = loadSummary();
  function loadSummary() { 
    const summaryPizza = document.querySelector('.summary-pizza');
    const localStoragePizza = JSON.parse(localStorage.getItem('pizzas'));
    for (const pizzaType in localStoragePizza) {
      if (localStoragePizza[pizzaType] === 0) {
        return;
      }
    }
    for (const pizzaType in localStoragePizza) {
      if(!document.querySelector(`.${pizzaType}-summary`)) {
        const summaryElement = document.createElement('p');
        const counterElement = document.createElement('span');
        const trashButton = document.createElement('i'); 
        summaryElement.classList.add(`${pizzaType}-summary`);
        counterElement.classList.add(`${pizzaType}-counter`);
        trashButton.classList.add('fas');
        trashButton.classList.add('fa-trash-alt');
        trashButton.classList.add(pizzaType);
        trashButton.addEventListener('click', (e) => {
          const deleteOnePizza = e.target.parentElement.className.split('-')[0];
          const pizza = JSON.parse(localStorage.getItem('pizzas'));
          pizza[deleteOnePizza] -= 1;
          localStorage.setItem('pizzas', JSON.stringify(pizza));
          document.querySelector(`.${pizzaType}-counter`).textContent = pizza[pizzaType];
          if (pizza[pizzaType] === 0) {
            document.querySelector(`.${pizzaType}-summary`).remove();
          }
        });
        summaryElement.classList.add(`${pizzaType}-summary`);
        counterElement.classList.add(`${pizzaType}-counter`);
        counterElement.textContent = localStoragePizza[pizzaType]; 
        summaryElement.textContent = `${pizzaType[0].toUpperCase()}${pizzaType.slice(1)} x`;
        summaryElement.appendChild(counterElement);
        summaryElement.appendChild(trashButton);
        summaryPizza.appendChild(summaryElement);
        
      } else {
        document.querySelector(`.${pizzaType}-counter`).textContent = localStoragePizza[pizzaType]; 
      }
      

        // let totalOrder = 0;
        // for (const item in localStoragePizza) {
        //   totalOrder += localStoragePizza[item];
        // }
      
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

  });

}

eventList();
