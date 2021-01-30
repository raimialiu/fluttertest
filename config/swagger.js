exports.options ={
routePrefix: '/swagger',
exposeRoute: true,
  swagger: {
    info: {
      title: 'ALIU RAIMI TUNDE',
      description: 'api for flutterwave test by aliu raimi tunde',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'quiet-earth-82983.herokuapp.com/ ',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json']
  }

}
