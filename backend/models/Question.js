const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 4;
            },
            message: 'Question must have exactly 4 options'
        }
    },
    correctAnswer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 10
    }
});

module.exports = mongoose.model('Question', questionSchema); 