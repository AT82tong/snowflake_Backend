const router = require('koa-router')();
const profile_mgmt = require("../application/profiles/profile_management");

router.post('/snowflake/profile/editAll', profile_mgmt.editProfile);
router.post('/snowflake/profile/editDefaulticon', profile_mgmt.editDefaulticon);
router.post('/snowflake/profile/editDescription', profile_mgmt.editDescription);
router.post('/snowflake/profile/editUsername', profile_mgmt.editUsername);
router.post('/snowflake/profile/editPreferredname', profile_mgmt.editPreferredname);

module.exports = router;