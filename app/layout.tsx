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

  useEffect(() => {
    setMounted(true);

    const handleMudarAba = (e: any) => {
      setActiveTab(e.detail);
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
        {mounted && (
          <nav className="fixed top-6 left-0 right-0 z-[9999] px-2 sm:px-4 flex justify-center pointer-events-none">
            {/* AJUSTE: w-full e max-w-max para não estourar, padding reduzido no mobile (px-4) e gap menor (gap-2) */}
            <div className="relative flex items-center bg-[#0a0f1e]/80 backdrop-blur-2xl border border-white/10 rounded-full px-4 sm:px-8 py-2 sm:py-3 shadow-[0_20px_40px_rgba(0,0,0,0.7)] pointer-events-auto max-w-[95vw] sm:max-w-none">
              
              {/* AJUSTE: margem da logo reduzida no mobile (mr-4) */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-4 sm:mr-10 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://i.imgur.com/eqWlwr7.png"
                  alt="SMFC"
                  className="absolute w-10 h-10 sm:w-14 sm:h-14 max-w-none object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                />
              </div>

              {/* AJUSTE: flex-wrap para os itens caírem para baixo se necessário ou overflow-x-auto para scroll */}
              <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar sm:overflow-visible">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className="group relative flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-2 transition-all flex-shrink-0"
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
                    {/* AJUSTE: Esconde o texto em telemóveis muito pequenos se necessário, ou mantém pequeno */}
                    <span
                      className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] ${
                        activeTab === item.name
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {/* AJUSTE: Nome curto para Equipa Técnica no mobile para poupar espaço */}
                      {item.name === 'Equipa Técnica' ? (
                        <span className="inline"><span className="hidden sm:inline">Equipa </span>Técnica</span>
                      ) : item.name}
                    </span>
                    {activeTab === item.name && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 rounded-full"
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