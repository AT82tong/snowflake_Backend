const router = require("koa-router")();
const post_mgmt = require("../application/posts/post_management.js");

router.post('/snowflake/post/createPost', post_mgmt.createPost);
router.post('/snowflake/post/viewPost', post_mgmt.viewPost);

module.exports = router;