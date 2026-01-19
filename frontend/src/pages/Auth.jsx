/**
 * Authentication Page
 * Handles User Login and Registration forms.
 */
import React, { useState } from 'react';
import api from '../services/api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const body = isLogin ? { email, password } : { name, email, password };

            const res = await api.post(endpoint, body);

            localStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard'; // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.msg || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dream-dark text-slate-100 p-4">
            <div className="bg-dream-main p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-500/20">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {isLogin ? 'Welcome Back' : 'Join the Dream'}
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95"
                    >
                        {isLogin ? 'Enter Dreamscape' : 'Begin Journey'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already travelling? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
