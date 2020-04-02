const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let pizzas = [
  {id: 0, name: 'pepperoni', amount: 0},
  {id: 1, name: 'margherita', amount: 0},
  {id: 2, name: 'bbq_chicken', amount: 0}
]


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("second load");
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// app.post('/pizza', (req, res) => {
//   fs.appendFile('mypizzafile.txt', 'Hii there', function (err) {
//     if (err) throw err;
//   });
//   res.status(200).end();
// });

app.put('/reset', (req, res) => {
  console.log('it logs')
  pizzas.forEach(x => {
    return x.amount = 0;
  });
  res.status(200).end();
})

app.post('/append', (req, res) => {
  pizzas[req.body.value].amount += 1; 
  res.status(200)
  res.send(pizzas[req.body.value]);
})

app.listen(8000, () => {
  console.log('App listening on port 8000!')
});