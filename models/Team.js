const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Team', {
        team_id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        team_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city_name: Sequelize.STRING,
        },
        { timestamps: false }
    )
};