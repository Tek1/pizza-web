function eventList() {
  window.onunload = function() {
    const myInit =  {
      method: 'PUT',
    }
    fetch('/reset', myInit);
  }
  const buttons = document.querySelectorAll('button');
  let pizzaCounter = 0;
  buttons.forEach(item => {
    item.addEventListener('click', () => {
      pizzaCounter += 1;
      const myInit1 = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: item.value})
      }
      fetch('/append', myInit1).then(response => {
        return response.json();
      }).then(data => {
          document.querySelector(`p[id="${data.id}"]`).textContent = data.amount;
          document.querySelector('.final-number').textContent = " " + pizzaCounter;
          if (data.amount === 1) {
            document.querySelector('.inner-cart').innerHTML += `<p><span id=${data.name}>${data.amount}</span> ${data.name}</p>`;
            document.querySelector('.final-pizzas').style.display = 'inline';
            document.querySelector('.final-number').style.display = 'inline';
            document.querySelector('.make-order').style.display = 'block';
          }
          else {
            document.querySelector(`#${data.name}`).textContent = data.amount;
          }
          document.querySelector('.make-order').addEventListener('click', () => {
            document.querySelector('.make-order').style = 'disabled';
            document.querySelector('.order-message').style.display = 'block';
          });
      });
    });
  });
}

eventList();