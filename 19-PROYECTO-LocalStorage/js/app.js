//  Variables

const formulario = document.querySelector('#formulario');


const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];



//Event liseners

eventListeners();

function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet

    formulario.addEventListener('submit', agregarTweets)

    // Cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    })

}


// Funciones



function agregarTweets(e) {
    e.preventDefault();

    // text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Valudacion

    if (tweet === '') {

        mostrarError('No puede ir vacio');

        return; // evita que se ejecute mas codigo dentro de la funcion.
    }

    tweetObj = {
            id: Date.now(),
            tweet

        }
        // Añadir al arreglo de tweets

    tweets = [...tweets, tweetObj];



    //  Una verz agregado vamos a crear el HTML

    crearHTML();

    //  Reiniciar el formulario

    formulario.reset();

}


//  Mostrar mensaje de error.

function mostrarError(error) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');

    contenido.appendChild(mensajeError);

    // Elimina el alerta desde de tres segundos.

    setTimeout(() => { mensajeError.remove() }, 3000);

}

// Muestra un listado de los tweets

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {

        tweets.forEach(tweet => {

            // Agregar el boton de eliminar 

            const btnEliminar = document.createElement('a');
            btnEliminar.innerText = 'X';
            btnEliminar.classList.add('borrar-tweet');

            // Añadir la funcion elimiar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto

            li.innerText = tweet.tweet;

            // Agrega el boton al li

            li.appendChild(btnEliminar);


            // Añadir en el HTML

            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

// Limpar el HTML 

function limpiarHTML() {

    while (listaTweets.firstChild) {

        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// Mostrar los tweets al cargar

function sincronizarStorage() {

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina Tweet

function borrarTweet(id) {

    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML(tweets);
}