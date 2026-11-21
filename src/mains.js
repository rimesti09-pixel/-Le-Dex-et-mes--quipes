import { getCreatures, getCreature, createCreature, updateCreature, deleteCreature } from "./api.js";
import { validateCreature } from "./rules.js";
import { saveFilter, loadFilter, saveDraft, loadDraft, clearDraft } from "./storage.js";
import * as ui from "./ui.js";

let currentType = loadFilter();
let currentSearch = "";
let currentSort = "id";
let currentOrder = "asc";
let editingId = null;

const form = document.getElementById("creature-form");
const filters = document.getElementById("filters");


async function loadCreatures() {
  ui.showStatus("Chargement…");
  try {
    const creatures = await getCreatures({
      type: currentType === "Tous" ? "" : currentType,
      q: currentSearch,
      sort: currentSort,
      order: currentOrder,
    });
    ui.renderCreatures(creatures, openDetail);
  } catch (error) {
    ui.showStatus("Impossible de joindre l'API. Lance json-server.");
  }
}


async function openDetail(id) {
  ui.showDetailMessage("Chargement…");
  try {
    const creature = await getCreature(id);
    ui.showDetail(creature, startEdit, removeCreature);
  } catch (error) {
    if (error.status === 404) {
      ui.showDetailMessage("Créature introuvable");
    } else {
      ui.showDetailMessage("Erreur : l'API ne répond pas.");
    }
  }
}


function startEdit(c) {
  editingId = c.id;
  ui.fillForm({
    number: c.number,
    name: c.name,
    type: c.type,
    level: c.level,
    stat1: c.stats.hp,
    stat2: c.stats.attack,
    stat3: c.stats.defence,
    image: c.image,
    description: c.description,
  });
  document.getElementById("create").scrollIntoView();
}


async function removeCreature(c) {
  if (confirm("Supprimer " + c.name + " ?") === false) {
    return;
  }
  try {
    await deleteCreature(c.id);
    ui.showDetailMessage("Créature supprimée.");
    loadCreatures();
  } catch (error) {
    ui.showDetailMessage("Erreur lors de la suppression.");
  }
}


function markActiveFilter() {
  filters.querySelectorAll("button").forEach(button => {
    if (button.textContent === currentType) {
      button.classList.add("bg-ink", "text-white");
    } else {
      button.classList.remove("bg-ink", "text-white");
    }
  });
}

filters.addEventListener("click", event => {
  if (event.target.tagName !== "BUTTON") return;
  currentType = event.target.textContent;
  saveFilter(currentType);
  markActiveFilter();
  loadCreatures();
});


document.getElementById("search").addEventListener("input", event => {
  currentSearch = event.target.value.trim();
  loadCreatures();
});

document.getElementById("sort").addEventListener("change", event => {
  const parts = event.target.value.split("|");
  currentSort = parts[0];
  currentOrder = parts[1];
  loadCreatures();
});


form.addEventListener("input", () => {
  if (editingId === null) {
    saveDraft(ui.readForm());
  }
});

form.addEventListener("submit", async event => {
  event.preventDefault();

  const data = ui.readForm();
  const errors = validateCreature(data);
  ui.showErrors(errors);
  if (Object.keys(errors).length > 0) return;

  const creature = {
    number: data.number,
    name: data.name.trim(),
    type: data.type,
    level: data.level,
    stats: {
      hp: Number(data.stat1),
      attack: Number(data.stat2),
      defence: Number(data.stat3),
    },
    image: data.image,
    description: data.description,
  };

  ui.setButtonDisabled(true);
  try {
    if (editingId === null) {
      await createCreature(creature);
      ui.showFormMessage("Digimon ajouté !", false);
    } else {
      creature.id = editingId;
      await updateCreature(editingId, creature);
      ui.showFormMessage("Digimon modifié !", false);
    }
    clearDraft();
    editingId = null;
    form.reset();
    loadCreatures();
  } catch (error) {
    ui.showFormMessage("Erreur : l'API ne répond pas.", true);
  }
  ui.setButtonDisabled(false);
});

form.addEventListener("reset", () => {
  editingId = null;
  clearDraft();
  ui.showErrors({});
});

const draft = loadDraft();
if (draft !== null) {
  ui.fillForm(draft);
}
markActiveFilter();
loadCreatures();