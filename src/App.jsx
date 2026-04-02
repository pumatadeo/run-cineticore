import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Forum from './pages/Forum'
import Science from './pages/Science'
import Calendar from './pages/Calendar'
import Store from './pages/Store'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import Nutrition from './pages/Nutrition'

const Footer = () => (
    <footer className="bg-run-blue text-run-white py-16 border-t border-run-gold/30">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-run-gold rounded-full flex items-center justify-center">
                        <span className="text-run-blue font-black text-xs">RC</span>
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter">RC RUN CORE <span className="text-run-gold">CULTURE</span></h2>
                </div>
                <p className="text-run-silver text-sm max-w-sm font-medium leading-relaxed">
                    La meta es solo el inicio. Somos una comunidad dedicada al running de alto rendimiento,
                    respaldada por ciencia y tecnología.
                </p>
            </div>
            <div>
                <h4 className="font-black italic text-run-gold mb-6 uppercase tracking-widest text-xs">Navegación</h4>
                <ul className="space-y-3 text-sm font-bold uppercase tracking-widest text-run-silver/60">
                    <li><a href="/" className="hover:text-run-white transition-colors">Home</a></li>
                    <li><a href="/forum" className="hover:text-run-white transition-colors">Comunidad</a></li>
                    <li><a href="/science" className="hover:text-run-white transition-colors">Ciencia</a></li>
                    <li><a href="/calendar" className="hover:text-run-white transition-colors">Calendario</a></li>
                    <li><a href="/nutrition" className="hover:text-run-white transition-colors">Nutrición</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-black italic text-run-gold mb-6 uppercase tracking-widest text-xs">Admin Elite</h4>
                <p className="text-xs text-run-silver/50 mb-4 italic">Acceso exclusivo para entrenadores y administradores autorizados.</p>
                <a href="/admin" className="text-xs font-black uppercase border-b border-run-red text-run-red hover:text-run-gold hover:border-run-gold transition-all">Panel de Control</a>
            </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-run-silver/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-run-silver/40">
            <span>© 2026 RC Run Core Culture - Alejandro Espinosa</span>
            <div className="flex gap-6">
                <a href="#" className="hover:text-run-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-run-white transition-colors">Términos</a>
                <a href="#" className="hover:text-run-white transition-colors">Evidencia Científica</a>
            </div>
        </div>
    </footer>
)

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-run-white selection:bg-run-gold selection:text-run-blue">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/forum" element={<Forum />} />
                            <Route path="/science/*" element={<Science />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/nutrition" element={<Nutrition />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Protected Admin Routes */}
                            <Route element={<ProtectedRoute adminOnly={true} />}>
                                <Route path="/admin" element={<AdminDashboard />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
