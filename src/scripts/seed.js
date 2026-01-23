
const mongoose = require('mongoose');
const { connectDB } = require('../lib/mongoose'); // Adjust path as needed, or inline connection logic

// Since we are running in a script, we might need a simpler connection if modern import syntax is an issue with 'node'. 
// However, let's try to use the Next.js environment or just pure mongoose for seeding.

// Adjusted for CommonJS since we are running with `node`
require('dotenv').config({ path: '.env.local' });

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // We can't import the model directly if it uses ES modules and we run with `node` (without type module).
        // So we will define a temporary schema here just for seeding, OR use `babel-node` or `ts-node`.
        // Better yet, let's make a Next.js API route that seeds data, so we don't have to deal with environment issues.
        console.log("Seeding via script is complex due to ES Modules. Please use the API route /api/seed instead.");

    } catch (error) {
        console.error('Error seeding:', error);
    } finally {
        await mongoose.disconnect();
    }
};

seedCourses();
