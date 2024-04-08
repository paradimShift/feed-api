const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const app = express();

const feeds = require('./routes/feeds');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/feeds', feeds);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('DramanCompany Memoapp API');
  console.log(`Now listening on port ${port}`);
});
