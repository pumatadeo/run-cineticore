import React from 'react';
import { ShoppingBag, ExternalLink, Zap, Star } from 'lucide-react';

const StoreLink = ({ name, url, description, color }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-run-white border-2 border-run-silver/10 p-8 rounded-[2rem] hover:border-run-gold transition-all hover:shadow-2xl flex flex-col justify-between h-full transform hover:scale-[1.02]"
    >
        <div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${color}`}>
                <ShoppingBag size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-black italic text-run-blue uppercase mb-2 flex items-center gap-2">
                {name} <ExternalLink size={16} className="text-run-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-run-blue/60 text-sm font-medium leading-relaxed mb-6">
                {description}
            </p>
        </div>
        <div className="flex items-center gap-2 text-run-gold font-black text-[10px] uppercase tracking-[0.3em]">
            <Zap size={12} fill="currentColor" /> TIENDA OFICIAL
        </div>
    </a>
);

const Store = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
                    TIENDA <span className="text-run-gold uppercase">OFICIAL</span> <ShoppingBag size={32} />
                </h2>
                <p className="text-run-silver uppercase text-xs font-bold tracking-widest mt-2">Equipamiento de alto rendimiento</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StoreLink
                    name="Adidas"
                    url="https://www.adidas.mx/running"
                    description="Hogar de la tecnología Adizero y récords mundiales en maratón."
                    color="bg-black"
                />
                <StoreLink
                    name="Nike"
                    url="https://www.nike.com/mx/running"
                    description="Innovación con Vaporfly y Alphafly, diseñadas para romper barreras."
                    color="bg-run-red"
                />
                <StoreLink
                    name="Asics"
                    url="https://www.asics.com.mx/running"
                    description="Especialistas en biomecánica con la serie Metaspeed y Gel-Kayano."
                    color="bg-run-blue"
                />
                <StoreLink
                    name="Innovasport"
                    url="https://www.innovasport.com/running"
                    description="El principal retailer deportivo en México con las mejores marcas."
                    color="bg-run-orange"
                />
                <StoreLink
                    name="Martí"
                    url="https://www.marti.mx/running"
                    description="Tradición y variedad para todo tipo de corredor."
                    color="bg-run-gold"
                />
            </div>

            <div className="mt-20 p-12 bg-run-blue text-run-white rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-run-pink/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-run-gold/10 rounded-full blur-3xl"></div>

                <Star size={48} className="text-run-gold mb-6 animate-pulse" fill="currentColor" />
                <h3 className="text-3xl font-black italic mb-4 uppercase">¿Buscas algo específico?</h3>
                <p className="text-run-silver max-w-xl text-lg mb-8 italic">
                    Nuestros expertos analizan cada placa de carbono y gel energético para que tomes la mejor decisión basada en ciencia.
                </p>
                <button className="bg-run-white text-run-blue px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-run-gold transition-all transform hover:scale-105">
                    Escríbenos
                </button>
            </div>
        </div>
    );
};

export default Store;
