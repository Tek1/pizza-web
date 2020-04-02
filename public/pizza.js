function eventList() {
  const butts = document.querySelectorAll('button');
  
  butts.forEach(item => {
    item.addEventListener('click', () => {
      const myInit = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: item.id})
      }
      fetch('/append', myInit).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
      })
    })
  })
}

eventList();