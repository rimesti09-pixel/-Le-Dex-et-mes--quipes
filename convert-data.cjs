const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("data.js", "utf8");
const sandbox = {};

vm.runInNewContext(
  source.replace(/^const creatures\s*=/, "globalThis.creatures ="),
  sandbox
);

const creatures = sandbox.creatures.map((creature, index) => ({
  ...creature,
  number: creature.id,
  id: index + 1
}));

fs.writeFileSync("db.json", JSON.stringify({ creatures }, null, 2));

console.log(`${creatures.length} Digimon ajoutés dans db.json`);