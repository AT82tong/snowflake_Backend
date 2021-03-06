    
const router = require('koa-router')();
const profile_mgmt = require("../application/profiles/profile_management");

router.post('/snowflake/profile/viewAll', profile_mgmt.getProfile);
router.post('/snowflake/profile/viewDefaulticon', profile_mgmt.getDefaulticon);
router.post('/snowflake/profile/viewDescription', profile_mgmt.getDescription);
router.post('/snowflake/profile/viewUsername', profile_mgmt.getUsername);
router.post('/snowflake/profile/viewPreferredname', profile_mgmt.getPreferredname);
// router.post('/modsworkshop/profile/viewUploadfile', profile_mgmt.getUploadFile);
// router.post('/modsworkshop/profile/viewfavoritefile', profile_mgmt.getfavoritefile);
// router.post('/modsworkshop/profile/viewlikedcomment', profile_mgmt.getlikedcomment);
// router.post('/modsworkshop/profile/viewdislikedcomment', profile_mgmt.getdislikedcomment);
// router.post('/modsworkshop/profile/viewcomment', profile_mgmt.getComments);


module.exports = router;