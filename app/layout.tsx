'use client';
import './globals.css';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

import PlantelScreen from './PlantelScreen';
import EquipaTecnicaScreen from './EquipaTecnicaScreen';
import ClubeScreen from './ClubeScreen';
import JogosScreen from './JogosScreen'; // ADICIONEI ESTA LINHA IMPORTANTE

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
          <nav className="fixed top-6 left-0 right-0 z-[9999] px-4 flex justify-center pointer-events-none">
            <div className="relative flex items-center bg-[#0a0f1e]/80 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.7)] pointer-events-auto">
              <div className="relative w-12 h-12 mr-10 flex items-center justify-center">
                <img
                  src="https://i.imgur.com/eqWlwr7.png"
                  alt="SMFC"
                  className="absolute w-14 h-14 max-w-none object-contain filter drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                />
              </div>

              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className="group relative flex items-center gap-2.5 px-3 py-2 transition-all"
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
                      className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                        activeTab === item.name
                          ? 'text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.name}
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
