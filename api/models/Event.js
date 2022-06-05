const sequelize = require("./index")
const { DataTypes} = require("sequelize")

const Event = sequelize.define("Events", {
    EventID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Location: {
        type: DataTypes.STRING,
        allowNull: true
    },

    EventDate: {
        type:DataTypes.DATE,
        allowNull:false
    },

    EventTime: {
        type:DataTypes.TIME,
        allowNull:false
    }

});

module.exports = Event;