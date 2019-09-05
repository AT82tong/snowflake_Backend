const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/snowflake/account/registration', account_mgmt.register);
router.post('/snowflake/account/sendVeriCode', account_mgmt.sendVeriCode);
router.post('/snowflake/account/checkVeriCode', account_mgmt.checkVeriCode);
module.exports = router; 