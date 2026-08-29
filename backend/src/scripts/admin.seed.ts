/**
 * Question Mart & Cafe - Admin User Seed Script
 * 
 * DEVELOPMENT-ONLY SCRIPT
 * Creates or updates the admin user for local development testing.
 * 
 * Admin credentials:
 * - Email: admin@test.com
 * - Password: Admin12345!
 * - Role: admin
 */

import bcrypt from 'bcryptjs';
import User from '../models/User';

export const seedAdmin = async (): Promise<number> => {
  console.log('Seeding Admin User...');

  const adminEmail = 'admin@test.com';
  const adminPassword = 'Admin12345!';
  const adminName = 'Question Mart Admin';
  const adminRole = 'admin';
  const adminLanguage = 'en';

  // Hash password using same mechanism as authController (salt rounds: 10)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  // Find existing admin user or create new one
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    // Update existing user to admin role and ensure correct password
    console.log(`  Found existing user: ${existingAdmin.email}`);
    console.log(`  Current role: ${existingAdmin.role}`);
    
    existingAdmin.name = adminName;
    existingAdmin.role = adminRole;
    existingAdmin.language = adminLanguage;
    existingAdmin.password = hashedPassword;
    
    await existingAdmin.save();
    console.log('  ✓ Updated to admin role with new password');
  } else {
    // Create new admin user
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: adminRole,
      language: adminLanguage,
    });
    console.log('  ✓ Created new admin user');
  }

  console.log('✓ Admin user completed');
  return 1;
};
