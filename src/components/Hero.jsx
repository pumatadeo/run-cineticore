import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-run-blue">
            {/* Background Image Placeholder with styling */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop"
                    alt="World Marathon Major"
                    className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-run-blue/60 via-transparent to-run-blue"></div>
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-run-gold text-sm md:text-xl font-bold tracking-[0.3em] uppercase mb-4 gold-text-glow"
                >
                    World Marathon Majors
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-run-white text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-8"
                >
                    LA META ES <br />
                    <span className="text-run-gold">SOLO EL INICIO</span>
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <a
                        href="/forum"
                        className="inline-block bg-run-gold text-run-blue px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-run-red hover:text-run-white transition-all duration-300 transform hover:skew-x-[-12deg]"
                    >
                        Únete a la Élite
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-10 flex gap-4 text-run-white/50 text-[10px] tracking-widest uppercase font-bold">
                <span>CDMX . MTY . TRN . WORLD</span>
            </div>
        </div>
    );
};

export default Hero;
