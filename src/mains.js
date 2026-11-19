import { request } from "./api.js"

export {request} from"./api.js"

async function changeCreatures(){
    const creatures=await request("GET,/creatures");
    console.log(creatures);
}