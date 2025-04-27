const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        // unique: true, // removed to avoid unique constraint on null
        sparse: true
    },
    profilePicture: {
        type: String,
        default: 'default-avatar.png'
    },
    level: {
        type: Number,
        default: 1
    },
    experience: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 100
    },
    achievements: [{
        name: String,
        description: String,
        dateEarned: Date,
        icon: String
    }],
    statistics: {
        totalQuizzesTaken: {
            type: Number,
            default: 0
        },
        totalQuestionsAnswered: {
            type: Number,
            default: 0
        },
        correctAnswers: {
            type: Number,
            default: 0
        },
        bestScore: {
            type: Number,
            default: 0
        },
        lastQuizDate: {
            type: Date
        }
    },
    preferences: {
        theme: { type: String, default: 'dark' },
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true }
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    powerups: {
        fiftyFifty: { type: Number, default: 3 },
        skipQuestion: { type: Number, default: 2 },
        extraTime: { type: Number, default: 2 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    try {
        // Only hash the password if it has been modified or is new
        if (!this.isModified('password')) {
            return next();
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Method to calculate level and XP
userSchema.methods.updateExperience = function(earnedXP) {
    this.experience += earnedXP;
    this.level = Math.floor(1 + Math.sqrt(this.experience / 100));
    return this.save();
};

// Pre-save middleware to trim username
userSchema.pre('save', function(next) {
    if (this.isModified('username')) {
        this.username = this.username.trim();
    }
    next();
});

module.exports = mongoose.model('User', userSchema); 