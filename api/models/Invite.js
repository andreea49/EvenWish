const sequelize = require("./index")
const { DataTypes} = require("sequelize")
var Event = require('./Event')

const Invite = sequelize.define("Invites", {
        InviteID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            references: {model: "Users", key:"username"}
        }
    } 
);


Event.hasMany(Invite, {
    foreignKey: {
        name: 'EventID'
    }, 
    onDelete: 'Cascade',
    onUpdate: 'Cascade'
});

// custom query
Invite.getEventsForUser = async function(username) {
    return sequelize.query(
        "SELECT * FROM Events JOIN Invites ON Events.EventID = Invites.EventID WHERE Invites.username = '" + username + "'"
    );
}

//Invite.sync({ force: true });
module.exports = Invite;