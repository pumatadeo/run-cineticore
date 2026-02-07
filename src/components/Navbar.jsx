import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MessageSquare, Microscope, Calendar, ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/forum', label: 'Comunidad', icon: MessageSquare },
        { to: '/science', label: 'Ciencia', icon: Microscope },
        { to: '/calendar', label: 'Calendario', icon: Calendar },
        { to: '/store', label: 'Tienda', icon: ShoppingBag },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    return (
        <nav className="bg-run-blue text-run-white p-4 sticky top-0 z-50 shadow-2xl border-b border-run-gold/20">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-run-gold rounded-full flex items-center justify-center transform group-hover:rotate-[360deg] transition-transform duration-700">
                        <span className="text-run-blue font-black text-sm">RC</span>
                    </div>
                    <h1 className="text-2xl font-black italic tracking-tighter">
                        RUN CINETICORE <span className="text-run-gold">HUB</span>
                    </h1>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`hover:text-run-gold transition-all flex items-center gap-1.5 font-bold uppercase text-xs tracking-widest ${isActive(link.to) ? 'text-run-gold border-b-2 border-run-gold' : 'text-run-silver/70'}`}
                        >
                            <link.icon size={16} /> {link.label}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-run-silver/20">
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-run-gold hover:text-run-white transition-colors">
                                    <User size={20} />
                                </Link>
                            )}
                            <button onClick={logout} className="text-run-red hover:text-run-white transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-run-gold text-run-blue px-6 py-2 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-run-red hover:text-run-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Elite Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-run-gold" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-[73px] bg-run-blue/95 backdrop-blur-md z-40 p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`text-2xl font-black italic uppercase tracking-tighter ${isActive(link.to) ? 'text-run-gold' : 'text-run-white'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {!user && (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 bg-run-gold text-run-blue p-4 rounded-2xl font-black uppercase text-center"
                        >
                            Login Elite
                        </Link>
                    )}
                    {user && (
                        <button
                            onClick={() => { logout(); setIsOpen(false); }}
                            className="mt-4 bg-run-red text-run-white p-4 rounded-2xl font-black uppercase"
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
