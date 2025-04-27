const defaultAchievements = [
    {
        name: 'First Steps',
        description: 'Complete your first quiz',
        icon: '🎯',
        type: 'quiz_completion',
        requirement: 1,
        rewardCoins: 50,
        rewardXP: 100,
        rarity: 'common'
    },
    {
        name: 'Quiz Master',
        description: 'Complete 10 quizzes',
        icon: '🏆',
        type: 'quiz_completion',
        requirement: 10,
        rewardCoins: 200,
        rewardXP: 500,
        rarity: 'rare'
    },
    {
        name: 'Quiz Legend',
        description: 'Complete 50 quizzes',
        icon: '👑',
        type: 'quiz_completion',
        requirement: 50,
        rewardCoins: 1000,
        rewardXP: 2000,
        rarity: 'legendary'
    },
    {
        name: 'Perfect Score',
        description: 'Get 100% on a quiz',
        icon: '⭐',
        type: 'score',
        requirement: 100,
        rewardCoins: 500,
        rewardXP: 1000,
        rarity: 'epic'
    },
    {
        name: 'Speed Demon',
        description: 'Complete a quiz in under 5 minutes',
        icon: '⚡',
        type: 'time',
        requirement: 300,
        rewardCoins: 300,
        rewardXP: 500,
        rarity: 'rare'
    },
    {
        name: 'Streak Master',
        description: 'Maintain a 7-day quiz streak',
        icon: '🔥',
        type: 'streak',
        requirement: 7,
        rewardCoins: 700,
        rewardXP: 1000,
        rarity: 'epic'
    },
    {
        name: 'Social Butterfly',
        description: 'Share 5 quizzes with friends',
        icon: '🦋',
        type: 'social',
        requirement: 5,
        rewardCoins: 250,
        rewardXP: 300,
        rarity: 'common'
    },
    {
        name: 'Knowledge Seeker',
        description: 'Answer 1000 questions correctly',
        icon: '📚',
        type: 'special',
        requirement: 1000,
        rewardCoins: 2000,
        rewardXP: 5000,
        rarity: 'legendary'
    }
];

module.exports = defaultAchievements; 