const sequelize = require("./index")
const { DataTypes} = require("sequelize")

const Connection = sequelize.define("Connections", {
    ConnectionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    User1: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    User2: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    Date: {
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = Connection;