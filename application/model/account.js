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

    //create user profile when user sign up
    let requestedJSON = {
        content: []
    }
    let requestedString = JSON.stringify(requestedJSON);

    let postedJSON = {
        content: []
    }
    let postedString = JSON.stringify(postedJSON);

    profiles.bulkCreate([{
        uid: uid,
        email: email,
        username: username,
        description: "",
        class: priority,
        defaulticon: 0,
        posted: postedString,
        requested: requestedString
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

exports.checkPassword = async function(content) {
    // checking the provided password and the encrypted password in DB
    let email = content.email;
    let password = content.password;

    let list = await users.findAll({
        where: {
            email: email
        }
    })

    if (list.length === 0) {
        // user does not exist
        let result = {
            "status": 204,
            "err_message": "email does not exist"
        }
        return result;
    }

    let data = list[0].dataValues;
    let salt = bcryptjs.genSaltSync(10);
    console.log("model/account/data.password: ", data.password);
    console.log("model/account/password: ", password);
    console.log("model/account/encrypted password: ", bcryptjs.hashSync(password, salt));
    let comp_result = await bcryptjs.compareSync(password, data.password);

    if (comp_result) {
        console.log("comp_result: ", comp_result);
        // generate new token
        let token = jwt.sign({ email: email }, jwt_key);
        let result = {
            "status": 200,
            "token": token
        }
        return result;
    } else {
        console.log("comp_result: ", comp_result);
        let result = {
            "status": 205,
            "err_message": "incorrect password"
        }
        return result;
    }
}