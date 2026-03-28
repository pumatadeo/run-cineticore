import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { TrendingUp, Hash, Award, Clock } from 'lucide-react';

const NewsCard = ({ date, title, description, image, url }) => (
    <div className="bg-run-blue/5 border border-run-silver/20 rounded-xl p-4 card-hover overflow-hidden">
        <div className="h-40 rounded-lg mb-4 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-run-gold text-run-blue text-[10px] font-bold px-2 py-1 rounded">
                NUEVO
            </div>
        </div>
        <div className="flex items-center gap-2 text-run-pink text-xs font-bold mb-2">
            <Clock size={12} />
            <span>{date}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-run-blue line-clamp-2">{title}</h3>
        <p className="text-sm text-run-blue/70 mb-4 line-clamp-3">{description}</p>
        <a href={url || "#"} target="_blank" rel="noopener noreferrer" className="text-run-red font-bold text-xs uppercase tracking-widest hover:underline inline-block">Ver Artículo Completo →</a>
    </div>
);

const WeeklySummary = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeeklySummary = async () => {
            try {
                const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
                if (!webhookUrl) {
                    throw new Error("No webhook URL configured");
                }
                const response = await fetch(webhookUrl);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setSummaryData(data);
            } catch (error) {
                console.warn("Could not fetch from n8n, using fallback data.", error);
                // Fallback / Mock data
                setSummaryData({
                    week: "Semana del 20 al 26 de Marzo",
                    comments: "Esta semana se siente la adrenalina al máximo. Recuerda mantener una buena hidratación para los entrenamientos largos; el clima empieza a calentarse. ¡Sigue así, corredor!",
                    featuredRace: "Maratón Lala 2026"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklySummary();
    }, []);

    if (loading) {
        return (
            <div className="mb-12 bg-run-blue/5 border-2 border-run-silver/20 rounded-2xl p-8 animate-pulse">
                <div className="h-8 bg-run-silver/20 rounded w-1/3 mb-6"></div>
                <div className="h-4 bg-run-silver/20 rounded w-full mb-3"></div>
                <div className="h-4 bg-run-silver/20 rounded w-5/6 mb-6"></div>
                <div className="h-6 bg-run-silver/20 rounded w-1/4 pt-4 border-t border-run-silver/20"></div>
            </div>
        );
    }

    return (
        <div className="mb-12 bg-gradient-to-br from-run-blue to-run-blue/90 text-run-white rounded-2xl relative overflow-hidden group shadow-xl">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-run-gold/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative p-8 md:p-10 border border-run-gold/20 rounded-2xl">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                    <h2 className="text-2xl md:text-3xl font-black italic flex items-center gap-3">
                        <TrendingUp size={28} className="text-run-gold" />
                        <span className="text-run-white">ENTRENAMIENTO</span>
                        <span className="text-run-gold">SEMANAL</span>
                    </h2>
                    <span className="bg-run-red text-run-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block self-start md:self-auto">
                        {summaryData?.week}
                    </span>
                </div>
                
                <p className="text-lg text-run-silver/90 leading-relaxed mb-6 font-medium">
                    "{summaryData?.comments}"
                </p>
                
                <div className="flex items-center gap-3 pt-5 border-t border-run-white/10">
                    <Award className="text-run-gold" size={20} />
                    <span className="text-sm text-run-silver uppercase tracking-widest font-bold">Destacado:</span>
                    <span className="text-run-pink font-black">{summaryData?.featuredRace}</span>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    const dailyWorkouts = {
        0: 'DOMINGO - Descanso activo o trote muy suave 30m.',
        1: 'LUNES - Recovery: Trote E-pace 45m para recuperar las piernas.',
        2: 'MARTES - Series: 8x400m a ritmo de 5k con 1m recuperación.',
        3: 'MIÉRCOLES - Distancia E-pace 60m para sumar volumen metabólico.',
        4: 'JUEVES - Tempo Run: 20m Calent. + 30m T-pace + 10m Calma.',
        5: 'VIERNES - Descanso total o Cross-Training ligero.',
        6: 'SÁBADO - Long Run: 90m a 120m ritmo E-pace continuo.'
    };
    const todayWorkout = dailyWorkouts[new Date().getDay()];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = import.meta.env.BASE_URL + 'news.json';
                const response = await fetch(url);
                if (!response.ok) throw new Error("Could not fetch news.json");
                const data = await response.json();
                setNews(data);
            } catch (err) {
                console.error('Error fetching weekly news:', err);
                // Fallback to empty if fetch fails
                setNews([]);
            } finally {
                setLoadingNews(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="bg-run-white">
            <Hero />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Main Content: News & Weekly Summary */}
                    <div className="lg:col-span-3">
                        
                        {/* Weekly Summary (n8n integration) */}
                        <WeeklySummary />

                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-run-red pl-4">
                            NOTICIAS <span className="text-run-gold">ACTUALES</span>
                        </h2>
                        
                        {loadingNews ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-run-blue/5 border border-run-silver/20 rounded-xl h-80"></div>
                                ))}
                            </div>
                        ) : news.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.map((item, index) => (
                                    <NewsCard
                                        key={item.id || index}
                                        date={item.date}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        url={item.url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-run-silver/10 p-8 rounded-xl text-center">
                                <p className="font-bold text-run-blue/60 uppercase tracking-widest text-sm">No hay noticias disponibles en este momento.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Trends */}
                    <div className="space-y-8">
                        <div className="bg-run-blue text-run-white p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-run-gold/20 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-xl font-black italic flex items-center gap-2 mb-6">
                                <TrendingUp size={24} className="text-run-gold" /> TRENDS
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex flex-col">
                                    <a href="https://www.instagram.com/explore/tags/corredoresmx/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none hover:underline">
                                        <Hash size={12} /> CorredoresMX
                                    </a>
                                    <span className="text-sm font-medium">Trending hoy</span>
                                </li>
                                <li className="flex flex-col">
                                    <a href="https://www.instagram.com/explore/tags/worldmarathonmajors/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none hover:underline">
                                        <Hash size={12} /> WorldMarathonMajors
                                    </a>
                                    <span className="text-sm font-medium">Trending hoy</span>
                                </li>
                                <li className="flex flex-col">
                                    <a href="https://www.instagram.com/explore/tags/runningtech/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none hover:underline">
                                        <Hash size={12} /> RunningTech
                                    </a>
                                    <span className="text-sm font-medium">Trending hoy</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-run-gold/10 border-2 border-run-gold/30 p-6 rounded-2xl">
                            <h3 className="text-run-blue text-xl font-black italic flex items-center gap-2 mb-4">
                                <Award size={24} /> ENTRENAMIENTO DEL DÍA
                            </h3>
                            <p className="text-sm text-run-blue/80 font-bold mb-4">
                                {todayWorkout}
                            </p>
                            <div className="w-full h-1 bg-run-silver/20 rounded-full overflow-hidden">
                                <div className="h-full bg-run-red w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
