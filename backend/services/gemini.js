/**
 * Gemini AI Service
 * Handles interaction with Google's Generative AI for dream analysis.
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize Gemini
// Note: Ensure GEMINI_API_KEY is set in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'API_KEY_MISSING');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Analyzes dream text using Gemini AI to extract symbols, emotions, and narrative structure.
 * 
 * @param {string} dreamText - The raw description of the dream.
 * @returns {Promise<Object>} JSON object containing symbols, emotions, characters, arc, and lucidScore.
 */
async function analyzeDream(dreamText) {
    try {
        const prompt = `
      You are DreamWeave Extractor. Analyze this dream:
      "${dreamText}"

      Extract the following in strict JSON format:
      1. symbols: Array of strings (5-10 key objects/places)
      2. emotions: Array of objects {type: string, intensity: number 1-10}
      3. characters: Array of objects {name: string, role: string}
      4. arc: Object {beginning: string, climax: string, unresolved: string, end: string}
      5. lucidScore: Number (0-100) estimating potential to have become lucid

      Return JSON ONLY. No markdown formatting.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean potential markdown code blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini Analysis Error:", err);
        // Return partial/empty structure on error to allow saving raw dream
        return {
            symbols: [],
            emotions: [],
            characters: [],
            arc: {},
            lucidScore: 0
        };
    }
}

module.exports = { analyzeDream };
