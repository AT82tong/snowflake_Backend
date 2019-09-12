import { profiles } from "./entity/profiles"
import { users } from "./entity/users";
// import { files } from "./entity/files"
// import { comment_list } from "./entity/comment_list"

const post = require("../model/post");

var Sequelize = require('sequelize');
let Op = Sequelize.Op;

exports.getUsername = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.username;
}

exports.getPreferredname = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.preferredname;
}

exports.getEmail = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.email;
}

exports.getDescription = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.description;
}

exports.getDefaulticon = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.defaulticon;
}

exports.getPosted = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });
    return profile.posted;
}

exports.getProfile = async function (content) {
    let email = content.email;
    let profile = await profiles.findOne({
        where: {
            email: email
        }
    });

    if (profile.length === 0) {
        let result = {
            "status": 210,
            "err_message": "cannot find corresponding account by email"
        }
        return result
    }

    let username = profile.username;
    let description = profile.description;
    let defaulticon = profile.defaulticon;
    let preferredname = profile.preferredname;
    let cclass = profile.class;
    let postedString = profile.posted;
    let posteds = postedString.split(/[^0-9]/).map(Number);
    posteds = posteds.filter(Boolean);

    console.log("list: ", posteds);

    var postedDetails = [];
    var posted;
    for (posted of posteds) {
        let current_post = await post.getPost(posted)
        let postJSON = current_post
        postJSON["uid"] = posted

        postedDetails.push(postJSON)

    }
    console.log("posteddetail: ", postedDetails)
    // let favoriteJSON = JSON.parse(profile.favoritefile);
    // let favorite = favoriteJSON.content;

    // console.log("profile: ", profile);

    let result = {
        "status": 200,
        "username": username,
        "email": email,
        "description": description,
        "defaulticon": defaulticon,
        "preferredname": preferredname,
        "class": cclass,
        "posted": postedDetails
        // "files": files,
        // "favorite": favorite,
        // "comments": comments.content
    }
    return result

}

// exports.getUploadFile = async function(content) {
//     console.log("======= user_profile.getUploadFile =========");
//     let email = content.email;
//     let profile = await user_profile.findOne({
//         where: {
//             email: email
//         }
//     });
//     console.log("email: ", email);
//     console.log("profile: ", profile.uploadfile);
//     return profile.uploadfile;
// }

// exports.getfavoritefile = async function(content) {
//     console.log("======= user_profile.getfavoritefile =========");
//     let email = content.email;
//     let currentprofile = await user_profile.findOne({
//         where: {
//             email: email
//         }
//     });

//     let result = [];
//     let currentlist = currentprofile.favoritefile

//     let favoritefiles = currentlist.split(/[^0-9]/).map(Number);
//     favoritefiles = favoritefiles.filter(Boolean);

//     console.log("list: ", favoritefiles);

//     var file;
//     for (file of favoritefiles) {
//         let current_file = await files.findOne({
//             where: {
//                 fileID: file
//             }
//         })

//         console.log("current_file", current_file);

//         let fileJSON = current_file.dataValues;
//         let username = await this.getUsername({ email: fileJSON.email });
//         // console.log("username: ", username);
//         fileJSON["username"] = username;
//         console.log("fileJSON: ", fileJSON);

//         // add Info download URL
//         let infoDownloadURL = await filesjs.getDownloadURL({ key: "Info|" + fileJSON.key });
//         // console.log("downloadURL: ", downloadURL);
//         fileJSON["infoDownloadUrl"] = infoDownloadURL;

//         result.push(fileJSON);

//         // result.push(current_file);

//     }
//     console.log("result is", result);

//     // return file detail (not key)

//     return result;
// }

// exports.setUploadFile = async function(content) {
//     let email = content.email;
//     let uploadfile = content.uploadfile;
//     console.log("======= user_profile.setUploadFile =========");
//     console.log("email: ", email);
//     console.log("uploadfile: ", uploadfile);
//     // await setTimeout(function() {}, 100, 'funky');
//     await user_profile.update({
//         uploadfile: uploadfile
//     }, {
//         where: {
//             email: email
//         }
//     })
// }

exports.editpostlist = async function (email, uid, add, type) {

    if (add === 1 && type === 0) {
        let profile = await profiles.findOne({
            where: {
                email: email
            }
        })
        let posts = profile.posted
        let thelist = posts.split(/[^0-9]/).map(Number);
        thelist = thelist.filter(Boolean);

        if (thelist.includes(uid) === true) {
            let result = {
                "status": 208,
                "err_message": "Post has been posted"
            }
            return result;
        }

        thelist.push(uid)

        let postedJSON = {content: thelist};
        let postedString = JSON.stringify(postedJSON)
        profiles.update({
            posted: postedString
        }, {
            where: {
                email: email
            }
        })
        
        let result = {
            "status": 200
        }

        return result
    }

    
}

exports.editUsername = async function (content) {
    let email = content.email;
    let username = content.username;

    // check if username exists before updating it
    let list = await profiles.findAll({
        where: {
            username: username,
            email: { [Op.not]: email }
        }
    });

    if (list.length === 1) {
        return '1'; // duplicate username exists
    } else {
        profiles.update({ username: username }, { where: { email: email } })
        users.update({ username: username }, { where: { email: email } })
        return '0'; // duplicate username or email does not exist
    }

    // await files.update({
    //     username: username
    // }, {
    //     where: {
    //         email: email
    //     }
    // })

    // await comment_list.update({
    //     username: username
    // }, {
    //     where: {
    //         email: email
    //     }
    // })

    // await user_rates.update({
    //     username: username
    // }, {
    //     where: {
    //         email: email
    //     }
    // })

    // return 0;

}

exports.editDescription = async function (content) {
    let email = content.email;
    let description = content.description;

    profiles.update({ description: description }, { where: { email: email } })

}

exports.editDefaulticon = async function (content) {
    let email = content.email;
    let defaulticon = content.defaulticon;

    profiles.update({ defaulticon: defaulticon }, { where: { email: email } })

}


exports.editPreferredname = async function (content) {
    let email = content.email;
    let preferredname = content.preferredname;

    profiles.update({ preferredname: preferredname }, { where: { email: email } })

}

exports.editProfile = async function (content) {
    let email = content.email;
    let username = content.username;
    let description = content.description;
    let defaulticon = content.defaulticon;
    let preferredname = content.preferredname;

    let list = await profiles.findAll({
        where: {
            username: username,
            email: { [Op.not]: email }
        }
    });

    if (list.length === 1) {
        return '1'; // duplicate username exists
    } else {
        profiles.update({
            description: description,
            username: username,
            defaulticon: defaulticon,
            preferredname: preferredname
        }, { where: { email: email } })
        users.update({ username: username }, { where: { email: email } })

        return '0'; // duplicate username or email does not exist
    }

    // user_profile.update({
    //     description: description,
    //     username: username,
    //     icon: icon
    // }, { where: { email: email } });

    // if (username !== undefined && username !== null) {
    //     await files.update({
    //         username: username
    //     }, {
    //         where: {
    //             email: email
    //         }
    //     })

    //     await comment_list.update({
    //         username: username
    //     }, {
    //         where: {
    //             email: email
    //         }
    //     })

    //     await user_rates.update({
    //         username: username
    //     }, {
    //         where: {
    //             email: email
    //         }
    //     })
    // }
    // return 0;

}

// exports.deleteFavorite = async function(fileID) {
//     const Op = Sequelize.Op;
//     const operatorsAliases = {
//         $like: Op.like,
//         $not: Op.not
//     }

//     let favoriteuserlist = await user_profile.findAll({
//         where: {
//             favoritefile: {
//                 [Op.like]: '%' + fileID + "" + '%'
//             }
//         }
//     });

//     console.log("users: ", favoriteuserlist);

//     var user;
//     for (user of favoriteuserlist) {
//         let favoritefileString = user.favoritefile;

//         let thelist = favoritefileString.split(/[^0-9]/).map(Number);
//         thelist = thelist.filter(Boolean);

//         if (thelist.includes(fileID) === false) {
//             console.log("fileID not in favoritelist", user.userID);
//             continue;
//         }

//         let removed = thelist.indexOf(fileID);
//         thelist.splice(removed, 1);
//         // console.log("Updated favorite list: ", thelist);

//         let favoritefileJSON = { content: thelist };
//         favoritefileString = JSON.stringify(favoritefileJSON);

//         this.setfavoritefile({
//             email: user.email,
//             favoritefile: favoritefileString
//         });
//     }

//     let result = {
//         status: 200
//     };

//     return result;

// }

// exports.getfavoriteFileID = async function(content) {
//     console.log("======= user_profile.getfavoriteFileID =========");
//     let email = content.email;
//     let profile = await user_profile.findOne({
//         where: {
//             email: email
//         }
//     });
//     return profile.favoritefile;
// }

// exports.getlikedcomment = async function(content) {
//     console.log("======= user_profile.getlikedcomment =========");
//     let email = content.email;
//     let profile = await user_profile.findOne({
//         where: {
//             email: email
//         }
//     });
//     return profile.likedcomment;
// }

// exports.getdislikedcomment = async function(content) {
//     console.log("======= user_profile.getdislikedcomment =========");
//     let email = content.email;
//     let profile = await user_profile.findOne({
//         where: {
//             email: email
//         }
//     });
//     return profile.dislikedcomment;
// }

// // type=1 likedcomment, otherwise dislikedcomment
// exports.setcommentlist = async function(email, comment_list, type) {
//     if (type == 1) {
//         console.log("======= user_profile.setLIKEDcommentlist =========");
//         console.log("email: ", email);
//         console.log("comment_list: ", comment_list);
//         await user_profile.update({
//             likedcomment: comment_list
//         }, {
//             where: {
//                 email: email
//             }
//         });

//     } else {

//         console.log("======= user_profile.setDISLIKEDcommentlist =========");
//         console.log("email: ", email);
//         console.log("comment_list: ", comment_list);
//         await user_profile.update({
//             dislikedcomment: comment_list
//         }, {
//             where: {
//                 email: email
//             }
//         });
//     }

// }