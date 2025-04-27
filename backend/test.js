console.log("Testing models...");
try {
    const User = require('./models/User');
    const Score = require('./models/Score');
    console.log("Models loaded successfully!");
} catch (error) {
    console.error("Error loading models:", error);
    process.exit(1);
}