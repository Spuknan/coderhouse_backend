/* let diasLaborables = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
let diasLaborablesMayus = [];

for (let i = 0; i < diasLaborables.length; i++) {
   let diaMayus = diasLaborables[i].toUpperCase();
   diasLaborablesMayus.push(diaMayus);
}

console.table(diasLaborablesMayus); */


let diasLaborables = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]

diasLaborables.forEach((valor, index, lista) => {
   lista[index] = valor.toUpperCase()
})

console.table(diasLaborables);