function statOk(value){
    const n = Number(value);
    return Number.isInteger(n)&& n>= 1 && n<=255;
}

export function validateCreature(data){
    const errors = {};
      if (data.name.trim() === "") errors.name = "Le nom est obligatoire.";
  if (data.type === "") errors.type = "Choisis un type.";
  if (!statOk(data.stat1)) errors.stat1 = "Entre 1 et 255.";
  if (!statOk(data.stat2)) errors.stat2 = "Entre 1 et 255.";
  if (!statOk(data.stat3)) errors.stat3 = "Entre 1 et 255.";
  return errors;

}