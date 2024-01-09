const fs = require('fs');
const textProcessor = require('./textProcessor');

let index = {};

function addToIndex(word, filename) {
  if (!index[word]) {
    index[word] = {};
  }
  if (!index[word][filename]) {
    index[word][filename] = 0;
  }
  index[word][filename]++;
}

function indexFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const processedText = textProcessor.processText(data);

    const words = processedText.split(/\s+/);
    words.forEach(word => {
      if (word) {
        addToIndex(word, filePath);
      }
    });
  });
}

function getIndex() {
  return index;
}

module.exports = {
  indexFile,
  getIndex
};
