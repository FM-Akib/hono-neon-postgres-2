import { Hono } from 'hono';
import { usersTable } from '../db/schema';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';

dotenv.config(); // Load environment variables

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Allow SSL without certificate validation
  },
});
const db = drizzle(pool);


export const UserRoutes = new Hono();

// Create a new user
UserRoutes.post('/users', async (c) => {
  const { name, age, email } = await c.req.json();
  const newItem = await db.insert(usersTable).values({ name, age, email }).returning();
  return c.json(newItem);
});

// Get all users
UserRoutes.get('/users', async (c) => {
  const users = await db.select().from(usersTable);
  return c.json(users);
});
