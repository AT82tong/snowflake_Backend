import { users } from "./entity/users"
import { profiles } from "./entity/profiles"
import { posts } from "./entity/posts"

const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
let jwt_key = require("../../config/dev").keys['jwt'];

exports.searchPost = async function (content) {
    let post = await posts.findOne({
        where: {
            publisherEmail: content.publisherEmail,
            serviceTitle: content.serviceTitle
        }
    })
    return post.uid
}

exports.checkTitle = async function (content) {
    let publisherEmail = content.publisherEmail;
    let serviceTitle = content.serviceTitle;
    let list = await posts.findAll({
        where: {
            publisherEmail: publisherEmail,
            serviceTitle: serviceTitle
        }
    });
    if (list.length === 1) {
        return 1; // duplicate email exists
    } else {
        return 0; // duplicate email does not exist
    }
}

exports.addPost = async function (content) {
    let buyers = {
        content: []
    }
    let buyerString = JSON.stringify(buyers);

    let createdTime = "" + Date.now();
    await posts.bulkCreate([{
        publisherEmail: content.publisherEmail,
        serviceTitle: content.serviceTitle,
        createdTime: createdTime,
        price: content.price,
        description: content.description,
        buyers: buyerString
    }])
    
    let uid = await exports.searchPost(content)
    console.log("returned uid:", uid)
    return uid
}

exports.getPost = async function (uid) {

    console.log("======= posts.getPost =========");
    console.log("uid: ", uid);

    let post = await posts.findOne({
        where: {
            uid: uid
        }
    });

    if (post.length === 0) {
        return undefined
    }

    let publisherEmail = post.publisherEmail
    let serviceTitle = post.serviceTitle
    let createdTime = post.createdTime
    let price = post.price
    let description = post.description
    let buyers = post.buyers

    let result = {
        publisherEmail: publisherEmail,
        serviceTitle: serviceTitle,
        createdTime: createdTime,
        price: price,
        description: description,
        buyers: buyers
    }

    return result
}

exports.setUserlist = async function (uid, user_list, type) {
    if (type == 1) {
        console.log("======= posts.setbuyers =========");
        console.log("uid: ", uid);
        console.log("user_list: ", user_list);
        await posts.update({
            buyers: user_list
        }, {
            where: {
                uid: uid
            }
        });

    } else {

        console.log("======= posts.set??? =========");
        console.log("uid: ", uid);
        console.log("user_list: ", user_list);
        // await posts.update({
        //     user_list: user_list
        // }, {
        //     where: {
        //         uid: uid
        //     }
        // });
    }
}

