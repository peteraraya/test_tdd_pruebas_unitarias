/**
 * Vamos a levantar el servidor y a este le vamos a empezar a realizar peticiones
 * Utilizaremos supertest yarn add -D supertest 
 * 
 * supertest : le pasamos nuestra app que queremos testear
 * 
 * con los test de integración nos aseguramos que la cadena esta bien conectada
 */


 const request = require('supertest')
 const app = require('../../server')

 describe('server', () => {
     describe('Test EndPoints', () => {
         describe('Test Post POST', () => {

            // Primer test de intración
            test('create a new post', async() => {
                // esperamos la respuesta de lo que no va devolver request
                const response = await request(app)
                        .post('/')
                        .send({userId:5})
                        .set('user_id',1)
                        .set('Content-Type','application/json')
                      expect(response.statusCode).toEqual(201)
                      expect(response.body.userId).toEqual(5)
                      expect(response.body).toHaveProperty('id') // tenga una propiedad de id
            })
            // test en caso de error
             test('does not create a new post', async () => {
                 // esperamos la respuesta de lo que no va devolver request
                 const response = await request(app)
                     .post('/')
                     .send({ userId: 100 })
                     .set('user_id', 1)
                     .set('Content-Type', 'application/json')
                 expect(response.statusCode).toEqual(400)
             })
            
         })
         
     })
     
 })
 