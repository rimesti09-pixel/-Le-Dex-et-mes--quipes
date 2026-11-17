const API_URL ="http://localhost:3000"

export async function request(method, route , body) {
const url =`${API_URL}${route}`;

 const response = await fetch(url, {
        method:method,
    headers: {
        "Content-Type": "application/json"
    },
    body: body !== undefined ? JSON.stringify(body) : undefined
    });   

if (! response.ok){
    throw new Error("Erreur API")
}
return await response.json();
}