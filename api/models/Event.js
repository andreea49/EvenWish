const sequelize = require("../sequelize")
const { DataTypes} = require("sequelize")

const Event = sequelize.define("Events", {
    EventID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    username: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { 
            isURL: true
        }
    },

    EventDate: {
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = Event;