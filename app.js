//Variables
let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let listaNumeroSorteados = [];

//Función para agregar texto a un elemento de HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Función para la jugabilidad del juego al dar click en intentar
function verificarIntento() {
    let numDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    //Al ganar el juego se habilita el botón de Nuevo Jugeo
    if (numDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acerto
        if (numDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//Función para limpiar la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    return;
}


//Generamos una función recursiva para generar el número secreto
function generarNumeroSecreto() {
    //genera un número aleatorio
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //Si ya sorteamos todos los números
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el numero generado ya se repite, repetir la función
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            //si no se repite el número, retorna el valor del número generado
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Funcion para establecer todo al incio
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`)
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}


//Función para reinicar el juego al dar click en el boton 'Nuevo Juego'
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();