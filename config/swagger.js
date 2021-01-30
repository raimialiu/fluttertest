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
    host: 'localhost:3200',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }

}
