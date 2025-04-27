const express = require('express');
const app = express();
const PORT = 5000;

// Basic middleware
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
}); 