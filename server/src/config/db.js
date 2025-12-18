import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // Explicit path is safer in ESM

const sequelize = new Sequelize(
    process.env.DB_NAME || 'habit_tracker',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected...');
        // Force: false ensures we don't wipe data on restart
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

export { sequelize, connectDB };