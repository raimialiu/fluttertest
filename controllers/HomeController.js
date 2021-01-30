const utilities = require("../utilities/utilities")()
class HomeController {
    static index() {
        return {
            "message": "My Rule Validation API",
            "status": "success",
            "data": {
              "name": "Aliu Raimi Tunde",
              "github": "@olatundedatascience",
              "email": "olatunderaimialiu@gmail.com",
              "mobile": "07064265908",
              "twitter": "@raimi_aliu"
            }
          }
    }

    static validateRule(request) {
        const payload = {
            rule:request.body.rule,
            data:request.body.data
        }

        return utilities.validateRule(payload)
    }
}


module.exports = HomeController