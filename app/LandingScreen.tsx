'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_80%)]" />
      </div>
      
      {/* EFEITOS DE LUZ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        className="relative z-20 text-center max-w-5xl w-full -mt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO */}
        <motion.div variants={itemVariants} className="mb-12 relative inline-block">
          <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150" />
          <img
            src="https://i.imgur.com/eqWlwr7.png"
            alt="SMFC Logo"
            className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] object-contain"
          />
        </motion.div>

        {/* TITULO */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-red-500 font-black uppercase tracking-[0.6em] text-[10px] sm:text-xs">
            Estabelecido desde 1975
          </h2>
          <h1 className="text-6xl sm:text-9xl font-black italic text-white leading-none tracking-tighter">
            SÃO MAMEDE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}>
              D'ESTE F.C.
            </span>
          </h1>
        </motion.div>

        {/* FEATURES */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-10 mt-10 mb-20 opacity-40 text-white font-bold uppercase text-[9px] tracking-[0.3em]"
        >
          <div>RESULTADOS</div>
          <div>•</div>
          <div>PLANTEL</div>
          <div>•</div>
          <div>AGENDA</div>
        </motion.div>

        {/* BOTÃO IMPACTANTE WHITE & RED */}
        <motion.div variants={itemVariants}>
          <button 
            onClick={handleEnterApp}
            className="group relative px-10 py-5 bg-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.15)] flex items-center gap-8 mx-auto"
          >
            {/* Efeito de Reflexo Metálico */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-white to-white" />
            
            {/* Shimmer Light */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

            <span className="relative z-10 text-black font-black uppercase tracking-[0.3em] text-xs sm:text-sm pl-4">
              Entrar na Plataforma
            </span>
            
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#020617] group-hover:bg-red-600 transition-colors duration-500 shadow-lg">
              <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}