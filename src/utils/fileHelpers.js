//TODO: Remove this file after MongoDB communication is implemented.
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

function saveJSON(json) {
  const content = JSON.stringify(json);
  fs.writeFileSync(dataPath, content);
}

function getJSON() {
  const content = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(content);
}

module.exports = {saveJSON, getJSON};