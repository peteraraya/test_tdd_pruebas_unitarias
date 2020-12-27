
const postHandlers = require('./index')
describe('Test authenticate', () => {
    describe('Test posts', () => {

        // Caso de Exito
        test('should create', async() => {

            const mockUsers = [
                { id : 1 },
                { id : 2 },
            ]
            
            const post = {
                userId : 1,
                title  : "Titulo",
                body   : "Cuerpo del post"
            }

            const req = {
                body : post,
            }

            const res = {
                // vamos a devolver un status de 201 y el id que haya sido creado 
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            // vamos a necesitar axios
            const axios = {
                // get : para obtener el estado de los usuarios y post

                get :  jest.fn().mockResolvedValue( { data: mockUsers} ),
                post:  jest.fn().mockResolvedValue( { data: {id:1000}  }),
            }

            await postHandlers({ axios }).post(req,res,)

            expect(res.status.mock.calls).toEqual([
                [201]
            ])

            expect(res.send.mock.calls).toEqual([
                [{ id: 1000 }]
            ])

            expect(axios.get.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users']
            ])

            expect(axios.post.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/posts',post]
            ])

        })

        // Caso de fracaso : cuando el usaurio que queremos asignar al post no existe en el lstado de usuarios 
        test('should not create if userId does not exist', async() => {

            const mockUsers = [
                { id: 1 },
                { id: 2 },
            ]

            const post = {
                userId: 3,
                title: "Titulo",
                body: "Cuerpo del post"
            }

            const req = {
                body: post,
            }

            const res = {
                // vamos a devolver un status de 201 y el id que haya sido creado 
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                // Validaremos que post no se haya llamado y que en su lugar se haya llamado sendStatus error 500 o 400
                sendStatus: jest.fn()
            }

            // vamos a necesitar axios
            const axios = {
                // get : para obtener el estado de los usuarios y post

                get: jest.fn().mockResolvedValue({ data: mockUsers }),
                post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
            }

            await postHandlers({ axios }).post(req, res,)

            // esperamos de que axios.post.mock.calls --> sea un arreglo vacío
            expect(axios.post.mock.calls).toEqual([])

            expect(res.sendStatus.mock.calls).toEqual([
                [400]
            ])

 


        })
        


    })
})