const componentes = document.getElementById("componentes")
const carrito = document.getElementById("carrito")
const dentroCarrito = JSON.parse(localStorage.getItem("carrito")) || []
const pagos = document.getElementById("pagos")

const Tarjetas = [
    {
    imagen: "https://www.tradeinn.com/f/13973/139736606/gigabyte-tarjeta-grafica-rtx-4090-gaming-oc-24gb-gddr6x.webp",
    nombre: "Tarjeta Grafica 4090",
    precio: 100000,
    descripcion: "tarjeta gráfica impresionantemente potente que presenta la GPU AD102-300 en la arquitectura Ada Lovelace y viene con 16384 núcleos CUDA para renders 3D de 2520 MHz de 2520 MHz",
},
{
    imagen: "https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2021/07/RYZEN5G1.jpg?fit=933%2C933&ssl=1",
    nombre: "Ryzen 5 5600G",
    precio: 50000,
    descripcion: "es un procesador altamente valorado por su rendimiento en juegos y tareas de productividad",
},
{
    imagen: "https://static.gigabyte.com/StaticFile/Image/Global/da88a91931bfb0cba86d4b99d528d0f4/Product/27181/Png",
    nombre: "Placa madre B560",
    precio: 20000,
    descripcion: "Placa base ultraduradera Intel B560 con VRM digital directo de 6+2 fases, diseño PCIe 4.0",
},
{
    imagen: "https://www.datasoft.com.ar/Image/0/750_750-023787_01.png",
    nombre: "Fuente de poder Corsair 750W",
    precio: 30000,
    descripcion: "Como todas las fuentes de alimentación CORSAIR, la CV Series hace exactamente lo que promete: ofrece una alimentación continua a plena capacidad.",
},
]

const Pagos = [
    {
        imagen2: "https://cdn-icons-png.freepik.com/512/105/105607.png",
        metodo: "Mercado pago",
        pagar: "",
    },
    {
        imagen2: "https://cdn-icons-png.flaticon.com/512/126/126233.png",
        metodo: "Debito/Credito",
        pagar: "",
    },
    {
        imagen2: "https://cdn-icons-png.flaticon.com/512/3948/3948496.png",
        metodo: "Efectivo",
        pagar: "",
    },
]

const tarjetas = (nombre, imagen, descripcion, precio) => {
    const contenedor = document.createElement("div")
    const nombreDOM = document.createElement("h2")
    const imagenDOM = document.createElement("img")
    const descripcionDOM = document.createElement("h4")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")
    
    
    contenedor.classList.add("contenedor")
    nombreDOM.classList.add("nombre")
    imagenDOM.classList.add("imagen")
    descripcionDOM.classList.add("desc")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")
    
    imagenDOM.src = imagen
    nombreDOM.innerText = nombre
    descripcionDOM.innerText = descripcion
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "Agregar al carrito"

    botonDOM.addEventListener("click", ()=>{
        agregarCarrito(nombre, precio)
    })

    contenedor.appendChild(nombreDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(descripcionDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)
    
    return contenedor
} 

Tarjetas.forEach(el => {
    const nombreDOM = tarjetas(el.nombre, el.imagen, el.descripcion, el.precio)

    componentes.appendChild(nombreDOM)
})

const tarjetasCarrito = (nombre, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const nombreDOM = document.createElement("h2")
    const precioDOM = document.createElement("p")
    const contenedorBotones = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonRestarDOM = document.createElement("button")
    const botonSumarDOM = document.createElement("button")
    const botonResetDOM = document.createElement("button")
    const botonPagosDOM = document.createElement("button")
    
    contenedor.classList.add("contenedor")
    nombreDOM.classList.add("nombre")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")
    botonResetDOM.classList.add("reset")
    botonSumarDOM.classList.add("boton-masmenos")
    botonRestarDOM.classList.add("boton-masmenos")
    botonPagosDOM.classList.add("boton-pagos")

    
    nombreDOM.innerText = nombre
    precioDOM.innerText = "$" + precio
    botonSumarDOM.innerText = "+"
    cantidadDOM.innerText = cantidad
    botonRestarDOM.innerText = "-"
    botonResetDOM.innerText = "Resetear carrito"
    botonPagosDOM.innerText = "Pagar"

    botonRestarDOM.addEventListener("click", () => {
        restarCarrito(nombre)
    })
    botonSumarDOM.addEventListener("click", () => {
        sumarCarrito(nombre)
    })
    botonResetDOM.addEventListener("click", () => {
        resetCarrito(nombre)
    })

    botonPagosDOM.addEventListener("click", ()=>{
        pagaras()
    })

    contenedorBotones.appendChild(botonRestarDOM)
    contenedorBotones.appendChild(botonSumarDOM)
    contenedorBotones.appendChild(cantidadDOM)
    contenedorBotones.appendChild(botonResetDOM)
    contenedorBotones.appendChild(botonPagosDOM)

    contenedor.appendChild(nombreDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorBotones)
    
    
    return contenedor
} 

const mostrarCarrito = () => {
    carrito.innerText = ""

    const totalDOM = document.createElement("h3")
    totalDOM.classList.add("precio-carrito")

    const total = dentroCarrito.reduce((acc, el)=>{
        return acc + el.cantidad * el.precio
    },0)

    totalDOM.innerText = "$" + total

    dentroCarrito.forEach(el => {
        carrito.appendChild(tarjetasCarrito(el.nombre, el.precio, el.cantidad))
        carrito.appendChild(totalDOM)
    })
    localStorage.setItem("carrito",JSON.stringify(dentroCarrito))
}

const agregarCarrito = (nombre, precio) => {
    const item = dentroCarrito.some(el => {
        return el.nombre === nombre
    })
    if(item){
        const itemCarrito = dentroCarrito.find(el => {
            return el.nombre === nombre
        })
        itemCarrito.cantidad += 1
    }else{
        dentroCarrito.push({
            nombre,
            precio,
            cantidad: 1
        })
    }
    mostrarCarrito()
}

const restarCarrito = (nombre) => {
    const itemCarrito = dentroCarrito.find(el => {
        return el.nombre === nombre
    })
    if(itemCarrito.cantidad <= 1){
        let arrayTitulos = dentroCarrito.map(el =>{
            return el.nombre
        })
        let index = arrayTitulos.indexOf(nombre)
        dentroCarrito.splice(index, 1)
    }else{
        itemCarrito.cantidad -= 1
    }
    mostrarCarrito()
}

const sumarCarrito = (nombre) => {
    const productoCarrito = dentroCarrito.find(el => {
        return el.nombre === nombre
    })
    productoCarrito.cantidad += 1
    mostrarCarrito()
}
const resetCarrito = (nombre) => {
    const itemCarrito = dentroCarrito.find(el => {
        return el.nombre === nombre
    })
    if(itemCarrito.cantidad = 1){
        dentroCarrito.map(el =>{
            return el.nombre 
        })
    }
    mostrarCarrito()
}

const mediosPago = (imagen2, metodo) => {
    const contenedor2 = document.createElement("div")
    const imagen2DOM = document.createElement("img")
    const metodoDOM = document.createElement("h2")
    const pagarDOM = document.createElement("p")
    const botonCDOM = document.createElement("button")

    contenedor2.classList.add("contenedor")
    imagen2DOM.classList.add("img-pago")
    metodoDOM.classList.add("metodo")
    pagarDOM.classList.add("pagar")
    botonCDOM.classList.add("boton-cancelar")

    botonCDOM.addEventListener("click", ()=>{
        cancelarPago()
    })
    

    imagen2DOM.src = imagen2
    metodoDOM.innerText = metodo
    botonCDOM.innerText = "Cancelar"

    contenedor2.appendChild(imagen2DOM)
    contenedor2.appendChild(metodoDOM)
    contenedor2.appendChild(pagarDOM)
    contenedor2.appendChild(botonCDOM)
    
    return contenedor2
}

Pagos.forEach(el => {
    const metodoDOM = mediosPago(el.imagen2, el.metodo, el.pagar)

    pagos.appendChild(metodoDOM)
})

document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito()
})

function pagaras(){
    document.getElementById("pagos").style.display = "flex"
}
function cancelarPago(){
    document.getElementById("pagos").style.display = "none"
}
