const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number,  // Time spent in seconds
    required: true
  },
  answeredQuestions: [{
    questionNumber: Number,
    correct: Boolean,
    timeSpent: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

// Add a method to calculate percentage
scoreSchema.methods.getPercentage = function() {
  return (this.score / this.totalQuestions) * 100;
};

module.exports = mongoose.model('Score', scoreSchema);