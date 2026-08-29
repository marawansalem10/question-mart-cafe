/**
 * Question Mart & Cafe - Admin User Seed Runner
 * 
 * DEVELOPMENT-ONLY SCRIPT
 * Creates or updates the admin user for local development testing.
 * 
 * Usage:
 *   npx ts-node src/scripts/seedAdmin.ts
 * 
 * Admin credentials:
 * - Email: admin@test.com
 * - Password: Admin12345!
 * - Role: admin
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedAdmin } from './admin.seed';

// Load environment variables
dotenv.config();

const seedAdminUser = async () => {
  const startTime = Date.now();
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionmartcafe';

  try {
    // Connect to database
    console.log('Connecting to database...');
    await mongoose.connect(mongoURI);
    console.log('Connected.\n');

    // Seed admin user
    const adminCount = await seedAdmin();
    console.log('');

    // Calculate execution time
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;

    // Print final summary
    console.log('Admin User Seed Completed');
    console.log('-------------------------');
    console.log(`Admin users processed: ${adminCount}`);
    console.log(`Execution time: ${executionTime.toFixed(2)}s`);
    console.log('\nLogin credentials:');
    console.log('  Email: admin@test.com');
    console.log('  Password: Admin12345!');
    console.log('  Role: admin\n');

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Admin seeding failed:');
    console.error(error);
    process.exit(1);
  }
};

seedAdminUser();
