var Sequelize = require('sequelize');
var sequelize = require('../db');

const posts = sequelize.define('posts', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    publisherEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serviceTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    createdTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    buyers: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

exports.posts = posts;