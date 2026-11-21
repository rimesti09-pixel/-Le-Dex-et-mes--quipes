
const grid = document.getElementById("grid");
const status = document.getElementById("status");
const detail = document.getElementById("detail");
const form = document.getElementById("creature-form");
const formMessage = document.getElementById("form-message");

const fields = ["number", "name", "type", "level", "stat1", "stat2", "stat3", "image", "description"];

export function showStatus(message) {
  status.textContent = message;
}

 export function renderCreatures(creatures, onClickCard){
    grid.innerHTML="";

    if(creatures.length === 0){
        showStatus("Aucune créature ne correspond ");
        return;
    }
    showStatus("");
creatures.forEach(creature => {
   const card = document.createElement("article");
   card.className="flex w-full flex-col gap-3 rounded-card bg-white p-4 shadow-sm border border-line";
   const number = document.createElement("p");
    number.textContent = creature.number;

    const img = document.createElement("img");
    img.src = creature.image;
    img.alt = creature.name;
    img.className = "h-36 w-full object-contain";

    const name = document.createElement("h3");
    name.textContent = creature.name;
    name.className = "font-display text-xl font-semibold";

    const type = document.createElement("span");
    type.textContent = creature.type;
    type.className = "rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-dark";

    card.append(number, img, name, type);
    card.addEventListener("click", () => onClickCard(creature.id));
    grid.append(card);
  });
}

export function showDetailMessage(message){
    detail.innerHTML="";
    const p =document.createElement("p");
    p.textContent = message;
    detail.append(p)
}
export function showDetail(c, onEdit, onDelete) {
  detail.innerHTML = "";

  const img = document.createElement("img");
  img.src = c.image;
  img.alt = c.name;
  img.className = "h-48 w-full object-contain";

  const title = document.createElement("h2");
  title.textContent = c.name + " (" + c.type + ")";
  title.className = "text-3xl font-extrabold";

  const description = document.createElement("p");
  description.textContent = c.description;

  const stats = document.createElement("p");
  stats.textContent = "PV: " + c.stats.hp + " | Attaque: " + c.stats.attack + " | Défense: " + c.stats.defence;

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Modifier";
  editButton.className = "bg-brand text-white font-bold py-2 rounded-xl";
  editButton.addEventListener("click", () => onEdit(c));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Supprimer";
  deleteButton.className = "border-2 border-ink font-bold py-2 rounded-xl";
  deleteButton.addEventListener("click", () => onDelete(c));

  detail.append(img, title, description, stats, editButton, deleteButton);
}

export function readForm(){
    const data ={};
    fields.forEach(name=>{
        data[name]=form.elements[name].value;
    });
    return data;
}

export function fillForm(data) {
  fields.forEach(name => {
    form.elements[name].value = data[name];
  });
}


export function showErrors(errors){
    fields.forEach(name=>{
        const span=form.elements[name].parentElement.querySelector(".error-message");
        span.textContent= errors[name] || "";
        
    });
}

export function setButtonDisabled(disabled){
    form.querySelector("[type=submit]").disabled = disabled;
}
export function showFormMessage(message, isError) {
  formMessage.textContent = message;
  formMessage.className = isError
    ? "md:col-span-2 lg:col-span-4 font-bold text-red-600"
    : "md:col-span-2 lg:col-span-4 font-bold text-green-600";
}