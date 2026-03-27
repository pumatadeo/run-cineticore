import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, MessageSquare, Trash2, Edit, Activity, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('forum');
    const [accessLogs, setAccessLogs] = useState([]);

    useEffect(() => {
        const logs = JSON.parse(localStorage.getItem('rc_access_logs') || '[]');
        setAccessLogs(logs);
    }, []);

    const forumPosts = [
        { id: 1, author: 'KipchogeFan', category: 'Crónicas', title: 'Sub 3 en CDMX', status: 'Approved' },
        { id: 2, author: 'TechRunner', category: 'Técnica', title: '¿Alphafly 3 vs Vaporfly 3?', status: 'Pending' },
        { id: 3, author: 'Beginner_10k', category: 'Experiencias', title: 'Mi primer 10k', status: 'Approved' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black italic tracking-tighter">
                    PANEL <span className="text-run-gold">ADMIN</span>
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-run-blue font-bold uppercase text-xs">Hola, {user?.name}</span>
                    <button
                        onClick={logout}
                        className="bg-run-red text-run-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-run-blue transition-colors"
                    >
                        LOGOUT
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Admin Sidebar */}
                <div className="space-y-2">
                    <button
                        onClick={() => setActiveTab('forum')}
                        className={`w-full text-left px-6 py-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'forum' ? 'bg-run-blue text-run-white shadow-xl scale-[1.05]' : 'bg-run-silver/10 text-run-blue/60 hover:bg-run-silver/20'}`}
                    >
                        <MessageSquare size={18} /> GESTIÓN FORO
                    </button>
                    <button
                        onClick={() => setActiveTab('accessLogs')}
                        className={`w-full text-left px-6 py-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'accessLogs' ? 'bg-run-blue text-run-white shadow-xl scale-[1.05]' : 'bg-run-silver/10 text-run-blue/60 hover:bg-run-silver/20'}`}
                    >
                        <BookOpen size={18} /> REGISTRO ACCESOS
                    </button>
                </div>

                {/* Admin Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'forum' ? (
                        <div className="bg-run-white border border-run-silver/20 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-run-silver/10 flex justify-between items-center bg-run-blue text-run-white">
                                <h3 className="font-black italic text-xl">PUBLICACIONES RECIENTES</h3>
                                <Activity size={20} className="text-run-gold" />
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-run-silver/10 text-run-blue text-xs uppercase tracking-widest font-black">
                                    <tr>
                                        <th className="p-6">Autor</th>
                                        <th className="p-6">Categoría</th>
                                        <th className="p-6">Título</th>
                                        <th className="p-6">Status</th>
                                        <th className="p-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-run-silver/10">
                                    {forumPosts.map(post => (
                                        <tr key={post.id} className="hover:bg-run-silver/5">
                                            <td className="p-6 font-bold">{post.author}</td>
                                            <td className="p-6"><span className="bg-run-pink/10 text-run-pink px-3 py-1 rounded-full text-[10px] font-black">{post.category}</span></td>
                                            <td className="p-6 italic">{post.title}</td>
                                            <td className="p-6">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${post.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-run-orange/10 text-run-orange'}`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="p-6 flex gap-2">
                                                <button className="text-run-blue hover:text-run-gold"><Edit size={16} /></button>
                                                <button className="text-run-red hover:text-run-blue"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-run-white border border-run-silver/20 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-run-silver/10 flex justify-between items-center bg-run-blue text-run-white">
                                <h3 className="font-black italic text-xl">REGISTRO DE CONEXIONES</h3>
                                <BookOpen size={20} className="text-run-gold" />
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-run-silver/10 text-run-blue text-xs uppercase tracking-widest font-black">
                                    <tr>
                                        <th className="p-6">Usuario (Email)</th>
                                        <th className="p-6">Fecha y Hora de Acceso</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-run-silver/10">
                                    {accessLogs.map(log => (
                                        <tr key={log.id} className="hover:bg-run-silver/5">
                                            <td className="p-6 font-bold text-run-blue">{log.email}</td>
                                            <td className="p-6 text-run-silver font-bold uppercase">{log.date}</td>
                                        </tr>
                                    ))}
                                    {accessLogs.length === 0 && (
                                        <tr>
                                            <td colSpan="2" className="p-6 text-center text-run-silver font-bold">Sin registros recientes</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
