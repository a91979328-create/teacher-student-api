 const swaggerJsdoc = require('swagger-jsdoc');

 const options = {
      definition: {
        openapi: '3.0.0',
        info: {
            title: 'Teacher-Sudent Mangement API',
            version: '1.0.0',
            description: "ROle based API for Teacher & Student"
        },
        servers: [
            {
                url: 'http://localhost:8000/api/auth',
                description: 'Local server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
                {
                    bearerAuth: [],
                },
        ],
        
      },
      apis: ['./routes/*.js', './controllers/*.js'],

 }

 const swaggerSpec = swaggerJsdoc(options)

 module.exports = swaggerSpec;