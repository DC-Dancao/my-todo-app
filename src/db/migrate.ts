import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const dbName = 'todo_app';
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in your environment variables');
  }

  // Connect to the default 'postgres' database to check for and create the target database
  const maintenanceClient = new Client({
    connectionString: databaseUrl.replace(/\/[^/]*$/, '/postgres'),
  });

  await maintenanceClient.connect();

  try {
    const res = await maintenanceClient.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`Database '${dbName}' not found. Creating...`);
      await maintenanceClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } finally {
    await maintenanceClient.end();
  }

  // Connect to the target database to run migrations
  const migrationClient = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await migrationClient.connect();

  try {
    const db = drizzle(migrationClient);
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations applied successfully.');
  } finally {
    await migrationClient.end();
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});