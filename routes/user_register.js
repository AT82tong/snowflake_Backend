const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

 router.post('/snowflake/account/registration', account_mgmt.register);

 module.exports = router; 