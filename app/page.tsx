'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Timer, UserCircle, Trophy, Calendar, ListOrdered } from 'lucide-react';
import { useState, useEffect } from 'react';
import LandingScreen from './LandingScreen';

// ========================================================
// 🟢 CENTRAL DE DADOS (EDITA APENAS ESTES VALORES)
// ========================================================
const JORNADA_DATA = {
  ultimoJogo: {
    casa: "São Mamede",
    fora: "Maria da Fonte B",
    goloCasa: 0,
    goloFora: 0,
    status: "Finalizado"
  },
  proximoJogo: {
    casa: "GD Figueiredo",
    fora: "São Mamede",
    data: "11 JAN",
    hora: "15:00",
    contagemRegressiva: "4D 12H 30M" // Texto que aparece no Hero
  },
  classificacao: [
    { pos: "05", nome: "Maria da Fonte B", pts: 17, logo: "Maria da Fonte B" },
    { pos: "06", nome: "São Mamede d'Este", pts: 17, logo: "São Mamede", destaque: true },
    { pos: "07", nome: "Alegrienses", pts: 15, logo: "Alegrienses" }
  ]
};
// ========================================================

let hasEntered = false;

// --- DICIONÁRIO DE EQUIPAS (LOGOS) ---
// --- DICIONÁRIO DE EQUIPAS (LOGOS) ---
const LOGOS_EQUIPAS: { [key: string]: string } = {
  "São Mamede d'Este FC": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  "São Mamede": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  "São Mamede d'Este": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  "S. Mamede": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  'Este FC': 'https://cdn-img.zerozero.pt/img/logos/equipas/10944_imgbank.png',
  'Maria da Fonte B': 'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  'M. Fonte B': 'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  'Ribeira do Neiva': 'https://cdn-img.zerozero.pt/img/logos/equipas/10950_imgbank.png',
  'GD Figueiredo': 'https://cdn-img.zerozero.pt/img/logos/equipas/10946_imgbank.png',
  'GD Os Alegrienses': 'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'Alegrienses': 'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'Maximinense': 'https://cdn-img.zerozero.pt/img/logos/equipas/10947_imgbank.png',
  'GD Pedralva': 'https://cdn-img.zerozero.pt/img/logos/equipas/10949_imgbank.png',
};

const LOGO_PADRAO = 'https://via.placeholder.com/100?text=ESCUDO';

const players = [
  {
    id: 1,
    name: 'José Torres',
    pos: 'GR',
    no: '5',
    img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/42/1387642_jose_torres_20251121125426.jpg',
    nat: 'PT',
  },
  {
    id: 2,
    name: 'Rui Nascimento',
    pos: 'GR',
    no: '17',
    img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/43/1387643_rui_nascimento_20251121125426.jpg',
    nat: 'PT',
  },
  {
    id: 3,
    name: 'Marco Ferreira',
    pos: 'DC',
    no: '3',
    img: 'https://cdn-img.zerozero.pt/img/jogadores/new/07/47/1090747_marco_ferreira_20240806202253.png',
    nat: 'PT',
  },
  {
    id: 4,
    name: 'Teixeira',
    pos: 'DC',
    no: '9',
    img: 'https://cdn-img.zerozero.pt/img/jogadores/new/31/66/1383166_teixeira_20251114145330.jpg',
    nat: 'PT',
  },
];

export default function HomePage({ setTab }: { setTab: (id: string) => void }) {
  const [isLanding, setIsLanding] = useState(!hasEntered);

  const getLogo = (teamName: string) => {
    if (!teamName) return LOGO_PADRAO;
    const nameToSearch = teamName.trim().toLowerCase();
    const foundEntry = Object.entries(LOGOS_EQUIPAS).find(
      ([key]) => key.toLowerCase() === nameToSearch || nameToSearch.includes(key.toLowerCase())
    );
    return foundEntry ? foundEntry[1] : LOGO_PADRAO;
  };

  const [timeLeft, setTimeLeft] = useState("");

  // 1. Lógica do Cronómetro Automático
  useEffect(() => {
    const dataJogo = new Date('2026-01-11T15:00:00').getTime();
    const timer = setInterval(() => {
      const agora = new Date().getTime();
      const distancia = dataJogo - agora;

      if (distancia < 0) {
        setTimeLeft("JOGO A DECORRER");
        clearInterval(timer);
        return;
      }

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${dias}D ${horas}H ${minutos}M`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Lógica de Navegação das Abas (IMPORTANTE - NÃO APAGAR)
  useEffect(() => {
    const handleMudarAba = (event: any) => {
      const destino = event.detail;
      const subAbasJogos = ['Resultados', 'Proximos', 'Classificação', 'Próximos'];
      const abaPrincipal = subAbasJogos.includes(destino) ? 'Jogos' : destino;
  
      if (typeof setTab === 'function') {
        setTab(abaPrincipal);
      }
    };
  
    window.addEventListener('mudarAba', handleMudarAba);
    return () => window.removeEventListener('mudarAba', handleMudarAba);
  }, [setTab]);

  // 3. Função de Entrada (IMPORTANTE - NÃO APAGAR)
  const handleEnter = () => {
    hasEntered = true;
    setIsLanding(false);
    window.dispatchEvent(new CustomEvent('mudarAba', { detail: 'Home' }));
  };
  
  return (
    <AnimatePresence mode="wait">
      {isLanding ? (
        <LandingScreen key="landing" onEnter={handleEnter} />
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[#020617]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://i.imgur.com/5xPm9Fl.jpeg')" }}
              />
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center"
            >
              <div className="mb-8 inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 border border-red-600/20 rounded-full">
                <Timer size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
  Próximo Jogo: {timeLeft || "A CALCULAR..."}
</span>
              </div>
              <h1 className="text-[13vw] font-black italic uppercase leading-[0.75] tracking-tighter text-white">
                SÃO MAMEDE
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>
                  D'ESTE F.C.
                </span>
              </h1>
            </motion.div>
          </section>

          {/* Secção de Plantel de Destaque */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 -mt-32 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Os Guerreiros</h2>
                <div className="flex items-center gap-2 text-red-600">
                  <ShieldCheck size={18} />
                  <p className="font-bold uppercase tracking-[0.3em] text-[11px]">Destaques da Jornada</p>
                </div>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('mudarAba', { detail: 'Plantel' }))}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-full transition-all group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Ver o Plantel Completo</span>
                <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {players.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col group scale-90 md:scale-100"
                >
                  <div className="relative aspect-[4/5] bg-[#0f172a] border border-white/5 rounded-t-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 z-0">
                      {p.img ? (
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                      ) : (
                        <div className="flex items-center justify-center h-full opacity-20"><UserCircle size={40} /></div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                      <span className="text-xl font-black italic text-white/20 group-hover:text-red-600 transition-colors">#{p.no}</span>
                    </div>
                  </div>
                  <div className="bg-[#0f172a] border-x border-b border-white/5 rounded-b-xl p-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[7px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded-sm">{p.pos}</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                      </div>
                      <h4 className="text-xs md:text-sm font-black uppercase italic text-white leading-tight">{p.name}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* --- ÁREA DE JOGO E TABELA ULTRA-PREMIUM (VERSÃO CORRIGIDA E ESPAÇADA) --- */}
<div className="relative mt-20 space-y-12 px-4">
  
  {/* GRID DE CONFRONTOS: MAIS ESPAÇO E RESPIRAÇÃO */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
    
    {/* ÚLTIMO CONFRONTO */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      className="group relative bg-[#0f172a]/60 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 lg:p-12 overflow-hidden shadow-2xl"
    >
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Resumo da Jornada</h3>
          <p className="text-3xl font-black italic text-white tracking-tighter uppercase">Último Resultado</p>
        </div>
        <Trophy size={24} className="text-yellow-500/50 group-hover:text-yellow-500 transition-colors duration-500" />
      </div>

      {/* COLOCAR ISTO NO LUGAR: */}
      <div className="flex items-center justify-between relative z-10 py-4 gap-1">
  {/* Equipa Casa */}
  <div className="text-center space-y-2 flex-1 min-w-0">
    <img src={getLogo("GD Figueiredo")} className="w-12 h-12 md:w-20 md:h-20 mx-auto object-contain drop-shadow-2xl" alt="GDF" />
    <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-tight md:tracking-widest truncate px-1">Figueiredo</p>
  </div>
  
  {/* Centro VS */}
  <div className="flex flex-col items-center shrink-0 px-2">
    <div className="relative">
      <span className="text-3xl md:text-5xl font-black italic text-white/10 tracking-widest">VS</span>
      <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-black italic text-white">VS</span>
    </div>
    <div className="h-0.5 w-8 md:w-16 bg-white/20 rounded-full mt-2" />
  </div>

  {/* Equipa Fora */}
  <div className="text-center space-y-2 flex-1 min-w-0">
    <img src={getLogo("São Mamede")} className="w-12 h-12 md:w-20 md:h-20 mx-auto object-contain drop-shadow-2xl" alt="SMFC" />
    <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-tight md:tracking-widest italic truncate px-1">S. Mamede</p>
  </div>
</div>
    </motion.div>

    {/* PRÓXIMO JOGO - CORRIGIDO "EM DIRETO" */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      className="group relative bg-gradient-to-br from-red-700 to-red-950 rounded-[3rem] p-10 lg:p-12 overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Agendamento</h3>
          <p className="text-3xl font-black italic text-white tracking-tighter uppercase">Próximo Jogo</p>
        </div>
        <div className="bg-black/20 backdrop-blur-md border border-white/10 px-5 py-2 rounded-2xl">
          <span className="text-xs font-black text-white uppercase tracking-widest">11 JAN • 15:00</span>
        </div>
      </div>

      <div className="flex items-center justify-around relative z-10 py-4">
        <div className="text-center space-y-4 flex-1">
          <img src={getLogo("GD Figueiredo")} className="w-20 h-20 mx-auto object-contain drop-shadow-2xl" alt="GDF" />
          <p className="text-[11px] font-black text-white uppercase tracking-widest">Figueiredo</p>
        </div>
        
        <div className="px-6 flex flex-col items-center">
          <div className="relative">
            <span className="text-5xl font-black italic text-white/10 tracking-[0.2em]">VS</span>
            <span className="absolute inset-0 flex items-center justify-center text-4xl font-black italic text-white tracking-[0.1em]">VS</span>
          </div>
          <div className="h-1 w-16 bg-white/20 rounded-full mt-6" />
        </div>

        <div className="text-center space-y-4 flex-1">
          <img src={getLogo("São Mamede")} className="w-20 h-20 mx-auto object-contain drop-shadow-2xl" alt="SMFC" />
          <p className="text-[11px] font-black text-white uppercase tracking-widest italic">S. Mamede</p>
        </div>
      </div>
    </motion.div>
  </div>

 {/* --- ÁREA DE CLASSIFICAÇÃO (DESIGN MOBILE-FIRST) --- */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }}
  className="max-w-4xl mx-auto relative px-2 mt-16"
>
  <div className="relative bg-[#0a0f1e]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-5 md:p-10 shadow-2xl">
    
    {/* Cabeçalho com Badge flutuante para não cortar o título */}
    <div className="flex flex-col mb-8 pl-2">
      <div className="flex items-center justify-between w-full">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Performance</span>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
          Série B
        </span>
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mt-1">Classificação</h2>
    </div>

    {/* Lista de Classificação - Cards Verticais em Mobile */}
    <div className="grid grid-cols-1 gap-4">
      {JORNADA_DATA.classificacao.map((item, index) => (
        <div 
          key={index} 
          className={`relative overflow-hidden flex items-center justify-between p-4 rounded-[1.8rem] transition-all ${
            item.destaque 
              ? "bg-gradient-to-br from-red-600 to-red-900 shadow-xl ring-1 ring-white/20" 
              : "bg-white/[0.03] border border-white/5"
          }`}
        >
          {/* Background Decorativo para o Destaque */}
          {item.destaque && (
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
          )}

          <div className="flex items-center gap-4 flex-1 min-w-0 z-10">
            {/* Posição com estilo Glass */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-2xl text-lg font-black italic shrink-0 ${
              item.destaque ? "bg-black/20 text-white" : "bg-white/5 text-slate-500"
            }`}>
              {item.pos}
            </div>
            
            {/* Logo e Nome */}
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={getLogo(item.logo)} 
                className="w-10 h-10 object-contain drop-shadow-lg" 
                alt="Logo"
              />
              <div className="flex flex-col min-w-0">
                <span className={`text-[13px] md:text-base font-black uppercase tracking-tight leading-none truncate ${
                  item.destaque ? "text-white" : "text-slate-200"
                }`}>
                  {item.nome}
                </span>
                <span className={`text-[8px] font-bold uppercase tracking-widest mt-1 ${
                  item.destaque ? "text-red-200/50" : "text-slate-600"
                }`}>
                  Campeonato Distrital
                </span>
              </div>
            </div>
          </div>

          {/* Pontuação Estilo Badge */}
          <div className={`flex flex-col items-center justify-center min-w-[50px] py-2 rounded-2xl z-10 ${
            item.destaque ? "bg-white/10" : "bg-black/20"
          }`}>
            <span className="text-xl font-black text-white leading-none">{item.pts}</span>
            <span className={`text-[8px] font-bold uppercase ${
              item.destaque ? "text-white/60" : "text-slate-600"
            }`}>Pts</span>
          </div>
        </div>
      ))}
    </div>

    {/* Footer da Tabela */}
    <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
      <p className="text-[9px] font-medium text-slate-600 uppercase tracking-[0.2em]">Última atualização: Hoje às 15:00</p>
    </div>
  </div>
</motion.div>
</div>
          </section>

          <footer className="border-t border-white/5 py-20 bg-[#020617] px-6 text-center">
            <img src="https://i.imgur.com/eqWlwr7.png" className="w-16 h-16 grayscale opacity-20 mx-auto mb-8" alt="SMFC Logo" />
            <div className="flex justify-center gap-6 mb-8">
              <a href="https://www.facebook.com/saomamedefutebolclube" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="https://www.instagram.com/saomamedefc/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.981-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.352-2.618-6.78-6.981-6.981C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="mailto:smamedeclube@gmail.com" className="text-slate-500 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600">Braga • São Mamede D'Este • 2026</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}