var Sequelize = require('sequelize');
var sequelize = require('../db');

const profiles = sequelize.define('profiles', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
    },
    defaulticon: {
        type: Sequelize.INTEGER
    },
    class: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    posted: {
        type: Sequelize.STRING
    },
    requested: {
        type: Sequelize.STRING
    },
    preferredname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

exports.profiles = profiles;