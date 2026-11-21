const API_URL ="http://localhost:3000"

export async function request(method, route , body) {
const url =`${API_URL}${route}`;

 const response = await fetch(`${API_URL}${route}`,{
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: body !== undefined ? JSON.stringify(body) : undefined
    });   

if (! response.ok){
    const error= new Error("Erreur API");
    error.status = response.status;
    throw error
}
if (response.status === 204){
    return null;
}
 const text = await response.text();
 return text ? JSON.parse(text): null;
}
export function getCreatures(params = {}) {
    const query = new URLSearchParams();

    if (params.type) query.set("type", params.type);
    if (params.q) query.set("q", params.q);
    if (params.sort) query.set("_sort", params.sort);
    if (params.order) query.set("_order", params.order);

    const queryString = query.toString();

    return request(
        "GET",
        `/creatures${queryString ? `?${queryString}` : ""}`
    )
}

 export function getCreature(id){
    return request("GET",`/creatures/${id}`);
 }

 export function createCreature(data){
    return request("POST","/creatures", data);
 }
  
 export function updateCreature(id, data){
    return request ("PUT",`/creatures/${id}`,data);

 }
 export function deleteCreature(id){
    return request("DELETE",`/creatures/${id}`);
 }