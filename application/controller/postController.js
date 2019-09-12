const baseController = require("./baseController");
const account = require("../model/account");
const post = require("../model/post");
const profile = require("../model/profile");

class postController extends baseController {
    async createPost(content) {
        // createPost
        console.log("postController.createPost: ", content);

        let dupTitle = await post.checkTitle(content);
        console.log("dupTitle: ", dupTitle);

        // dupTitle 
        if (dupTitle === 1) {
            console.log("duplicate Title");
            let result = {
                "status": 207,
                "err_message": "duplicate title exists"
            }
            return result;
        }
        content['email'] = content.publisherEmail;
        let post_uid = await post.addPost(content);
        console.log("Added UID: ", post_uid);
        let result = await profile.editpostlist(content.email, post_uid, 1, 0)

        return result;
    }

    async viewPost(content) {
        // createPost
        console.log("postController.viewPost: ", content);

        if (content.uid === undefined) {
            let result = {
                "status": 211,
                "err_message": "empty uid"
            }
            return result
        }

        let post_result = await post.getPost(content.uid);
        if (post_result === undefined) {
            let result = {
                "status": 212,
                "err_message": "can't find post information by given uid"
            }
            return result
        }

        post_result['status'] = 200
        return post_result

    }
    
}
module.exports = postController;