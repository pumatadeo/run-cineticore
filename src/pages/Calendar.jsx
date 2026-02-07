import React from 'react';
import { Calendar as CalendarIcon, MapPin, ExternalLink, Bell } from 'lucide-react';

const RaceCard = ({ month, day, title, location, type, isKey }) => (
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
        <button className="w-12 h-12 rounded-full border border-run-silver/20 flex items-center justify-center text-run-blue hover:bg-run-gold hover:border-run-gold transition-colors">
            <ExternalLink size={18} />
        </button>
    </div>
);

const Calendar = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
                    CALENDARIO <span className="text-run-gold uppercase">2026</span> <CalendarIcon size={32} />
                </h2>
                <p className="text-run-silver uppercase text-xs font-bold tracking-widest mt-2">Fechas críticas y eventos Majors</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RaceCard
                    month="MAR"
                    day="01"
                    title="Maratón Lala"
                    location="Torreón, Coahuila"
                    type="42.195K"
                    isKey={true}
                />
                <RaceCard
                    month="ABR"
                    day="20"
                    title="Boston Marathon"
                    location="Boston, USA"
                    type="WMM"
                    isKey={false}
                />
                <RaceCard
                    month="JUL"
                    day="12"
                    title="Medio Maratón CDMX"
                    location="Ciudad de México"
                    type="21.097K"
                    isKey={true}
                />
                <RaceCard
                    month="AGO"
                    day="30"
                    title="Maratón CDMX"
                    location="Ciudad de México"
                    type="42.195K"
                    isKey={true}
                />
                <RaceCard
                    month="SEP"
                    day="27"
                    title="Berlin Marathon"
                    location="Berlin, GER"
                    type="WMM"
                    isKey={false}
                />
                <RaceCard
                    month="DIC"
                    day="13"
                    title="Maratón Monterrey"
                    location="Monterrey, NL"
                    type="42.195K"
                    isKey={true}
                />
            </div>

            <div className="mt-16 bg-run-silver/10 p-8 rounded-3xl border-dashed border-2 border-run-silver/30">
                <p className="text-center text-run-blue/60 text-sm font-bold italic">
                    * Todas las fechas están sujetas a cambios por parte de los organizadores oficiales.
                </p>
            </div>
        </div>
    );
};

export default Calendar;
