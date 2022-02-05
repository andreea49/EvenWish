const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/Calendar.db'
})

/*
const sequelize = new Sequelize('postgres://httgvcjiuomzun:4c3ebaf396aa8a11323be03dbb0799ea581aca725d196b55782779b4a1186f55@ec2-54-216-159-235.eu-west-1.compute.amazonaws.com:5432/d4jp9logu9ideb',
{
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
})
*/

sequelize.sync({

}).then(() => {
    console.log("DB synced.")
})

module.exports = sequelize;