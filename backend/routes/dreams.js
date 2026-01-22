/**
 * Dream Routes
 * API endpoints for logging, retrieving, and analyzing dreams.
 */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Dream = require('../models/Dream');
const { analyzeDream } = require('../services/gemini');

// @route   POST api/dreams
// @desc    Log a new dream
// @access  Private
// Integrates with Gemini AI for dream analysis
router.post('/', auth, async (req, res) => {
    try {
        const { rawText } = req.body;

        // AI Analysis
        const analysis = await analyzeDream(rawText);

        const newDream = new Dream({
            userId: req.user.id,
            rawText,
            symbols: analysis.symbols,
            emotions: analysis.emotions,
            characters: analysis.characters,
            arc: analysis.arc,
            lucidScore: analysis.lucidScore
        });

        const dream = await newDream.save();
        res.json(dream);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/dreams
// @desc    Get all dreams for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const dreams = await Dream.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(dreams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
