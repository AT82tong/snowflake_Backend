const Controller = require("../controller/accountController");

exports.register = async (ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    console.log("account_management.registration: ", body);
    let result = await controller.register(body);
    ctx.body = result;

    await next();
} 
