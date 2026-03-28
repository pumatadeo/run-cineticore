import React from 'react';
import { Calendar as CalendarIcon, MapPin, ExternalLink, Bell } from 'lucide-react';

const RaceCard = ({ dateString, title, location, type, isKey, link }) => {
    const parseDate = new Date(dateString);
    const month = parseDate.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
    const day = parseDate.toLocaleDateString('es-ES', { day: '2-digit' });

    return (
        <div className={`bg-run-white border-2 p-6 rounded-3xl flex items-center gap-6 transition-all hover:scale-[1.02] ${isKey ? 'border-run-gold shadow-xl' : 'border-run-silver/10'}`}>
            <div className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-run-blue text-run-white rounded-2xl">
                <span className="text-[10px] uppercase font-black text-run-silver">{month}</span>
                <span className="text-3xl font-black italic text-run-gold leading-none">{day}</span>
            </div>
            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-run-red/10 text-run-red text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded">
                        {type}
                    </span>
                    {isKey && <span className="bg-run-gold/20 text-run-blue text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded flex items-center gap-1"><Bell size={8} /> CLAVE</span>}
                </div>
                <h3 className="text-xl font-black italic text-run-blue uppercase tracking-tighter">{title}</h3>
                <div className="flex items-center gap-1 text-run-silver text-xs font-bold uppercase mt-1">
                    <MapPin size={12} /> {location}
                </div>
            </div>
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-run-silver/20 flex items-center justify-center text-run-blue hover:bg-run-gold text-run-white hover:text-run-blue hover:border-run-gold transition-colors flex-shrink-0"
                title="Inscripción / Portal"
            >
                <ExternalLink size={18} />
            </a>
        </div>
    );
};

const Calendar = () => {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const url = import.meta.env.BASE_URL + 'calendar-events.json';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching calendar:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3 animate-in slide-in-from-left">
                    CALENDARIO <span className="text-run-gold uppercase">GLOBAL</span> <CalendarIcon size={32} />
                </h2>
                <p className="text-run-silver uppercase text-xs font-bold tracking-widest mt-2 animate-in slide-in-from-left delay-100">Eventos Magistrales y Fechas Críticas</p>
            </div>

            {loading ? (
                <div className="text-run-silver font-bold animate-pulse p-12 text-center text-xl">Calculando próximos eventos...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom delay-200">
                    {events.map((race) => (
                        <RaceCard
                            key={race.id}
                            dateString={race.date}
                            title={race.title}
                            location={race.location}
                            type={race.type}
                            isKey={race.isKey}
                            link={race.link || "#"}
                        />
                    ))}
                </div>
            )}

            <div className="mt-16 bg-run-silver/10 p-8 rounded-3xl border-dashed border-2 border-run-silver/30">
                <p className="text-center text-run-blue/60 text-sm font-bold italic">
                    * Todas las fechas están sujetas a cambios por parte de los organizadores oficiales.
                </p>
            </div>
        </div>
    );
};

export default Calendar;
