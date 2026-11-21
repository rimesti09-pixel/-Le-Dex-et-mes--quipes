import {request} from "./api.js"

const grid = document.getElementById("grid");
async function changeCreatures(){
    const creatures=await request("GET","/creatures");
    console.log(creatures);
    grid.innerHTML = "";

creatures.forEach(creature => {
    console.log(creature.name);
    
});
}
 changeCreatures();