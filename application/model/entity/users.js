var Sequelize = require('sequelize');
var sequelize = require('../db');

const users = sequelize.define('users', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class: {
        type: sequelize.INTEGER.ZEROFILL,
        allowNull: false
    }
}, {
    freezeTableName: true
});

exports.users = users;