import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CheckIn = sequelize.define("CheckIn", {
    date: { type: DataTypes.DATEONLY, allowNull: false }
});

export { CheckIn };