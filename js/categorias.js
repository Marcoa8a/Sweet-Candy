var categorias = [
    { id: 1, nombre: "Tres leches" },
    { id: 2, nombre: "Casero" }
];

window.onload = cargarEventos;

function cargarEventos() {
    document.getElementById("mostrarTabla").addEventListener("click", mostrar_tabla, false);
    document.getElementById("nuevaCategoria").addEventListener("submit", nuevaCat, false);
}

function mostrar_tabla(event){
    event.preventDefault();
    var cat = document.getElementById("categoriasTabla");
    var tablaCompleta = "";
 
     for(var i = 0; i<categorias.length; i++){
         tablaCompleta += "<tr><td>"+categorias[i].id+"</td><td>"+categorias[i].nombre+"</td></tr>";
     }
     cat.innerHTML = tablaCompleta;
  }



 function nuevaCat(event){
    event.preventDefault();
    var newId = document.getElementById("id").value;
    var newCat = document.getElementById("nombre").value;

    if (newId != null && newCat!=null){
        var nuevaCat = {id: newId, nombre: newCat};
        categorias.push(nuevaCat);
        alert("Categoria agregada correctamente!!!");
        nuevaCategoria.reset();
    }
 }
