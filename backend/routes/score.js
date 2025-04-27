const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const User = require('../models/User');

// Get all scores (leaderboard)
router.get('/', async (req, res) => {
    try {
        const scores = await Score.aggregate([
            {
                $group: {
                    _id: '$userId',
                    username: { $first: '$username' },
                    totalScore: { $sum: '$score' },
                    totalQuizzes: { $sum: 1 },
                    bestScore: { $max: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } },
                    averageScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } },
                    averageTime: { $avg: '$timeSpent' }
                }
            },
            {
                $sort: { bestScore: -1 }
            },
            {
                $limit: 10
            }
        ]);

        res.json({ leaderboard: scores });
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ message: 'Error fetching scores' });
    }
});

// Get user's scores
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const scores = await Score.find({ userId: req.params.userId })
            .sort({ date: -1 })
            .limit(10);

        const stats = await Score.aggregate([
            {
                $match: { userId: req.params.userId }
            },
            {
                $group: {
                    _id: null,
                    totalQuizzes: { $sum: 1 },
                    bestScore: { $max: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } },
                    averageScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } },
                    averageTime: { $avg: '$timeSpent' },
                    totalScore: { $sum: '$score' }
                }
            }
        ]);

        res.json({
            username: user.username,
            totalQuizzes: stats[0]?.totalQuizzes || 0,
            bestScore: stats[0]?.bestScore || 0,
            averageScore: stats[0]?.averageScore || 0,
            averageTime: stats[0]?.averageTime || 0,
            totalScore: stats[0]?.totalScore || 0,
            scores: scores
        });
    } catch (error) {
        console.error('Error fetching user scores:', error);
        res.status(500).json({ message: 'Error fetching user scores' });
    }
});

// Save score
router.post('/', async (req, res) => {
    try {
        const { userId, score, totalQuestions, timeSpent, answeredQuestions } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newScore = new Score({
            userId,
            username: user.username,
            score,
            totalQuestions,
            timeSpent,
            answeredQuestions,
            date: new Date()
        });

        await newScore.save();
        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ message: 'Error saving score' });
    }
});

// Clear all scores (admin only - you might want to add authentication)
router.delete('/clear', async (req, res) => {
    try {
        await Score.deleteMany({});
        res.json({ message: 'All scores cleared successfully' });
    } catch (error) {
        console.error('Error clearing scores:', error);
        res.status(500).json({ message: 'Error clearing scores' });
    }
});

module.exports = router;