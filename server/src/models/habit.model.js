import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Habit = sequelize.define("Habit", {
    name: { type: DataTypes.STRING, allowNull: false },
    frequency: { 
        type: DataTypes.ENUM("daily", "weekly"), 
        defaultValue: "daily" 
    },
    category: { type: DataTypes.STRING, defaultValue: "General" },
    streak: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    indexes: [
        { unique: true, fields: ["UserId", "name"] } 
    ]
});

export { Habit };