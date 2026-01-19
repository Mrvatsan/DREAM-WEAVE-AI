/**
 * Dream Log Page
 * Allows users to record dreams via text or voice input.
 */
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const DreamLog = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser doesn't support voice recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(prev => (prev ? prev + ' ' + transcript : transcript));
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            // Allow user to see analysis in console for now or handle response
            const res = await api.post('/dreams', { rawText: text });
            console.log('Analysis:', res.data);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to log dream. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dream-dark text-slate-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-6">
                    Record Your Dream
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-indigo-500/20 shadow-xl relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="I was flying over a violet ocean..."
                            className="w-full h-64 bg-transparent border-0 text-lg text-slate-200 placeholder-slate-600 focus:ring-0 resize-none p-0"
                            autoFocus
                        />

                        {/* Voice Button */}
                        <button
                            type="button"
                            onClick={startListening}
                            className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all ${isListening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                }`}
                            title="Record Voice"
                        >
                            {isListening ? (
                                <span className="w-6 h-6 block">●</span>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !text.trim()}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] active:scale-95
              ${loading
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500'
                            }`}
                    >
                        {loading ? 'Analyzing Neural Patterns...' : 'Weave Dream'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DreamLog;
