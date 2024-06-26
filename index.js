const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router');
const app = express();
const port = 3333;


const items = [ 'pizza', 'burger', 'brownie', 'ice cream', 'hot-dog' ];
function logger(url) {
  console.log('Middleware logger, Request URL: ', url);
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/object', (req, res) => {
  res.json(items);
})

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html' ))
})

//middleware
app.get('/middle/:number', (req, res, next) => {
  logger(req.originalUrl)
  next()
}, (req, res) => {
  res.send(`middleware ${req.params.number}`)
})

app.use(bodyParser.json())
app.use(router);

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}/`);
})

