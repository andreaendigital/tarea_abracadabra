const express = require('express'); //importo express
const app = express(); //instancio
const PORT = 3000; //asigno el servidor a una variable

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

// Definir la carpeta "assets" como carpeta pública del servidor
app.use(express.static('assets/img'));

// Arreglo de nombres
const nombres = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "María",
    "Ignacia",
    "Javier",
    "Brian"
];

// Ruta 1 para obtener el arreglo de nombres en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios: nombres });
});

// Middleware para validar si el usuario existe en el arreglo de nombres
function validarUsuario(req, res, next) {
    const usuario = req.params.usuario; // captura el parametro
    if (nombres.includes(usuario)) {
        next(); // Permitir el paso a la siguiente ruta
    } else {
        res.redirect("/who.jpeg"); // Devolver la imagen "who.jpeg" si el usuario no existe
    }
}

// Ruta2 /abracadabra/juego/:usuario que utiliza el middleware para validar el usuario
app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Aquí envia la página HTML correspondiente
});

// Ruta 3 /abracadabra/conejo/:n que devuelve la imagen del conejo o de Voldemort según el número generado
app.get("/abracadabra/conejo/:numero", (req, res) => {
    // Paso 2
    const n = Math.floor(Math.random() * (5 - 1)) + 1; // variable tipo numérica
    console.log('numero n generado por math.floor:', n);  // muestra en consola el número entregado para verificar coincidencia y funcionamiento
    // Paso 3
    const numero = req.params.numero; // capturo el parametro de la ruta, el valor del número del parámetro lo deposita en variable numero como string
    // Paso 3
    numero == n //si numero es igual a n. | comparo contenido con doble igual, si uso triple igual no funcionaría por que compararía tipo de datos
        ? res.redirect("/conejito.jpg") // entonces
        : res.redirect("/voldemort.jpg"); // si no
});

// Ruta 4 genérica para manejar rutas no definidas
app.get("*", (req, res) => {
    res.status(404).send("oh, noooo ! Esta página no existe...");
});