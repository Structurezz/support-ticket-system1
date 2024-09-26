import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter'; // Adjust the path accordingly
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as mongoose from 'mongoose'; 



async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());

    // Connect to MongoDB using the connection string from .env
    const mongoUri = process.env.MONGODB_URI; // Ensure your .env file has this variable
    await mongoose.connect(mongoUri)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });

    // Add error handling for MongoDB connection
    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err);
    });

    const port = process.env.PORT || 3000; // Use environment variable for port
    await app.listen(port);

    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
