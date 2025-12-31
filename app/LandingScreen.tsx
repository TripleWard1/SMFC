'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingScreen({ onEnter }: { onEnter: () => void }) {
  const router = useRouter();

  const handleEnterApp = () => {
    onEnter();
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
      
      {/* BACKGROUND IMERSIVO: Overlay Dinâmico */}
      <div className="absolute inset-0 z-0">
        {/* Imagem de Fundo com Parallax estático e Overlay de Gradiente */}
        <div
          className="absolute inset-0 opacity-20 scale-110"
          style={{
            backgroundImage: `url('https://i.imgur.com/5xPm9Fl.jpeg')`, // Usando a imagem do estádio para consistência
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.2) brightness(0.8)',
          }}
        />
        {/* Gradiente Radial para focar o centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_80%)]" />
        {/* Overlay de Grelha (Grid) para aspeto tecnológico/desportivo */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
      </div>
      
      {/* EFEITOS DE LUZ (Blooms) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        className="relative z-20 text-center max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO COM GLOW */}
        <motion.div variants={itemVariants} className="mb-10 relative inline-block">
          <div className="absolute inset-0 bg-red-600/30 blur-3xl rounded-full scale-150" />
          <img
            src="https://i.imgur.com/eqWlwr7.png"
            alt="SMFC Logo"
            className="relative w-32 h-32 sm:w-44 sm:h-44 mx-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] object-contain"
          />
        </motion.div>

        {/* TIPOGRAFIA IMPACTANTE */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-red-500 font-black uppercase tracking-[0.5em] text-xs sm:text-sm">
          Estabelecido desde 1975
          </h2>
          <h1 className="text-6xl sm:text-8xl font-black italic text-white leading-none tracking-tighter">
            SÃO MAMEDE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)' }}>
              D'ESTE F.C.
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed pt-4">
            A nova era digital do teu clube começou. <br className="hidden sm:block" />
            Estatísticas, plantel e resultados em tempo real.
          </p>
        </motion.div>

        {/* FEATURES RÁPIDAS (Visual Premium) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 mt-12 mb-16 opacity-60 text-white font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <div className="flex items-center gap-2"><Trophy size={14} className="text-red-600" /> Resultados</div>
          <div className="flex items-center gap-2"><Users size={14} className="text-red-600" /> Plantel</div>
          <div className="flex items-center gap-2"><Calendar size={14} className="text-red-600" /> Agenda</div>
        </motion.div>

        {/* BOTÃO CALL TO ACTION */}
        <motion.div variants={itemVariants}>
          <button 
            onClick={handleEnterApp}
            className="group relative px-16 py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all hover:bg-red-700 active:scale-95 shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
          >
            {/* Efeito de brilho interno ao passar o rato */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <span className="relative z-10 flex items-center gap-4">
              Aceder à Plataforma <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* FOOTER DISCRETO */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.4 }} 
        transition={{ delay: 2 }}
        className="absolute bottom-8 z-20 text-[10px] text-white font-bold uppercase tracking-[0.4em]"
      >
        Braga, Portugal
      </motion.div>
      
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}