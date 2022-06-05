const sequelize = require("./index")
const { DataTypes} = require("sequelize")
var Event = require('./Event')

const Wish = sequelize.define("Wishes", {
        WishID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Note: {
            type: DataTypes.STRING
        },

        username: {
            type: DataTypes.STRING,
            references: {model: "Users", key:"username"},
            allowNull: true
        }
    } 
);

Event.hasMany(Wish, {
    foreignKey: {
        name: 'EventID'
    }, 
    onDelete: 'Cascade',
    onUpdate: 'Cascade'
});

//Wish.sync({ force: true });
module.exports = Wish;