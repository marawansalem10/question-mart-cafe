import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'JWT_EXPIRE'];

const parseFrontendOrigins = (value?: string): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const validateEnv = () => {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Validate JWT_SECRET is not using default/placeholder value in production
  const jwtSecretPlaceholders = [
    'your-super-secret-jwt-key-change-this-in-production',
    'change-this-to-a-secure-random-secret-in-production',
  ];
  if (process.env.NODE_ENV === 'production' && jwtSecretPlaceholders.includes(process.env.JWT_SECRET as string)) {
    throw new Error('JWT_SECRET must be changed from default placeholder value in production');
  }

  // Validate JWT_EXPIRE format
  const jwtExpire = process.env.JWT_EXPIRE || '30d';
  const jwtExpireRegex = /^\d+[smhd]$/;
  if (!jwtExpireRegex.test(jwtExpire)) {
    throw new Error('JWT_EXPIRE must be in format like 30d, 1h, 30m, etc.');
  }

  // Validate PORT if provided
  if (process.env.PORT) {
    const port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }
  }

  // Production CORS must be an explicit allowlist (customer and/or admin origins)
  if (process.env.NODE_ENV === 'production') {
    const frontendOrigins = parseFrontendOrigins(process.env.FRONTEND_URL);
    if (frontendOrigins.length === 0) {
      throw new Error(
        'FRONTEND_URL is required in production and must contain at least one origin (comma-separated for multiple frontends)'
      );
    }
  }
};

validateEnv();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  host: '0.0.0.0',
  mongoUri: process.env.MONGODB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  frontendOrigins: parseFrontendOrigins(process.env.FRONTEND_URL),
};

export default config;
