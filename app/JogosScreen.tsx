'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Trophy, Clock, Loader2, ListOrdered } from 'lucide-react';

// --- DICIONÁRIO DE EQUIPAS ---
const LOGOS_EQUIPAS: { [key: string]: string } = {
  "São Mamede d'Este FC": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  'São Mamede Futebol Clube': 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  "São Mamede d'Este": 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  SMFC: 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  'ACD Serzedelo': 'https://cdn-img.zerozero.pt/img/logos/equipas/89210_imgbank.png',
  'ACD Serzedelo S. Pedro': 'https://cdn-img.zerozero.pt/img/logos/equipas/89210_imgbank.png',
  'Arsenal Devesa': 'https://cdn-img.zerozero.pt/img/logos/equipas/10951_imgbank.png',
  'CD Maximinense': 'https://cdn-img.zerozero.pt/img/logos/equipas/75/5675_logo_20220905151822_maximinense.png',
  'Maximinense': 'https://cdn-img.zerozero.pt/img/logos/equipas/75/5675_logo_20220905151822_maximinense.png',
  'FC Sobreposta': 'https://cdn-img.zerozero.pt/img/logos/equipas/99/32399_logo_sobreposta.jpg',
  'GD Figueiredo': 'https://cdn-img.zerozero.pt/img/logos/equipas/52/10952_logo_gd_figueiredo.jpg',
  'GD Guisande': 'https://cdn-img.zerozero.pt/img/logos/equipas/55/10955_logo_gd_guisande.jpg',
  'GD Os Alegrienses': 'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'GD Pedralva': 'https://cdn-img.zerozero.pt/img/logos/equipas/23/8023_logo_gd_pedralva_20250225112142.png',
  'GD Peões': 'https://cdn-img.zerozero.pt/img/logos/equipas/50/10950_logo_gd_peoes.jpg',
  'GDR Esporões': 'https://cdn-img.zerozero.pt/img/logos/equipas/77786_imgbank.png',
  'GD Sete Fontes': 'https://cdn-img.zerozero.pt/img/logos/equipas/07/77907_logo_gd_sete_fontes.png',
  'SC Maria Fonte “B”': 'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  'Soarense SC': 'https://cdn-img.zerozero.pt/img/logos/equipas/8016_imgbank.png',
  'Maria da Fonte B': 'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  Soarense: 'https://cdn-img.zerozero.pt/img/logos/equipas/8016_imgbank.png',
  Sobreposta: 'https://cdn-img.zerozero.pt/img/logos/equipas/99/32399_logo_sobreposta.jpg',
  'Arsenal da Devesa': 'https://cdn-img.zerozero.pt/img/logos/equipas/10951_imgbank.png',
  Alegrienses: 'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'AD Oliveirense': 'https://cdn-img.zerozero.pt/img/logos/equipas/3557_imgbank.png',
};

const LOGO_PADRAO = 'https://via.placeholder.com/100?text=ESCUDO';



export default function JogosScreen() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('Resultados');
  const [filtroCompeticao, setFiltroCompeticao] = useState('Todas');

  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNe82uPD4n31biJ89tmpvFXHW9F7cYXy5GxgqWf0em9cveQzO2Y2bzyAyLC_1RQ5v7tBP8ahO74Ci/pub?output=csv';

  // --- DADOS DA CLASSIFICAÇÃO ---
  const classificacao = [
    { pos: 1, equipa: 'Soarense', p: 25, j: 10, v: 8, e: 1, d: 1, gm: 25, gs: 10, dg: 15 },
    { pos: 2, equipa: 'ACD Serzedelo S. Pedro', p: 21, j: 10, v: 6, e: 3, d: 1, gm: 36, gs: 13, dg: 23 },
    { pos: 3, equipa: 'GD Figueiredo', p: 20, j: 10, v: 6, e: 2, d: 2, gm: 22, gs: 9, dg: 13 },
    { pos: 4, equipa: 'Maximinense', p: 19, j: 10, v: 6, e: 1, d: 3, gm: 18, gs: 8, dg: 10 },
    { pos: 5, equipa: 'Maria da Fonte B', p: 17, j: 9, v: 5, e: 2, d: 2, gm: 23, gs: 10, dg: 13 },
    { pos: 6, equipa: "São Mamede d'Este", p: 17, j: 10, v: 5, e: 2, d: 3, gm: 24, gs: 16, dg: 8 },
    { pos: 7, equipa: 'Alegrienses', p: 15, j: 10, v: 5, e: 0, d: 5, gm: 23, gs: 14, dg: 9 },
    { pos: 8, equipa: 'GD Guisande', p: 14, j: 9, v: 4, e: 2, d: 3, gm: 14, gs: 10, dg: 4 },
    { pos: 9, equipa: 'GD Sete Fontes', p: 13, j: 10, v: 3, e: 4, d: 3, gm: 13, gs: 13, dg: 0 },
    { pos: 10, equipa: 'GD Pedralva', p: 12, j: 10, v: 3, e: 3, d: 4, gm: 23, gs: 22, dg: 1 },
    { pos: 11, equipa: 'GDR Esporões', p: 12, j: 10, v: 3, e: 3, d: 4, gm: 16, gs: 17, dg: -1 },
    { pos: 12, equipa: 'Sobreposta', p: 9, j: 10, v: 2, e: 3, d: 5, gm: 13, gs: 19, dg: -6 },
    { pos: 13, equipa: 'Arsenal da Devesa', p: 0, j: 10, v: 0, e: 0, d: 10, gm: 3, gs: 45, dg: -42 },
    { pos: 14, equipa: 'GD Peões', p: 0, j: 10, v: 0, e: 0, d: 10, gm: 3, gs: 50, dg: -47 },
  ];

  // --- CALENDÁRIO PRÓXIMOS JOGOS ---
  const proximosJogos = [
    { date: '11/01/2026', time: '15:00', home: 'GD Figueiredo', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J11', local: '(F)' },
    { date: '17/01/2026', time: '14:00', home: "São Mamede d'Este FC", away: 'AD Oliveirense', comp: 'Taça AF Braga', jornada: 'Taça', local: '(C)' },
    { date: '25/01/2026', time: '15:00', home: "São Mamede d'Este FC", away: 'ACD Serzedelo S. Pedro', comp: 'AF Braga 1ª Divisão B', jornada: 'J12', local: '(C)' },
    { date: '01/02/2026', time: '15:00', home: "São Mamede d'Este FC", away: 'Maximinense', comp: 'AF Braga 1ª Divisão B', jornada: 'J13', local: '(C)' },
    { date: '15/02/2026', time: '15:00', home: 'GD Pedralva', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J14', local: '(F)' },
    { date: '22/02/2026', time: '15:00', home: "São Mamede d'Este FC", away: 'GD Peões', comp: 'AF Braga 1ª Divisão B', jornada: 'J15', local: '(C)' },
    { date: '01/03/2026', time: '15:00', home: 'GDR Esporões', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J16', local: '(F)' },
    { date: '08/03/2026', time: '15:00', home: "São Mamede d'Este FC", away: 'GD Guisande', comp: 'AF Braga 1ª Divisão B', jornada: 'J17', local: '(C)' },
    { date: '15/03/2026', time: '15:00', home: 'Alegrienses', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J18', local: '(F)' },
    { date: '22/03/2026', time: '15:00', home: "São Mamede d'Este FC", away: 'Arsenal da Devesa', comp: 'AF Braga 1ª Divisão B', jornada: 'J19', local: '(C)' },
    { date: '29/03/2026', time: '16:00', home: 'Sobreposta', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J20', local: '(F)' },
    { date: '12/04/2026', time: '16:00', home: "São Mamede d'Este FC", away: 'GD Sete Fontes', comp: 'AF Braga 1ª Divisão B', jornada: 'J21', local: '(C)' },
    { date: '19/04/2026', time: '16:00', home: 'Soarense', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J22', local: '(F)' },
    { date: '26/04/2026', time: '16:00', home: "São Mamede d'Este FC", away: 'Maria da Fonte B', comp: 'AF Braga 1ª Divisão B', jornada: 'J23', local: '(C)' },
    { date: '03/05/2026', time: '16:00', home: 'GD Figueiredo', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J24', local: '(F)' },
    { date: '10/05/2026', time: '16:00', home: "São Mamede d'Este FC", away: 'ACD Serzedelo S. Pedro', comp: 'AF Braga 1ª Divisão B', jornada: 'J12', local: '(C)' },
    { date: '17/05/2026', time: '16:00', home: 'Maximinense', away: "São Mamede d'Este FC", comp: 'AF Braga 1ª Divisão B', jornada: 'J13', local: '(F)' },
  ];

  const getLogo = (teamName: string) => {
    if (!teamName) return LOGO_PADRAO;
    const nameToSearch = teamName.trim().toLowerCase();
    const foundEntry = Object.entries(LOGOS_EQUIPAS).find(
      ([key]) => key.toLowerCase() === nameToSearch || nameToSearch.includes(key.toLowerCase())
    );
    return foundEntry ? foundEntry[1] : LOGO_PADRAO;
  };

  const getResultGradient = (jogo: any, isHighlight = false) => {
    const sH = parseInt(jogo.scoreHome);
    const sA = parseInt(jogo.scoreAway);
    const isSMHome = jogo.homeTeam.includes('São Mamede');
    const isSMAway = jogo.awayTeam.includes('São Mamede');

    let type = 'draw';
    if (!isNaN(sH) && !isNaN(sA)) {
      if (sH === sA) type = 'draw';
      else if ((isSMHome && sH > sA) || (isSMAway && sA > sH)) type = 'win';
      else type = 'loss';
    }

    if (isHighlight) {
      if (type === 'win') return 'bg-gradient-to-r from-emerald-600/30 via-slate-900/80 to-slate-900';
      if (type === 'loss') return 'bg-gradient-to-r from-red-600/30 via-slate-900/80 to-slate-900';
      return 'bg-gradient-to-r from-slate-600/30 via-slate-900/80 to-slate-900';
    }
    return type === 'win' ? 'from-emerald-500/40 to-transparent' : type === 'loss' ? 'from-red-500/40 to-transparent' : 'from-slate-500/40 to-transparent';
  };

  // 1. Efeito para carregar dados
  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await fetch(`${SHEET_CSV_URL}&t=${new Date().getTime()}`);
        const text = await response.text();
        const rows = text.split(/\r?\n/).filter((row) => row.trim() !== '');
        const sheetData = rows.slice(1).map((row) => {
          const columns = row.includes(';') ? row.split(';') : row.split(',');
          const cleanCols = columns.map((col) => col.trim().replace(/^"|"$/g, ''));
          let rawDate = cleanCols[4] || '';
          if (rawDate.length === 5) rawDate += '/2025';
          return {
            homeTeam: cleanCols[0] || '',
            scoreHome: cleanCols[1] || '0',
            scoreAway: cleanCols[2] || '0',
            awayTeam: cleanCols[3] || '',
            date: rawDate,
            competition: cleanCols[5] || 'AF Braga 1ª Divisão',
            stadium: cleanCols[6] || 'Campo das Ribeirinhas',
          };
        });
        const historicoFixo = [
          { date: '20/12/2025', homeTeam: 'Maria da Fonte B', scoreHome: '0', scoreAway: '0', awayTeam: "São Mamede d'Este FC", competition: 'AF Braga 1ª Divisão', stadium: 'Pq. Desp. Municipal' },
          { date: '13/12/2025', homeTeam: "São Mamede d'Este FC", scoreHome: '1', scoreAway: '3', awayTeam: 'Soarense', competition: 'AF Braga 1ª Divisão', stadium: 'Campo das Ribeirinhas' },
          { date: '06/12/2025', homeTeam: "São Mamede d'Este FC", scoreHome: 'ADI', scoreAway: '', awayTeam: 'AD Oliveirense', competition: 'AF Braga Taça', stadium: 'Campo das Ribeirinhas' },
          { date: '29/11/2025', homeTeam: 'GD Sete Fontes', scoreHome: '3', scoreAway: '3', awayTeam: "São Mamede d'Este FC", competition: 'AF Braga 1ª Divisão', stadium: 'Fora' },
          { date: '22/11/2025', homeTeam: "São Mamede d'Este FC", scoreHome: '4', scoreAway: '1', awayTeam: 'Sobreposta', competition: 'AF Braga 1ª Divisão', stadium: 'Campo das Ribeirinhas' },
          { date: '15/11/2025', homeTeam: "São Mamede d'Este FC", scoreHome: '5', scoreAway: '2', awayTeam: 'Arsenal da Devesa', competition: 'AF Braga 1ª Divisão', stadium: 'Campo das Ribeirinhas' },
          { date: '08/11/2025', homeTeam: 'Alegrienses', scoreHome: '1', scoreAway: '2', awayTeam: "São Mamede d'Este FC", competition: 'AF Braga 1ª Divisão', stadium: 'Fora' },
          { date: '25/10/2025', homeTeam: "São Mamede d'Este FC", scoreHome: '2', scoreAway: '1', awayTeam: 'GD Guisande', competition: 'AF Braga 1ª Divisão', stadium: 'Campo das Ribeirinhas' },
          { date: '18/10/2025', homeTeam: 'GDR Esporões', scoreHome: '2', scoreAway: '1', awayTeam: "São Mamede d'Este FC", competition: 'AF Braga 1ª Divisão', stadium: 'Fora' },
          { date: '04/10/2025', homeTeam: "São Mamede d'Este FC", scoreHome: '5', scoreAway: '0', awayTeam: 'GD Peões', competition: 'AF Braga 1ª Divisão', stadium: 'Campo das Ribeirinhas' },
          { date: '28/09/2025', homeTeam: 'GD Pedralva', scoreHome: '3', scoreAway: '1', awayTeam: "São Mamede d'Este FC", competition: 'AF Braga 1ª Divisão', stadium: 'Fora' },
        ];
        const todosOsJogos = [...sheetData, ...historicoFixo].filter((j) => j.homeTeam !== '');
        setJogos(todosOsJogos.sort((a, b) => {
          const parseDate = (d: string) => {
            const [day, month, year] = d.split('/');
            return new Date(`${year}-${month}-${day}`).getTime();
          };
          return parseDate(b.date) - parseDate(a.date);
        }));
      } catch (error) { 
        console.error('Erro:', error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchJogos();
  }, []);

  // 2. LOGICA PARA OUVIR A HOME
  useEffect(() => {
    const handleNavigation = (e: any) => {
      const target = e.detail;
      // Normalização para evitar erros de acento vindo da Home
      const abaFinal = target === 'Próximos' ? 'Proximos' : target;
      if (['Resultados', 'Proximos', 'Classificação'].includes(abaFinal)) {
        setActiveSubTab(abaFinal);
      }
    };
    window.addEventListener('mudarAba', handleNavigation);
    return () => window.removeEventListener('mudarAba', handleNavigation);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <Loader2 className="text-red-600 animate-spin" size={40} />
    </div>
  );

  const destaque = jogos[0];
  const ultimosConfrontos = jogos.slice(1);

  return (
    <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
       {/* Barra de Navegação Sub-Abas - Ajuste Definitivo para Mobile */}
<div className="flex justify-center mb-10 relative z-10 w-full px-2">
  <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-full max-w-md mx-auto items-center justify-between">
    {['Resultados', 'Próximos', 'Classificação'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveSubTab(tab === 'Próximos' ? 'Proximos' : tab)}
        className={`flex-1 px-1 py-2.5 rounded-full text-[9px] xs:text-[10px] md:text-xs font-black uppercase tracking-tight md:tracking-widest transition-all whitespace-nowrap text-center ${
          (activeSubTab === tab || (activeSubTab === 'Proximos' && tab === 'Próximos')) 
          ? 'bg-red-600 text-white shadow-lg' 
          : 'text-slate-400 hover:text-white'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>

        <AnimatePresence mode="wait">
          {activeSubTab === 'Resultados' && (
            <motion.div key="resultados" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {destaque && (
                <section className={`relative mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${getResultGradient(destaque, true)}`}>
                  <div className="bg-blue-900/40 px-6 py-3 flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                    <span className="flex items-center gap-2 text-white"><Calendar size={12} className="text-red-600" /> {destaque.date}</span>
                    <span className="flex items-center gap-2 text-white"><Trophy size={12} className="text-red-600" /> {destaque.competition}</span>
                    <span className="flex items-center gap-2 text-white"><MapPin size={12} className="text-red-600" /> {destaque.stadium}</span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/5 rounded-full p-4 border border-white/10 shadow-inner">
                        <img src={getLogo(destaque.homeTeam)} className="w-full h-full object-contain" alt="" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black uppercase italic text-white">{destaque.homeTeam}</h3>
                    </div>
                    <div className="flex items-center gap-6 bg-[#020617] px-8 py-4 rounded-2xl border border-red-600/30">
                      <span className="text-6xl font-black italic text-white">{destaque.scoreHome}</span>
                      <span className="text-3xl font-black text-red-600">-</span>
                      <span className="text-6xl font-black italic text-white">{destaque.scoreAway}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/5 rounded-full p-4 border border-white/10 shadow-inner">
                        <img src={getLogo(destaque.awayTeam)} className="w-full h-full object-contain" alt="" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black uppercase italic text-white">{destaque.awayTeam}</h3>
                    </div>
                  </div>
                </section>
              )}
              <div className="grid gap-3">
                {ultimosConfrontos.map((jogo, i) => (
                  <motion.div key={i} whileHover={{ x: 10 }} className="relative bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r ${getResultGradient(jogo)} backdrop-blur-sm`} />
                    <div className="relative z-10 flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase"><Clock size={14} /> {jogo.date}</div>
                    <div className="relative z-10 flex-1 flex items-center justify-center gap-4">
                      <div className="flex-1 flex items-center justify-end gap-3 text-right">
                        <span className="font-bold uppercase text-[10px] md:text-sm text-white">{jogo.homeTeam}</span>
                        <img src={getLogo(jogo.homeTeam)} className="w-6 h-6 object-contain" alt="" />
                      </div>
                      <div className="bg-[#020617] px-4 py-1.5 rounded-lg border border-white/10 text-white font-black"><span className="text-lg">{jogo.scoreHome}</span><span className="text-red-600 px-2">-</span><span className="text-lg">{jogo.scoreAway}</span></div>
                      <div className="flex-1 flex items-center justify-start gap-3">
                        <img src={getLogo(jogo.awayTeam)} className="w-6 h-6 object-contain" alt="" />
                        <span className="font-bold uppercase text-[10px] md:text-sm text-white">{jogo.awayTeam}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

{activeSubTab === 'Proximos' && (
            <motion.div key="proximos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4">
              
              {/* --- NOVO TOGGLE DE FILTRO --- */}
              <div className="flex gap-2 mb-2 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
                {['Todas', 'Campeonato', 'Taça'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltroCompeticao(f)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      filtroCompeticao === f ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* --- LISTA FILTRADA --- */}
              {proximosJogos
                .filter(jogo => {
                  if (filtroCompeticao === 'Todas') return true;
                  if (filtroCompeticao === 'Campeonato') return jogo.comp.includes('1ª Divisão');
                  if (filtroCompeticao === 'Taça') return jogo.comp.includes('Taça');
                  return true;
                })
                .map((jogo, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* ... resto do teu código do card de jogo (não mudas nada para baixo) ... */}
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600/10 p-3 rounded-xl border border-red-600/20 text-red-500 font-black text-xs uppercase text-center min-w-[60px]">{jogo.jornada}</div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter"><Calendar size={12} /> {jogo.date} • <Clock size={12} /> {jogo.time}</div>
                      <div className="text-[9px] font-black text-red-600 uppercase tracking-widest">{jogo.comp}</div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-3 flex-1 justify-end"><span className="font-black uppercase text-xs sm:text-sm text-white">{jogo.home}</span><img src={getLogo(jogo.home)} className="w-8 h-8 object-contain" alt="" /></div>
                    <div className="px-4 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-black text-red-500">VS</div>
                    <div className="flex items-center gap-3 flex-1"><img src={getLogo(jogo.away)} className="w-8 h-8 object-contain" alt="" /><span className="font-black uppercase text-xs sm:text-sm text-white">{jogo.away}</span></div>
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-lg text-[9px] font-black text-slate-500 uppercase">{jogo.local === '(C)' ? 'Casa' : 'Fora'}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'Classificação' && (
            <motion.div key="classificacao" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[10px] font-black uppercase text-slate-400 border-b border-white/10">
                  <tr><th className="px-6 py-5">#</th><th className="px-6 py-5">Equipa</th><th className="px-6 py-5 text-center">P</th><th className="px-6 py-5 text-center">J</th><th className="px-6 py-5 text-center">V</th><th className="px-6 py-5 text-center">E</th><th className="px-6 py-5 text-center">D</th><th className="px-6 py-5 text-center">GM-GS</th><th className="px-6 py-5 text-center">DG</th></tr>
                </thead>
                <tbody className="text-sm">
                  {classificacao.map((item) => (
                    <tr key={item.pos} className={`border-b border-white/5 ${item.equipa.includes("São Mamede") ? 'bg-red-600/10' : ''}`}>
                      <td className="px-6 py-4 font-black text-xs text-slate-500">{item.pos}</td>
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><img src={getLogo(item.equipa)} className="w-6 h-6 object-contain" alt="" /><span className={`font-black uppercase italic text-xs ${item.equipa.includes("São Mamede") ? 'text-red-500' : 'text-white'}`}>{item.equipa}</span></div></td>
                      <td className="px-6 py-4 text-center font-black text-white">{item.p}</td>
                      <td className="px-6 py-4 text-center text-slate-400 font-bold">{item.j}</td>
                      <td className="px-6 py-4 text-center text-emerald-500 font-bold">{item.v}</td>
                      <td className="px-6 py-4 text-center text-slate-400 font-bold">{item.e}</td>
                      <td className="px-6 py-4 text-center text-red-500 font-bold">{item.d}</td>
                      <td className="px-6 py-4 text-center text-slate-400 text-xs">{item.gm}-{item.gs}</td>
                      <td className={`px-6 py-4 text-center font-bold ${item.dg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{item.dg > 0 ? `+${item.dg}` : item.dg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}