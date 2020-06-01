const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const pool = new Pool({
  user: 'japhet',
  host: 'localhost',
  database: 'little_amsterdam',
  password: 'password',
  port: 5432,
})

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

const addOrder = (req, res) => {
  pool.query('INSERT INTO orders (date, pizzatype) VALUES ($1, $2)', ['2020-05-29', 'chicken'],(error, result) => {
    if (error) {
      throw error
    }
  })
}
// addOrder();

app.listen(8000, () => {
  console.log('App listening on port 8000!')
});