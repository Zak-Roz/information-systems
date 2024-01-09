const express = require('express');
const bodyParser = require('body-parser');
const indexer = require('./indexer');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/indexfile', (req, res) => {
  const filePath = req.body.filePath;
  if (!filePath) {
    return res.status(400).send('File path is required.');
  }

  indexer.indexFile(filePath);
  res.send(`Indexing started for file: ${filePath}`);
});

app.get('/query/:word', (req, res) => {
  const word = req.params.word;
  const index = indexer.getIndex();
  
  if (index[word]) {
    return res.json(index[word]);
  } else {
    return res.status(404).send(`No entries found for word: ${word}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
