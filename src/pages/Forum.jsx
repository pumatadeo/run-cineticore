import React, { useState } from 'react';
import { MessageCircle, Heart as HeartLucide, Share2, PlusCircle, ShieldCheck } from 'lucide-react';

const Forum = () => {
    const [activeCategory, setActiveCategory] = useState('Todas');
    const categories = ['Todas', 'Experiencias', 'Crónicas de Carrera', 'Consultas Técnicas'];

    const posts = [
        {
            id: 1,
            title: "Consistencia en el sistema VDOT",
            author: "PumaTadeo",
            category: "Consultas Técnicas",
            content: "¿Alguien ha notado que el ritmo E se siente demasiado lento al inicio del ciclo? Jack Daniels sugiere que es vital para la economía de carrera.",
            likes: 24,
            replies: 8,
            isVerified: true
        },
        {
            id: 2,
            title: "Mi primer Maratón de Chicago",
            author: "RocketRunner",
            category: "Crónicas de Carrera",
            content: "La humedad estuvo pesada pero las placas de carbono realmente ayudaron en los últimos 5km. ¡Logré el BQ!",
            likes: 56,
            replies: 12,
            isVerified: false
        },
        {
            id: 3,
            title: "Carga de carbohidratos: Mi receta",
            author: "NutriElite",
            category: "Experiencias",
            content: "Para mis 70kg, consumo 700g de HC 48 horas antes. El arroz y la avena son mis mejores aliados.",
            likes: 42,
            replies: 15,
            isVerified: true
        }
    ];

    const filteredPosts = activeCategory === 'Todas'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter mb-2">
                        COMUNIDAD <span className="text-run-gold">FORO</span>
                    </h2>
                    <p className="text-run-silver uppercase text-xs font-bold tracking-widest">Comparte, aprende y corre con la élite</p>
                </div>
                <button className="bg-run-red text-run-white px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-run-blue transition-all flex items-center gap-2 transform skew-x-[-12deg]">
                    <PlusCircle size={20} /> NUEVO HILO
                </button>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === cat
                            ? 'bg-run-blue text-run-white shadow-lg'
                            : 'bg-run-silver/10 text-run-blue/60 hover:bg-run-silver/20'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Posts List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredPosts.map(post => (
                    <div key={post.id} className="bg-run-white border-b-2 border-run-silver/10 p-8 hover:bg-run-silver/5 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-run-gold/10 text-run-gold px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest leading-none">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1 text-run-silver text-[10px] font-bold">
                                {post.isVerified && <ShieldCheck size={14} className="text-run-blue" />}
                                <span>POSTEADO POR <span className="text-run-blue">{post.author.toUpperCase()}</span></span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black italic text-run-blue mb-4 group-hover:text-run-red transition-colors cursor-pointer capitalize">
                            {post.title}
                        </h3>
                        <p className="text-run-blue/70 mb-8 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-8 text-run-silver font-black text-xs uppercase tracking-widest">
                            <button className="flex items-center gap-2 hover:text-run-red transition-colors">
                                <HeartLucide size={18} /> {post.likes}
                            </button>
                            <button className="flex items-center gap-2 hover:text-run-blue transition-colors">
                                <MessageCircle size={18} /> {post.replies} RESPUESTAS
                            </button>
                            <button className="flex items-center gap-2 ml-auto hover:text-run-blue transition-colors">
                                <Share2 size={18} /> COMPARTIR
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Manual de Convivencia Alert */}
            <div className="mt-20 p-8 bg-run-blue text-run-white rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-run-gold/20 rounded-full blur-3xl"></div>
                <h4 className="text-xl font-black italic mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-run-gold" /> MANUAL DE CONVIVENCIA
                </h4>
                <p className="text-sm text-run-silver leading-relaxed max-w-3xl">
                    En Run CinetiCore Hub, la información es poder. Por ello, exigimos que toda recomendación técnica o de nutrición esté basada en evidencia científica o citada de fuentes de autoridad. El respeto por el proceso del otro es la base de nuestra comunidad de élite.
                </p>
            </div>
        </div>
    );
};

export default Forum;
