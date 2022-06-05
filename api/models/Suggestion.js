const sequelize = require("./index")
const { DataTypes} = require("sequelize")

const Suggestion = sequelize.define("Suggestions", {
        keyword: {
            type: DataTypes.STRING,
            allowNull: false
        },

        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = Suggestion;