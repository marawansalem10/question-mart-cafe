/**
 * Question Mart & Cafe - Local Development Password Reset Script
 * 
 * TEMPORARY DEVELOPMENT-ONLY SCRIPT
 * This script is for local development password reset only.
 * Do not use in production environments.
 * 
 * Usage:
 *   npx ts-node src/scripts/resetPassword.ts
 * 
 * The script will prompt for the new password in the terminal.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import readline from 'readline';
import User from '../models/User';

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

const resetPassword = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionmartcafe';
  const targetEmail = 'marawan@test.com';

  try {
    // Connect to database
    console.log('Connecting to database...');
    await mongoose.connect(mongoURI);
    console.log('Connected.\n');

    // Find user by email
    console.log(`Finding user with email: ${targetEmail}`);
    const user = await User.findOne({ email: targetEmail });

    if (!user) {
      console.error(`\n❌ User not found with email: ${targetEmail}`);
      rl.close();
      process.exit(1);
    }

    console.log(`✓ User found: ${user.name} (${user.email})`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Language: ${user.language}\n`);

    // Prompt for new password
    const newPassword = await prompt('Enter new password (minimum 8 characters): ');

    if (newPassword.length < 8) {
      console.error('\n❌ Password must be at least 8 characters');
      rl.close();
      process.exit(1);
    }

    const confirmPassword = await prompt('Confirm new password: ');

    if (newPassword !== confirmPassword) {
      console.error('\n❌ Passwords do not match');
      rl.close();
      process.exit(1);
    }

    // Hash password using same mechanism as authController
    console.log('\nHashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password only
    console.log('Updating password...');
    user.password = hashedPassword;
    await user.save();

    console.log('\n✓ Password updated successfully');
    console.log('-------------------------');
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role} (unchanged)`);
    console.log(`Language: ${user.language} (unchanged)`);
    console.log(`Password: Updated\n`);

    // Close connection
    rl.close();
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Password reset failed:');
    console.error(error);
    rl.close();
    process.exit(1);
  }
};

resetPassword();
