/**
 * User Mongoose Model
 * Defines schema for authentication, profile data, and user settings.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    settings: {
        wantsNotifications: { type: Boolean, default: true }
    }
});

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
