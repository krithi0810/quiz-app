const mongoose = require('mongoose');
const defaultCategories = require('./data/defaultCategories');

async function deleteAllUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/quiz-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Delete all users
        const User = require('./models/User');
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users.`);

        console.log('All user credentials deleted!');
    } catch (error) {
        console.error('Error deleting users:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

deleteAllUsers();

async function resetDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/quiz-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Drop all collections
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }
        console.log('All collections dropped');

        // Initialize default categories with more questions
        const Category = require('./models/Category');
        await Category.insertMany(defaultCategories);
        console.log('Default categories initialized with questions');

        console.log('Database reset complete!');
    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

resetDatabase(); 