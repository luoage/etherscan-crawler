const express = require('express');
require('express-async-errors');
const etherscanService = require('./services/etherscanService');

const app = express();

app.get('/api/txs', etherscanService.getTransactions);

// collect global errors
app.use((err, req, res, next) => {
  if (err) {
    return res.json({
      code: 1,
      msg: err.message,
    });
  }
  next();
});

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Blocklet app listening on port ${port}`);
});
