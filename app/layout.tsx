'use client';
import './globals.css';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

import PlantelScreen from './PlantelScreen';
import EquipaTecnicaScreen from './EquipaTecnicaScreen';
import ClubeScreen from './ClubeScreen';
import JogosScreen from './JogosScreen'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  // NOVO ESTADO: Controla se estamos na landing page ou no site
  const [isLanding, setIsLanding] = useState(true);

  useEffect(() => {
    setMounted(true);

    const handleMudarAba = (e: any) => {
      setActiveTab(e.detail);
      // Quando mudar a aba (clicar em entrar), esconde a landing e mostra a nav
      setIsLanding(false);
    };

    window.addEventListener('mudarAba', handleMudarAba);
    return () => window.removeEventListener('mudarAba', handleMudarAba);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={14} /> },
    { name: 'Clube', icon: <Trophy size={14} /> },
    { name: 'Plantel', icon: <Users size={14} /> },
    { name: 'Equipa Técnica', icon: <Users size={14} /> },
    { name: 'Jogos', icon: <Calendar size={14} /> },
  ];

  return (
    <html lang="pt-pt">
      <body className="bg-[#020617] text-white antialiased overflow-x-hidden">
        {/* AJUSTE: A Navbar agora só aparece se mounted for true E isLanding for false */}
        {mounted && !isLanding && (
          <nav className="fixed top-6 left-0 right-0 z-[9999] px-2 flex justify-center pointer-events-none">
            <div className="relative flex items-center bg-[#0a0f1e]/90 backdrop-blur-2xl border border-white/10 rounded-full px-2 sm:px-6 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.7)] pointer-events-auto max-w-[98vw] sm:max-w-none">
              
              <div className="relative w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-8 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://i.imgur.com/eqWlwr7.png"
                  alt="SMFC"
                  className="absolute w-8 h-8 sm:w-12 sm:h-12 max-w-none object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                />
              </div>

              <div className="flex items-center gap-0.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className="group relative flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 px-3 sm:px-4 py-2 transition-all flex-shrink-0"
                  >
                    <span
                      className={`${
                        activeTab === item.name
                          ? 'text-red-600'
                          : 'text-red-500 opacity-70'
                      } transition-colors`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-[0.2em] ${
                        activeTab === item.name
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.name === 'Equipa Técnica' ? (
                        <span>Staff<span className="hidden sm:inline"> Técnica</span></span>
                      ) : item.name}
                    </span>
                    {activeTab === item.name && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-2 right-2 h-[2px] bg-red-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}

        <main className="relative z-10">
          {activeTab === 'Home' ? children : null}
          {activeTab === 'Plantel' ? <PlantelScreen /> : null}
          {activeTab === 'Equipa Técnica' ? <EquipaTecnicaScreen /> : null}
          {activeTab === 'Clube' ? <ClubeScreen /> : null}
          {activeTab === 'Jogos' ? <JogosScreen /> : null}
        </main>
      </body>
    </html>
  );
}