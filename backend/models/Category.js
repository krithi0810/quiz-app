const mongoose = require('mongoose');
const defaultCategories = require('../data/defaultCategories');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    points: { type: Number, required: true, default: 10 },
    difficulty: { 
        type: String, 
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    questions: [questionSchema]
}, {
    timestamps: true
});

// Static method to initialize default categories
categorySchema.statics.initializeDefaultCategories = async function() {
    try {
        // Check if categories exist
        const count = await this.countDocuments();
        if (count === 0) {
            console.log('No categories found. Initializing default categories...');
            await this.deleteMany({}); // Clear any partial data
            await this.insertMany(defaultCategories);
            console.log('Default categories initialized successfully!');
        } else {
            // Update existing categories with new questions and difficulties
            for (const defaultCategory of defaultCategories) {
                await this.findOneAndUpdate(
                    { name: defaultCategory.name },
                    defaultCategory,
                    { upsert: true, new: true }
                );
            }
            console.log('Categories updated successfully!');
        }
    } catch (error) {
        console.error('Error initializing default categories:', error);
        throw error;
    }
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 