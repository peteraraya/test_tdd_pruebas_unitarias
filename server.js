const express = require('express')

const parser = require('body-parser')
const { authenticate } = require('./middlewares')
const app = express()
const port = 3000

// Patron de pruebas : para inyectar librerias de terceros

const services = require('./services')

const { posts } = require('./endpoints')


// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }))

// parse application/json, para cuando recibamos una petición en formato de json
app.use(parser.json())


// con este metodo le estamos pasando todos los servicios que va utilizar sin necesidad de hacer un required arriba
const postsHandlers = posts(services)

// metodo get
app.post('/',authenticate  ,postsHandlers.post)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


module.exports = app;


/**
 * Archivo solo de configuración de rutas
 * utilizando un handler o controlador que provee todo nuestros servicios
 * 
 * vamos a utilizar un middleware que se encargue de ver el tema de la autenticación 
 *  authenticate --> va a ser un middleware que tamvbien va recibir un objeto de request, response y la función de next
 *  que cuando nosotros la ejecutemos va reciobir el parametro siguiente de postHandler.post 
 * 
 */
