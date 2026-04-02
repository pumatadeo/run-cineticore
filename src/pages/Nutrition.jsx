import React from 'react';
import { Apple, Activity, Heart, Flame, Droplet, Coffee, ArrowRight, ExternalLink, Info } from 'lucide-react';

const Nutrition = () => {
    const dailyTips = [
        {
            day: "DOMINGO",
            title: "Planificación Estratégica",
            tip: "Prepara tus comidas de la semana hoy (Meal Prep). La organización es la clave para evitar opciones hipercalóricas y mantener tu peso de carrera óptimo cuando el tiempo es escaso.",
            icon: <Apple className="text-run-red" size={40} />,
            color: "from-run-red to-[#FF6B6B]"
        },
        {
            day: "LUNES",
            title: "Hidratación Elite",
            tip: "Comienza tu día con 500ml de agua antes del café. Un músculo bien hidratado rinde hasta un 20% más y se recupera mucho más rápido del impacto continuo.",
            icon: <Droplet className="text-blue-400" size={40} />,
            color: "from-blue-600 to-blue-400"
        },
        {
            day: "MARTES",
            title: "Proteína de Recuperación",
            tip: "Asegura 20-30g de proteína de alta calidad en la ventana de 30-45 minutos post-entrenamiento (especialmente después de series de velocidad) para maximizar la síntesis y reparación muscular.",
            icon: <Activity className="text-run-gold" size={40} />,
            color: "from-run-gold to-yellow-600"
        },
        {
            day: "MIÉRCOLES",
            title: "Energía Sostenida",
            tip: "Prioriza los carbohidratos complejos como la avena, el camote o el arroz integral. Ofrecen una liberación de energía lenta, evitando picos de insulina y fatiga prematura.",
            icon: <Flame className="text-orange-500" size={40} />,
            color: "from-orange-600 to-orange-400"
        },
        {
            day: "JUEVES",
            title: "Poder Antiinflamatorio",
            tip: "No le temas a las grasas saludables. El aguacate, las nueces y el aceite de oliva extra virgen reducen significativamente la inflamación sistémica inducida por tu plan de entrenamiento intenso.",
            icon: <Heart className="text-run-pink" size={40} />,
            color: "from-run-pink to-pink-500"
        },
        {
            day: "VIERNES",
            title: "Micronutrientes Clave",
            tip: "Añade más colores a tus platos. Los antioxidantes presentes en vegetales oscuros y frutos rojos combaten los radicales libres y el estrés metabólico derivado de los ritmos exigentes.",
            icon: <Coffee className="text-run-blue" size={40} />,
            color: "from-run-blue to-teal-500"
        },
        {
            day: "SÁBADO",
            title: "Preparación de Glucógeno",
            tip: "Si mañana te toca la ansiada 'tirada larga', aumenta inteligentemente tu carga de carbohidratos hoy y minimiza la ingesta de fibra pesada por la noche. Tu sistema digestivo te lo agradecerá.",
            icon: <Apple className="text-green-500" size={40} />,
            color: "from-green-600 to-green-400"
        }
    ];

    const todayIndex = new Date().getDay();
    const todayTip = dailyTips[todayIndex];

    return (
        <div className="bg-run-white min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-run-blue text-run-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-run-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-run-red/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-run-white to-run-gold">
                        NUTRICIÓN ALTO RENDIMIENTO
                    </h1>
                    <p className="text-run-silver text-lg max-w-2xl font-medium">
                        El combustible adecuado es el límite entre un buen entrenamiento y una marca personal. Explora consejos diarios, nuestra plataforma de control y maximiza tu potencial.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Daily Tip Highlight Card (Glassmorphism) */}
                <div className={`bg-gradient-to-br ${todayTip.color} p-1 rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500`}>
                    <div className="bg-run-blue/95 backdrop-blur-xl p-8 md:p-12 rounded-[22px] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-run-white/10 rounded-full flex items-center justify-center border border-run-white/20">
                            {todayTip.icon}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-block px-4 py-1.5 bg-run-white/10 text-run-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-run-white/10 shadow-inner">
                                CONSEJO DEL DÍA • {todayTip.day}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black italic text-run-white mb-4">
                                {todayTip.title}
                            </h2>
                            <p className="text-run-silver/90 text-lg leading-relaxed font-medium">
                                {todayTip.tip}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* External Platform Card */}
                    <div className="bg-run-white border border-run-silver/20 hover:border-run-gold/50 shadow-lg hover:shadow-xl rounded-3xl p-8 transition-all duration-300 group flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 bg-run-gold/20 text-run-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-2xl font-black italic text-run-blue mb-4">Plataforma de Control Alimenticio</h3>
                            <p className="text-run-blue/70 mb-8 font-medium">
                                Accede a nuestra plataforma avanzada e interactiva para mantener un monitoreo preciso y control macro-nutricional de tu dieta. Analiza tus ingestas y descubre cómo tu alimentación impacta directamente en tus tiempos de carrera.
                            </p>
                        </div>
                        <a 
                            href="https://claude.ai/public/artifacts/9a0c8665-7773-4d5e-9bc3-47d0fab738f4" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full bg-run-blue text-run-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-run-gold hover:text-run-blue transition-colors group/btn"
                        >
                            <span>Abrir Plataforma Visual</span>
                            <ExternalLink size={18} className="transform group-hover/btn:scale-125 transition-transform" />
                        </a>
                    </div>

                    {/* Weekly preview card */}
                    <div className="bg-run-blue/5 border border-run-silver/20 rounded-3xl p-8 h-full flex flex-col">
                         <div className="flex items-center gap-3 mb-6">
                            <Info className="text-run-blue" size={24} />
                            <h3 className="text-xl font-black text-run-blue uppercase italic">Ajustes según ciclo</h3>
                        </div>
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                            <div className="bg-run-white p-4 rounded-xl border border-run-silver/20 shadow-sm flex items-center gap-4">
                                <div className="w-2 h-10 bg-run-blue rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-run-blue">Fase de Volumen Base</h4>
                                    <p className="text-sm text-run-blue/60">Balance: 55% Carbos, 25% Grasas, 20% Proteína.</p>
                                </div>
                            </div>
                            <div className="bg-run-white p-4 rounded-xl border border-run-silver/20 shadow-sm flex items-center gap-4">
                                <div className="w-2 h-10 bg-run-gold rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-run-blue">Fase Intensidad (Intervalos)</h4>
                                    <p className="text-sm text-run-blue/60">Aumenta carbos rápidos post-esfuerzo intenso.</p>
                                </div>
                            </div>
                            <div className="bg-run-white p-4 rounded-xl border border-run-silver/20 shadow-sm flex items-center gap-4">
                                <div className="w-2 h-10 bg-run-red rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-run-blue">Tapering (Semana de Carrera)</h4>
                                    <p className="text-sm text-run-blue/60">Reduce volumen, sube porcentaje de Carbos a 65%+.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;
