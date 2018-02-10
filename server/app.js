const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const PORT = process.env.PORT || 1234;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname + 'client')));

app.get('*', (req, res) => {
  res.send(process.env.PORT);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
