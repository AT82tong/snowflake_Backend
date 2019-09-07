const baseController = require("./baseController");
const userProfile = require("../model/profile");
// const comment_list = require("../model/comment_list");

class profileController extends baseController {
    async getProfile(content) {

        console.log("profileController.getProfile: ", content);
        if (content.email === undefined || content.email === "" ){
            result = {
                "status": 209,
                "err_message": "empty useremail"
            }
            return 
        }
        let result = await userProfile.getProfile(content);
        // let comments = await comment_list.get_comment_byuser(content);
        
        return result;
        
    }

    async getUsername(content) {
        console.log("profileController.getUsername: ", content);

        let username = await userProfile.getUsername(content);
        let result = {
            "status": 200,
            "username": username
        }
        return result
    }

    async getPreferredname(content) {
        console.log("profileController.getUsername: ", content);

        let username = await userProfile.getPreferredname(content);
        let result = {
            "status": 200,
            "preferredname": preferredname
        }
        return result
    }


    async getDescription(content) {
        console.log("profileController.getDescription: ", content);

        let description = await userProfile.getDescription(content);
        let result = {
            "status": 200,
            "description": description
        }
        return result
    }

    async getDefaulticon(content) {
        console.log("profileController.getDefaulticon: ", content);

        let defaulticon = await userProfile.getDefaulticon(content);
        let result = {
            "status": 200,
            "defaulticon": defaulticon
        }
        return result
    }

    // async getUploadFile(content) {
    //     console.log("profileController.getUploadedFiles: ", content);

    //     let files = await userProfile.getUploadFile(content);
    //     let result = {
    //         "status": 200,
    //         "files": files
    //     }
    //     return result
    // }

    // async getComments(content) {
    //     console.log("profileController.getcommentlist: ", content);

    //     let comments = await comment_list.get_comment_byuser(content);
    //     let result = {
    //         "status": 200,
    //         "comments": comments.content
    //     }
    //     return result
    // }

    async editProfile(content) {
        console.log("profileController.editProfile: ", content);

        let result_code = await userProfile.editProfile(content);

        if (result_code == 0) {
            let result = {
                "status": 200
            }
            return result
        }

        let result = {
            // username exists code! I don't know what I should put here
            "status": 206,
            "err_message": "username exists"
        }
        return result

    }

    async editUsername(content) {
        console.log("profileController.editUsername: ", content);

        let result_code = await userProfile.editUsername(content);
        if (result_code == 0) {
            let result = {
                "status": 200
            }
            return result
        }
        
        let result = {
            "status": 206,
            "err_message": "username exists"
        }
        return result

    }

    async editDefaulticon(content) {
        console.log("profileController.editDefaulticon: ", content);

        await userProfile.editDefaulticon(content);
        let result = {
            "status": 200
        }
        return result
    }

    async editDescription(content) {
        console.log("profileController.editDescription: ", content);

        await userProfile.editDescription(content);
        let result = {
            "status": 200
        }
        return result
    }

    async getfavoritefile(content) {
        console.log("profileController.getfavoritefile: ", content);

        let files = await userProfile.getfavoritefile(content);
        let result = {
            "status": 200,
            "files": files
        }
        return result
    }

    async getlikedcomment(content) {
        console.log("profileController.getlikedcomment: ", content);

        let commentsID = await userProfile.getlikedcomment(content);
        let result = {
            "status": 200,
            "commentsID": commentsID
        }
        return result
    }

    async getdislikedcomment(content) {
        console.log("profileController.getdislikedcomment: ", content);

        let commentsID = await userProfile.getdislikedcomment(content);
        let result = {
            "status": 200,
            "commentsID": commentsID
        }
        return result
    }

}

module.exports = profileController;