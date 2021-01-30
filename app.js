const fastify = require("fastify")({
    // logger:{
    //     file:"logs/logs.txt"
    // }
    logger:true
})
const swagger = require("./config/swagger")

fastify.setErrorHandler(function(error, request, reply){
    reply.send(require("./utilities/utilities")().GetResponse(new Error(error).message, 'error', null))
})

fastify.register(require("fastify-swagger"), {
    routePrefix: '/swagger',
    swagger: {
      info: {
        title: 'ALIU RAIMI',
        description: 'api for flutterwave test',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: '127.0.0.1:3200',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Home', description: 'Home Controller related end-points' }
        
      ],
      
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    exposeRoute: true
  })

fastify.register(require("./routes/main"))

fastify.listen(process.env.PORT || 3200,process.env.HOST || "0.0.0.0", function(er, address){
    fastify.log.info(`server listening at ${address}`)
})