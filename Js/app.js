
const listarCursos = document.querySelector('#lista-cursos');

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEvento();
function cargarEvento(){
    listarCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar Carrito

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; //resetea el arreglo
        limpiarHtml();
    });

}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Filtra todos los elementos del arreglo menos 
        //el de CursoID que seria el Data-id que se selecciono
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHtml(); //iteramos de nuevo el carrito y si html
    }
}



//lee el contenido del html

function leerDatos(curso){
    // console.log(curso);

    // Objeto que extraer el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio_regular: curso.querySelector('.precio p').textContent,
        precio_descuento:curso.querySelector('.oferta').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    };

    //revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // Actualiza la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            }else{
                return curso; // retorna objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];

    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //agrega elemento del arreglo al carrito

   
    console.log(articulosCarrito);
    carritoHtml();
}


// Muestra el carrito de compras

function carritoHtml(){
// limpiar el html

    limpiarHtml();

    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio_descuento,cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
           <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio_descuento}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
         <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        <hr>
        `;

        //agrega el html al tbdy

        contenedorCarrito.appendChild(row);
    })
}


// elimina los cursos del tbody

function limpiarHtml(){
    contenedorCarrito.innerHTML='';
}