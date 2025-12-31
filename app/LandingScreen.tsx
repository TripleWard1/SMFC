'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingScreen({ onEnter }: { onEnter: () => void }) {
  const router = useRouter();

  const handleEnterApp = () => {
    setTimeout(() => {
      onEnter();
    }, 250); 
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="relative h-screen min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      
      {/* BACKGROUND IMERSIVO */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20 scale-110"
          style={{
            backgroundImage: `url('https://i.imgur.com/5xPm9Fl.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.2) brightness(0.8)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
      </div>
      
      {/* EFEITOS DE LUZ DINÂMICOS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="relative z-20 text-center max-w-5xl w-full flex flex-col items-center justify-center -mt-10 sm:-mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-10 relative">
          <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150" />
          <img
            src="https://i.imgur.com/eqWlwr7.png"
            alt="SMFC Logo"
            className="relative w-28 h-28 sm:w-44 sm:h-44 mx-auto drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] object-contain"
          />
        </motion.div>

        {/* TITULO */}
        <motion.div variants={itemVariants} className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield size={12} className="text-red-500 fill-red-500/20" />
            <h2 className="text-red-500 font-black uppercase tracking-[0.4em] text-[8px] sm:text-[10px]">
              Estabelecido desde 1975
            </h2>
            <Shield size={12} className="text-red-500 fill-red-500/20" />
          </div>
          <h1 className="text-5xl sm:text-9xl font-black italic text-white leading-none tracking-tighter uppercase">
            SÃO MAMEDE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>
              D'ESTE F.C.
            </span>
          </h1>
        </motion.div>

        {/* CATEGORIAS MELHORADAS (Visual Premium) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-row justify-center gap-4 sm:gap-12 mt-8 sm:mt-12 mb-10 sm:mb-16"
        >
          {[
            { icon: <Trophy size={14} />, label: 'Resultados' },
            { icon: <Users size={14} />, label: 'Plantel' },
            { icon: <Calendar size={14} />, label: 'Agenda' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                <span className="text-red-500">{item.icon}</span>
              </div>
              <span className="text-white/40 font-bold uppercase text-[7px] sm:text-[9px] tracking-[0.2em]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* BOTÃO ULTRA-PREMIUM (LIQUID CHROME STYLE) */}
        <motion.div variants={itemVariants} className="w-full px-6 sm:px-0">
          <button 
            onClick={handleEnterApp}
            className="group relative h-14 sm:h-20 w-full max-w-[320px] sm:max-w-[400px] mx-auto rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Fundo Branco com Gradiente de Profundidade */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-100 to-slate-300" />
            
            {/* Efeito Shimmer de Luz */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

            <div className="relative z-10 flex items-center justify-between px-2 sm:px-3 h-full">
              <span className="flex-1 text-black font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-[13px] text-center ml-4 sm:ml-8">
                Aceder à Plataforma
              </span>
              
              {/* Círculo do Ícone com Glow e Animação */}
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#020617] shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:bg-red-600 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform sm:w-6 sm:h-6" />
              </div>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* FOOTER */}
      <div className="absolute bottom-6 opacity-30 text-[8px] sm:text-[10px] text-white font-bold uppercase tracking-[0.6em]">
        Braga • Portugal
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}