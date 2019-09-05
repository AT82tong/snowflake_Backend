const BaseController = require("./baseController");

class accountController extends BaseController {
    async register(content) {
        console.log("accountController.registration: ", content);
        // 注册
        console.log("AT LOVE KENNY!!!!")
        let result = {
            "status": 200
        }
        return result
    }
} 

module.exports = accountController;