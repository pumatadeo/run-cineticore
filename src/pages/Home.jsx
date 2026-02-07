import React from 'react';
import Hero from '../components/Hero';
import { TrendingUp, Hash, Award, Clock } from 'lucide-react';

const NewsCard = ({ date, title, description, image }) => (
    <div className="bg-run-blue/5 border border-run-silver/20 rounded-xl p-4 card-hover overflow-hidden">
        <div className="h-40 rounded-lg mb-4 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-run-gold text-run-blue text-[10px] font-bold px-2 py-1 rounded">
                PROXIMAMENTE
            </div>
        </div>
        <div className="flex items-center gap-2 text-run-pink text-xs font-bold mb-2">
            <Clock size={12} />
            <span>{date}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-run-blue">{title}</h3>
        <p className="text-sm text-run-blue/70 mb-4">{description}</p>
        <button className="text-run-red font-bold text-xs uppercase tracking-widest hover:underline">Leer más →</button>
    </div>
);

const Home = () => {
    return (
        <div className="bg-run-white">
            <Hero />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Main Content: News */}
                    <div className="lg:col-span-3">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-run-red pl-4">
                            NOTICIAS <span className="text-run-gold">ACTUALES</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <NewsCard
                                date="1 de Marzo, 2026"
                                title="Maratón Lala 2026"
                                description="La fiesta lagunera se prepara para recibir a miles de corredores en Torreón. ¿Estás listo para las 2:10?"
                                image="https://images.unsplash.com/photo-1533560235473-99d9e4744095?q=80&w=2069&auto=format&fit=crop"
                            />
                            <NewsCard
                                date="12 de Julio, 2026"
                                title="Medio Maratón CDMX"
                                description="El corazón de México late en cada kilómetro de Reforma. Una prueba de fuego antes del Maratón."
                                image="https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?q=80&w=2072&auto=format&fit=crop"
                            />
                            <NewsCard
                                date="30 de Agosto, 2026"
                                title="Maratón CDMX Telcel"
                                description="El evento cumbre del running en México. De CU al Zócalo, la ciudad es tuya."
                                image="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop"
                            />
                        </div>
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
                                    <span className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none">
                                        <Hash size={12} /> CorredoresMX
                                    </span>
                                    <span className="text-sm font-medium">8.4k posts hoy</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none">
                                        <Hash size={12} /> WorldMarathonMajors
                                    </span>
                                    <span className="text-sm font-medium">12.1k posts hoy</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="flex items-center gap-1 text-run-pink text-xs font-bold uppercase tracking-widest leading-none">
                                        <Hash size={12} /> RunningTech
                                    </span>
                                    <span className="text-sm font-medium">5.2k posts hoy</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-run-gold/10 border-2 border-run-gold/30 p-6 rounded-2xl">
                            <h3 className="text-run-blue text-xl font-black italic flex items-center gap-2 mb-4">
                                <Award size={24} /> ENTRENAMIENTO
                            </h3>
                            <p className="text-sm text-run-blue/80 mb-4">
                                La técnica de cadencia ideal es de <strong className="text-run-red">180 pasos/min</strong>. Mantenerla mejora la eficiencia y reduce el impacto.
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
