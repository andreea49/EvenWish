const sequelize = require("./index")
const { DataTypes} = require("sequelize")

const User = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;