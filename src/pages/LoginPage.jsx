import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = isLogin ? login(email, password) : register(email, password);
        if (result.success) {
            if (result.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message || 'Error de autenticación');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-run-white px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-auto max-w-md bg-run-blue p-8 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-run-gold via-run-red to-run-pink"></div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black italic text-run-white tracking-widest uppercase">
                        {isLogin ? 'ACCESO' : 'REGISTRO'} <span className="text-run-gold">ELITE</span>
                    </h2>
                    <p className="text-run-silver text-xs mt-2 uppercase tracking-widest font-bold">La meta es solo el inicio</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-run-gold" size={18} />
                        <input
                            type="email"
                            placeholder="EMAIL@EXAMPLE.COM"
                            className="w-full bg-white/10 border-b-2 border-run-silver/30 text-white p-3 pl-10 focus:outline-none focus:border-run-gold transition-colors placeholder:text-run-silver/50 font-bold uppercase"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-run-gold" size={18} />
                        <input
                            type="password"
                            placeholder="CONTRASEÑA"
                            className="w-full bg-white/10 border-b-2 border-run-silver/30 text-white p-3 pl-10 focus:outline-none focus:border-run-gold transition-colors placeholder:text-run-silver/50 font-bold uppercase"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-run-red text-xs font-bold uppercase text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-run-gold text-run-blue py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-run-white transition-all transform hover:scale-[1.02] shadow-xl"
                    >
                        {isLogin ? 'ENTRAR' : 'UNIRSE'}
                    </button>
                </form>

                <div className="mt-8 text-center text-run-silver/60 text-[10px] font-bold uppercase tracking-widest">
                    {isLogin ? (
                        <button onClick={() => setIsLogin(false)} className="hover:text-run-gold transition-colors">¿No tienes cuenta? Regístrate aquí</button>
                    ) : (
                        <button onClick={() => setIsLogin(true)} className="hover:text-run-gold transition-colors">¿Ya eres miembro? Inicia sesión</button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
