import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Beaker, Apple, ChevronRight, BookOpen, ExternalLink, Calendar as CalendarIconLucide } from 'lucide-react';
import { motion } from 'framer-motion';

const ArticlesArchive = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/science-articles.json')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                if (data.length > 0) {
                    setSelectedArticle(data[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading science history:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-run-silver font-bold animate-pulse text-center p-12">Consultando archivos académicos...</div>;
    }

    if (articles.length === 0) {
        return <div className="text-run-blue/50 text-center italic p-12">No hay artículos científicos registrados aún.</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
            {/* Sidebar Histórico */}
            <div className="w-full lg:w-1/3 border-r-2 border-run-silver/10 pr-4 overflow-y-auto max-h-[600px] space-y-2 custom-scrollbar">
                <h3 className="text-xs font-black uppercase text-run-silver tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={14} /> HEMEROTECA ({articles.length})
                </h3>
                {articles.map((article) => (
                    <div 
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border-l-4 ${selectedArticle?.id === article.id 
                            ? 'bg-run-blue/5 border-run-blue shadow-inner' 
                            : 'bg-transparent border-transparent hover:bg-run-silver/5 hover:border-run-silver/30'}`}
                    >
                        <h4 className={`text-sm font-bold leading-tight mb-2 ${selectedArticle?.id === article.id ? 'text-run-blue' : 'text-run-blue/70'}`}>
                            {article.title.substring(0, 60)}...
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-run-silver uppercase font-bold tracking-widest">
                            <CalendarIconLucide size={10} />
                            {new Date(article.pubDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lector Principal */}
            <div className="w-full lg:w-2/3 pl-0 lg:pl-4">
                {selectedArticle && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        key={selectedArticle.id}
                    >
                        <span className="bg-run-gold/20 text-run-gold text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded inline-block mb-4">
                            DOCUMENTO CIENTÍFICO
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-black italic text-run-blue mb-4 leading-tight">
                            {selectedArticle.title}
                        </h2>
                        
                        <div className="flex items-center gap-2 text-xs font-bold text-run-silver uppercase tracking-widest mb-8 pb-4 border-b border-run-silver/10">
                            <CalendarIconLucide size={14} /> 
                            {new Date(selectedArticle.pubDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>

                        <div className="prose prose-sm max-w-none text-run-blue/80 mb-8 whitespace-pre-wrap leading-relaxed" 
                             dangerouslySetInnerHTML={{__html: selectedArticle.contentSnippet || "Sin contenido detallado."}}>
                        </div>

                        <a 
                            href={selectedArticle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-run-blue text-run-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-run-gold hover:text-run-blue transition-colors transform skew-x-[-12deg]"
                        >
                            LEER ESTUDIO ORIGINAL <ExternalLink size={14} />
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const Technique = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-black italic text-run-blue border-b-2 border-run-gold pb-2 inline-block">BIOMECÁNICA & CADENCIA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-run-blue text-run-white p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 text-run-gold">Cadencia Ideal: 180 PPM</h4>
                <p className="text-run-silver mb-4 italic">"La magia de la eficiencia está en tus pies."</p>
                <p className="text-sm">
                    Mantener <strong className="text-run-white">180 pasos por minuto</strong> reduce el tiempo de contacto con el suelo y minimiza el impacto en las articulaciones.
                    Estudios biomecánicos sugieren que esta cadencia es el "punto dulce" para el ahorro de energía.
                </p>
            </div>
            <div className="bg-run-silver/10 border-2 border-run-silver/20 p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 text-run-blue">Placas de Carbono</h4>
                <p className="text-sm">
                    La tecnología de fibra de carbono mejora la economía de carrera entre un <strong className="text-run-red">2.7% y 4.2%</strong>.
                    Actúan como una palanca que optimiza el despegue y reduce la fatiga muscular en distancias largas.
                    <cite className="block mt-4 text-[10px] text-run-blue/50">Fuente: Journal of Applied Physiology</cite>
                </p>
            </div>
        </div>
    </div>
);

const Methods = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-black italic text-run-blue border-b-2 border-run-gold pb-2 inline-block">SISTEMA VDOT (JACK DANIELS)</h3>
        <div className="overflow-x-auto bg-run-white border border-run-silver/20 rounded-2xl shadow-xl">
            <table className="w-full text-left">
                <thead className="bg-run-blue text-run-white">
                    <tr>
                        <th className="p-4">Zona</th>
                        <th className="p-4">Intensidad (%FC Máx)</th>
                        <th className="p-4">Propósito</th>
                    </tr>
                </thead>
                <tbody className="text-run-blue">
                    <tr className="border-b bg-run-silver/5">
                        <td className="p-4 font-bold text-run-gold">E (Easy)</td>
                        <td className="p-4">65% - 79%</td>
                        <td className="p-4 font-medium italic">Base aeróbica, fortalecimiento cardiaco y recuperación.</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-4 font-bold text-run-orange">M (Marathon)</td>
                        <td className="p-4">80% - 90%</td>
                        <td className="p-4 font-medium italic">Especificidad de ritmo de carrera, eficiencia metabólica.</td>
                    </tr>
                    <tr className="border-b bg-run-silver/5">
                        <td className="p-4 font-bold text-run-red">T (Threshold)</td>
                        <td className="p-4">88% - 92%</td>
                        <td className="p-4 font-medium italic">Mejora del umbral de lactato y resistencia a la fatiga.</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-4 font-bold text-run-pink">I (Interval)</td>
                        <td className="p-4">98% - 100%</td>
                        <td className="p-4 font-medium italic">Optimización de VO2 Máx y potencia aeróbica.</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-bold text-run-blue">R (Repetition)</td>
                        <td className="p-4">N/A (Anaeróbico)</td>
                        <td className="p-4 font-medium italic">Economía de carrera y velocidad máxima.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const Nutrition = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-black italic text-run-blue border-b-2 border-run-gold pb-2 inline-block">NUTRICIÓN DE RENDIMIENTO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-4 border-run-gold rounded-3xl bg-run-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-run-gold rounded-full flex items-center justify-center text-run-blue">
                        <Beaker size={24} />
                    </div>
                    <h4 className="text-2xl font-black italic">CARGA DE HC</h4>
                </div>
                <p className="text-3xl font-black text-run-blue mb-2">10-12 <span className="text-lg font-bold text-run-silver">g/kg</span></p>
                <p className="text-sm text-run-blue/70">
                    En los días previos a un Major, la carga debe ser agresiva para saturar los depósitos de glucógeno.
                    Prioriza carbohidratos complejos y reduce fibra para evitar malestar.
                </p>
            </div>
            <div className="p-8 border-4 border-run-red rounded-3xl bg-run-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-run-red rounded-full flex items-center justify-center text-run-white">
                        <Apple size={24} />
                    </div>
                    <h4 className="text-2xl font-black italic">EN CARRERA</h4>
                </div>
                <p className="text-3xl font-black text-run-blue mb-2">60-90 <span className="text-lg font-bold text-run-silver">g/hora</span></p>
                <p className="text-sm text-run-blue/70">
                    Crucial en esfuerzos mayores a 60 minutos. Entrena tu sistema digestivo para tolerar mezclas de glucosa y fructosa.
                </p>
            </div>
        </div>
    </div>
);

const Science = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || 'technique';

    const NavItem = ({ to, label, icon: Icon, active }) => (
        <Link
            to={to}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${active
                    ? 'bg-run-blue text-run-white shadow-lg skew-x-[-6deg]'
                    : 'bg-run-silver/10 text-run-blue/60 hover:bg-run-silver/20'
                }`}
        >
            <Icon size={18} />
            <span>{label}</span>
            {active && <ChevronRight size={16} className="ml-auto" />}
        </Link>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Submenu Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <h2 className="text-3xl font-black italic mb-6">CIENCIA</h2>
                    <NavItem to="/science/articles" label="Artículos" icon={BookOpen} active={currentPath === 'articles'} />
                    <NavItem to="/science/technique" label="Técnica" icon={Activity} active={currentPath === 'technique'} />
                    <NavItem to="/science/methods" label="Métodos" icon={Beaker} active={currentPath === 'methods'} />
                    <NavItem to="/science/nutrition" label="Nutrición" icon={Apple} active={currentPath === 'nutrition'} />
                </div>

                {/* Content Area */}
                <div className="flex-grow">
                    <motion.div
                        key={currentPath}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-run-white rounded-3xl p-8"
                    >
                        <Routes>
                            <Route path="articles" element={<ArticlesArchive />} />
                            <Route path="technique" element={<Technique />} />
                            <Route path="methods" element={<Methods />} />
                            <Route path="nutrition" element={<Nutrition />} />
                            <Route path="*" element={<ArticlesArchive />} />
                        </Routes>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Science;
