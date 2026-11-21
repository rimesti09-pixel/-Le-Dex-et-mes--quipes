export  function saveFilter(type){
    localStorage.setItem("filter", type);
}
export function loadFilter(){
    return localStorage.getItem("filter") || "Tous";
}

export function saveDraft(draft){
    sessionStorage.setItem("draft", JSON.stringify(draft));
}
export function loadDraft(){
    const text = sessionStorage.getItem("draft");
    return text ? JSON.parse(text): null;

}
export function clearDraft() {
    sessionStorage.removeItem("draft");
}
