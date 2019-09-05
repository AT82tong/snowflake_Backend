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
    class: {
        type: sequelize.INTEGER.ZEROFILL,
        allowNull: false
    }
}, {
    freezeTableName: true
})

exports.profiles = profiles;