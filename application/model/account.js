import { users } from "./entity/users"
import { profiles } from "./entity/profiles"

const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
let jwt_key = require("../../config/dev").keys['jwt'];

exports.checkEmail = async function (content) {
    let email = content.email;
    let list = await users.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 1) {
        return 'email'; // duplicate email exists
    } else {
        return '0'; // duplicate email does not exist
    }
}

exports.checkUsername = async function (content) {
    let username = content.username;
    let list = await users.findAll({
        where: {
            username: username
        }
    });
    if (list.length === 1) {
        return 'username'; // duplicate email exists
    } else {
        return '0'; // duplicate email does not exist
    }
}

exports.addUser = async function (content) {
    let email = content.email;
    let raw_password = content.password;
    let username = content.username;
    let priority = 0;

    let salt = bcryptjs.genSaltSync(10);
    let encryp_password = bcryptjs.hashSync(raw_password, salt);
    console.log("encryp_password: ", encryp_password);

    users.bulkCreate([{
        email: email,
        password: encryp_password,
        username: username,
        class: priority
    }])

    let list = await users.findAll({
        where: {
            email: email
        }
    });

    let uid = list[0].dataValues.uid;

    // create user profile when user sign up
    // let uploadfileJSON = {
    //     content: []
    // }
    // let uploadfileString = JSON.stringify(uploadfileJSON);
    // let favoritefileJSON = {
    //     content: []
    // }
    // let favoritefileString = JSON.stringify(favoritefileJSON);

    profiles.bulkCreate([{
        uid: uid,
        email: email,
        username: username,
        description: "",
        class: priority
        // icon: 0
        // uploadfile: uploadfileString,
        // favoritefile: favoritefileString
    }])
}

exports.upgradeClass = async function(content) {
    let email = content.email;
    await users.update({
        class: 1
    }, {
        where: {
            email: email
        }
    });

    await profiles.update({
        class: 1
    }, {
        where: {
            email: email
        }
    });

}