const mongoose = require('mongoose');
const defaultAchievements = require('../data/defaultAchievements');

const achievementSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ['quiz_completion', 'streak', 'score', 'time', 'social', 'special'],
        required: true
    },
    requirement: {
        type: Number,
        required: true
    },
    rewardCoins: {
        type: Number,
        default: 50
    },
    rewardXP: {
        type: Number,
        default: 100
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    unlockedBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dateUnlocked: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Static method to check and award achievements
achievementSchema.statics.checkAndAward = async function(userId, type, value) {
    try {
        const achievements = await this.find({ type });
        const user = await mongoose.model('User').findById(userId);
        
        if (!user) return;

        for (const achievement of achievements) {
            // Check if user already has this achievement
            const hasAchievement = user.achievements.some(a => a.name === achievement.name);
            if (!hasAchievement && value >= achievement.requirement) {
                // Award achievement
                user.achievements.push({
                    name: achievement.name,
                    description: achievement.description,
                    dateEarned: new Date(),
                    icon: achievement.icon
                });

                // Award rewards
                user.coins += achievement.rewardCoins;
                await user.updateExperience(achievement.rewardXP);

                // Add user to achievement's unlockedBy array
                achievement.unlockedBy.push({ user: userId });
                await achievement.save();
            }
        }
        await user.save();
    } catch (error) {
        console.error('Error checking achievements:', error);
    }
};

// Initialize default achievements
achievementSchema.statics.initializeDefaultAchievements = async function() {
    try {
        const count = await this.countDocuments();
        if (count === 0) {
            console.log('Initializing default achievements...');
            await this.insertMany(defaultAchievements);
            console.log('Default achievements initialized successfully!');
        }
    } catch (error) {
        console.error('Error initializing achievements:', error);
    }
};

module.exports = mongoose.model('Achievement', achievementSchema); 