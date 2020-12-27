const authenticate = require('./authenticate')

describe('Test middlewares', () => {

    describe('Test authenticate', () => {

        test('should have id 1', () => {
            // solo metodo de header
            const req = {
                // para acceder a la función del request accedemos al header
                header: jest.fn().mockReturnValue("1")
            }
            const res = {
                // preguntar que el status no haya sido llamado
                sendStatus: jest.fn()
            }
            const next = jest.fn();

            authenticate(req, res, next)
            // Implementamos un mock para sendStatus lo utilizamos como espia
            // consultar si header fue llamado y con que valor se llamo 
            expect(req.header.mock.calls).toEqual([
                // al menos se llamó una vez
                ['user_id']
            ])
            // indicamos que no quiero que se haya llamdo sendStatus, tiene que ser un arreglo vacío
            expect(res.sendStatus.mock.calls).toEqual([])

            // next se debe haber llamado al menos una vez, implementamos un spia
            expect(next.mock.calls).toEqual([[]])

        })
        // Caso de error
        test('should fail if user is not the one with id 1', () => {

            const req = {
                // para acceder a la función del request accedemos al header
                header: jest.fn().mockReturnValue("2")
            }
            const res = {
                // preguntar que el status no haya sido llamado
                sendStatus: jest.fn()
            }
            const next = jest.fn();

            authenticate(req, res, next)

            // consultar si header fue llamado y con que valor se llamo 
            expect(req.header.mock.calls).toEqual([
                // al menos se llamó una vez
                ['user_id']
            ])
            // indicamos que no quiero que se haya llamdo sendStatus, tiene que ser un arreglo vacío
            expect(res.sendStatus.mock.calls).toEqual([
                [403]
            ])

            // next se debe haber llamado al menos una vez
            expect(next.mock.calls).toEqual([])

        })

    })

})



/**
 *  Al menos necesitamos un test para que nuestra prueba sea correcta
 *  Se define cual es la espesificación de que es lo que nosotros queriamos que hiciera nuestro middleware
 *  Se generan los test para mostrar cuando se modifique el archivo 
 * 
 */