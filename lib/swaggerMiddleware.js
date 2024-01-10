const swaggerJSDoc =require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Nodepop API',
            version: '0.0.1',
            description: 'Api de compra venta articulos segunda mano'
        }
    },
   
    apis: ['./routes/**/*.js']
}

const especificacion = swaggerJSDoc(options)

module.exports = [swaggerUI.serve, swaggerUI.setup(especificacion)];