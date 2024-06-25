import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config()
async function runMigrations() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    });
    const markerPath = path.join(__dirname, 'migration_marker.txt');
    const migrationAlreadyExecuted = fs.existsSync(markerPath);

    if (migrationAlreadyExecuted) {
        console.log('yqaaaaaaaa...');
        console.log('Migrations already executed, skipping...');
        await connection.end();
        return;
    }
    console.log(migrationAlreadyExecuted);
    const migrationDir = path.join(__dirname, 'Sql');
    

    const migrationFiles = fs.readdirSync(migrationDir);

    migrationFiles.sort();

    for (const filename of migrationFiles) {
        const migrationPath = path.join(migrationDir, filename);
        const sql = fs.readFileSync(migrationPath, 'utf8');
        try {
            await connection.query(sql);
            console.log(`Migration ${filename} executed successfully`);
        } catch (error) {
            console.error(`Error executing migration ${filename}:`, error);
        }
    }

    fs.writeFileSync(markerPath, 'Migrations executed successfully');

    await connection.end();
}

runMigrations().catch(error => {
    console.error('Error running migrations:', error);
});