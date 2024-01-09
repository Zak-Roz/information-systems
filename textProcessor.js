function processText(text) {
  return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
}

module.exports = {
  processText
};