export const configuration = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUri: process.env.MONGODB_URI ,
    jwtSecret: process.env.JWT_SECRET, // Add a comma here
  });
  