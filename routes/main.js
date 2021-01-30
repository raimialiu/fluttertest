const controller = require("../controllers/HomeController")
module.exports = function(fastify, options, done){
    fastify.get("/", {
        schema:{
            description: 'Home route',
            tags: ['Home']
        }
    }, function(request, reply){
        reply.send(controller.index())
    })

    fastify.post("/validate-rule", {
        schema:{
            description: 'validate rule endpoint',
            tags: ['Home'],
            body:{
                type:"object"
                
            }
        }
    }, function(request, reply){
        const result = controller.validateRule(request)

        if(result["status"] == false) {
            reply.statusCode = 400
            reply.send(result)
        }
        else {
            reply.send(result)
        }
    })
    done()
}