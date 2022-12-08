var wishList = [
    {
        imagen: "https://i.postimg.cc/X71pRz46/Pastel9.jpg",
        descripcion: "Blue Ocean Cake",
        precio: "$720.00"
    },
    {
        imagen: "https://i.postimg.cc/mZN95jPT/Pastel6.jpg",
        descripcion: "Pink Cake",
        precio: "$400.00"
    },
    {
        imagen: "https://i.postimg.cc/NFp5fNXT/Pastel4.jpg",
        descripcion: "Super Mario Cake",
        precio: "$800.00"
    },
    {
        imagen: "https://i.postimg.cc/BQmKqv5y/Pastel2.jpg",
        descripcion: "Baby Cake",
        precio: "$500.00"
    }/*,
    {
        imagen: "https://i.postimg.cc/4NfckccV/Pastel7.jpg",
        descripcion: "Our History Cake",
        precio: "$1000.00"
    }*/
];

window.onload = cargarEventos;

function cargarEventos() {
    document.getElementById("mostrarLista").addEventListener("click", mostrar_lista, false);
}

function mostrar_lista(event) {
    event.preventDefault();
    var productos = document.getElementById("listaProductos");
    var listaCompleta=" ";

    for(var i= 0; i<wishList.length; i++){
        listaCompleta += 
        `<div class="producto">
        <img src=`+wishList[i].imagen+` alt="" class="product__img" width="200px" height="300px">
        <div class="product__description">
          <h3 class="product__title">`+wishList[i].descripcion+`</h3>
          <span class="product__price">`+wishList[i].precio+`</span>
        </div>
        <i class="product__icon fa-solid fa-heart"></i>
        <i style="font-size:24px" class="fa">&#xf1f8;</i>
        <a class="carritoBtn" href="nuevaCat.html">
          <i class="fa fa-cart-plus"></i>Añadir al carrito</a>
      </div>`
    }
    
    productos.innerHTML = listaCompleta;
}

