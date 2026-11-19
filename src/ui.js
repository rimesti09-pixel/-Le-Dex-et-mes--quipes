 function renderCreatures(creatures){
creatures.forEach(creature => {
console.log(creature.name)
const card = document.createElement("article");
card.className="flex w-full flex-col gap-3 rounded-card bg-white p-4 shadow-sm border border-line";
});
 }