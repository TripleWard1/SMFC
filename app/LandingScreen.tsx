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
      {/* FOOTER COM REDES SOCIAIS */}
      <div className="absolute bottom-6 flex flex-col items-center gap-4">
        <div className="flex gap-5 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <a href="https://www.facebook.com/saomamedefutebolclube" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://www.instagram.com/saomamedefc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.981-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.352-2.618-6.78-6.981-6.981C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="mailto:smamedeclube@gmail.com" className="text-white hover:text-red-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>
        </div>
        <div className="opacity-30 text-[8px] sm:text-[10px] text-white font-bold uppercase tracking-[0.6em]">
          Braga • Portugal
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
    
  );
}