/**
 * Dream Mongoose Model
 * Stores dream entries, analysis data, and narrative threads.
 */
const mongoose = require('mongoose');

const DreamSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // TODO: Add geo-tagging support
    rawText: {
        type: String,
        required: true
    },
    // Extracted by AI
    symbols: [String],
    emotions: [{
        type: { type: String },
        intensity: Number
    }],
    characters: [{
        name: String,
        role: String
    }],
    arc: {
        beginning: String,
        climax: String,
        unresolved: String,
        end: String
    },
    lucidScore: {
        type: Number,
        min: 0,
        max: 100
    },
    narrativeThreadId: {
        type: mongoose.Schema.Types.ObjectId, // For linking to continuity chains
        ref: 'NarrativeThread'
    }
});

module.exports = mongoose.model('Dream', DreamSchema);
