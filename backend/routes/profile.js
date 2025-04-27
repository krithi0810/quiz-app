const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');

// Get user profile
router.get('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('achievements');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user profile
router.put('/:userId', auth, async (req, res) => {
    try {
        const { theme, notifications, profilePicture } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (theme) user.preferences.theme = theme;
        if (notifications !== undefined) user.preferences.notifications = notifications;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user achievements
router.get('/:userId/achievements', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('achievements');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.achievements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Buy powerup
router.post('/:userId/powerup', auth, async (req, res) => {
    try {
        const { type, cost } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.coins < cost) {
            return res.status(400).json({ message: 'Not enough coins' });
        }

        user.coins -= cost;
        user.powerups[type]++;
        await user.save();

        res.json({
            message: 'Powerup purchased successfully',
            coins: user.coins,
            powerups: user.powerups
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user statistics
router.put('/:userId/stats', auth, async (req, res) => {
    try {
        const { quizScore, timeSpent, questionsAnswered } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update statistics
        user.statistics.totalQuizzesTaken++;
        user.statistics.totalQuestionsAnswered += questionsAnswered;
        user.statistics.correctAnswers += quizScore;
        
        // Update averages
        user.statistics.averageScore = 
            (user.statistics.averageScore * (user.statistics.totalQuizzesTaken - 1) + quizScore) / 
            user.statistics.totalQuizzesTaken;
        
        user.statistics.averageTime = 
            (user.statistics.averageTime * (user.statistics.totalQuizzesTaken - 1) + timeSpent) / 
            user.statistics.totalQuizzesTaken;

        // Update best score if current score is higher
        if (quizScore > user.statistics.bestScore) {
            user.statistics.bestScore = quizScore;
        }

        // Update streak
        const lastQuizDate = user.statistics.lastQuizDate;
        const today = new Date();
        if (lastQuizDate && 
            today.getDate() === lastQuizDate.getDate() + 1 &&
            today.getMonth() === lastQuizDate.getMonth() &&
            today.getFullYear() === lastQuizDate.getFullYear()) {
            user.statistics.quizStreak++;
        } else if (!lastQuizDate || today.getDate() !== lastQuizDate.getDate()) {
            user.statistics.quizStreak = 1;
        }
        user.statistics.lastQuizDate = today;

        // Award experience points
        const xpGained = Math.floor(quizScore * 10 + timeSpent / 10);
        await user.updateExperience(xpGained);

        await user.save();

        // Check for achievements
        await Achievement.checkAndAward(user._id, 'quiz_completion', user.statistics.totalQuizzesTaken);
        await Achievement.checkAndAward(user._id, 'score', user.statistics.bestScore);
        await Achievement.checkAndAward(user._id, 'streak', user.statistics.quizStreak);

        res.json({
            message: 'Statistics updated successfully',
            statistics: user.statistics,
            level: user.level,
            experience: user.experience
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 