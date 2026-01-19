/**
 * Dashboard Page
 * Displays a list of logged dreams and their AI-generated analysis tags.
 */
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

/**
 * Dashboard Component
 * 
 * Fetches and displays the user's dream history using a responsive grid layout.
 * Visualizes AI tag metadata (Lucidity, Emotions, Symbols).
 */
const Dashboard = () => {
    const [dreams, setDreams] = useState([]);

    useEffect(() => {
        const fetchDreams = async () => {
            try {
                const res = await api.get('/dreams');
                setDreams(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDreams();
    }, []);

    return (
        <div className="min-h-screen bg-dream-dark text-slate-100 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-white">Dreamscape</h1>
                    <Link
                        to="/log"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full font-medium transition shadow-lg shadow-indigo-500/20"
                    >
                        + New Dream
                    </Link>
                </header>

                <div className="grid gap-6">
                    {dreams.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">
                            <p className="text-xl">Your canvas is empty.</p>
                            <p className="mt-2">Record your first dream to begin weaving.</p>
                        </div>
                    ) : (
                        dreams.map(dream => (
                            <div key={dream._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/30 transition shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-indigo-400 text-sm font-mono">
                                        {new Date(dream.date).toLocaleDateString()}
                                    </span>
                                    {dream.lucidScore > 50 && (
                                        <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/20">
                                            Lucid Potential
                                        </span>
                                    )}
                                </div>

                                <p className="text-slate-300 line-clamp-3 mb-4 font-light">
                                    {dream.rawText}
                                </p>

                                {/* Tags/Symbols */}
                                <div className="flex flex-wrap gap-2">
                                    {dream.symbols?.slice(0, 3).map((sym, i) => (
                                        <span key={i} className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                                            #{sym}
                                        </span>
                                    ))}
                                    {dream.emotions?.length > 0 && (
                                        <span className="text-xs bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full">
                                            {dream.emotions[0].type}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
