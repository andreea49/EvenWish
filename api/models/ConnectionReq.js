const sequelize = require("./index")
const { DataTypes} = require("sequelize")

const ConnectionReq = sequelize.define("ConnectionReqs", {
    Sender: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    Receiver: {
        type: DataTypes.STRING,
        references: {model: "Users", key:"username"}
    },

    Date: {
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = ConnectionReq;