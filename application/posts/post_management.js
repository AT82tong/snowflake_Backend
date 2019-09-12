const Controller = require("../controller/postController");

exports.createPost = async (ctx, next) => {
    let body = ctx.request.body;


    let controller = new Controller();
    let result = await controller.createPost(body);
    ctx.body = result;

    console.log("post_management.result: ", result);

    await next();
}

exports.viewPost = async (ctx, next) => {
    let body = ctx.request.body;


    let controller = new Controller();
    let result = await controller.viewPost(body);
    ctx.body = result;

    console.log("post_management.result: ", result);

    await next();
}


