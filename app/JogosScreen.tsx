'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Trophy, Clock, Loader2 } from 'lucide-react';

// --- DICIONÁRIO DE EQUIPAS ---
const LOGOS_EQUIPAS: { [key: string]: string } = {
  "São Mamede d'Este FC":
    'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  'São Mamede Futebol Clube':
    'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  SMFC: 'https://cdn-img.zerozero.pt/img/logos/equipas/10945_imgbank.png',
  'ACD Serzedelo':
    'https://cdn-img.zerozero.pt/img/logos/equipas/89210_imgbank.png',
  'Arsenal Devesa':
    'https://cdn-img.zerozero.pt/img/logos/equipas/10951_imgbank.png',
  'CD Maximinense':
    'https://cdn-img.zerozero.pt/img/logos/equipas/75/5675_logo_20220905151822_maximinense.png',
  'FC Sobreposta':
    'https://cdn-img.zerozero.pt/img/logos/equipas/99/32399_logo_sobreposta.jpg',
  'GD Figueiredo':
    'https://cdn-img.zerozero.pt/img/logos/equipas/52/10952_logo_gd_figueiredo.jpg',
  'GD Guisande':
    'https://cdn-img.zerozero.pt/img/logos/equipas/55/10955_logo_gd_guisande.jpg',
  'GD Os Alegrienses':
    'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'GD Pedralva':
    'https://cdn-img.zerozero.pt/img/logos/equipas/23/8023_logo_gd_pedralva_20250225112142.png',
  'GD Peões':
    'https://cdn-img.zerozero.pt/img/logos/equipas/50/10950_logo_gd_peoes.jpg',
  'GDR Esporões':
    'https://cdn-img.zerozero.pt/img/logos/equipas/77786_imgbank.png',
  'GD Sete Fontes':
    'https://cdn-img.zerozero.pt/img/logos/equipas/07/77907_logo_gd_sete_fontes.png',
  'SC Maria Fonte “B”':
    'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  'Soarense SC':
    'https://cdn-img.zerozero.pt/img/logos/equipas/8016_imgbank.png',
  'Maria da Fonte B':
    'https://cdn-img.zerozero.pt/img/logos/equipas/3604_imgbank_1683533049.png',
  Soarense: 'https://cdn-img.zerozero.pt/img/logos/equipas/8016_imgbank.png',
  Sobreposta:
    'https://cdn-img.zerozero.pt/img/logos/equipas/99/32399_logo_sobreposta.jpg',
  'Arsenal da Devesa':
    'https://cdn-img.zerozero.pt/img/logos/equipas/10951_imgbank.png',
  Alegrienses:
    'https://cdn-img.zerozero.pt/img/logos/equipas/04/6704_logo_20230620104652_alegrienses.jpg',
  'AD Oliveirense':
    'https://cdn-img.zerozero.pt/img/logos/equipas/10940_imgbank.png',
};

const LOGO_PADRAO = 'https://via.placeholder.com/100?text=ESCUDO';

export default function JogosScreen() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHEET_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNe82uPD4n31biJ89tmpvFXHW9F7cYXy5GxgqWf0em9cveQzO2Y2bzyAyLC_1RQ5v7tBP8ahO74Ci/pub?output=csv';

  const getLogo = (teamName: string) => {
    if (!teamName) return LOGO_PADRAO;
    const nameToSearch = teamName.trim().toLowerCase();
    const foundEntry = Object.entries(LOGOS_EQUIPAS).find(
      ([key]) =>
        key.toLowerCase() === nameToSearch ||
        nameToSearch.includes(key.toLowerCase())
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
      if (type === 'win')
        return 'bg-gradient-to-r from-emerald-600/30 via-slate-900/80 to-slate-900';
      if (type === 'loss')
        return 'bg-gradient-to-r from-red-600/30 via-slate-900/80 to-slate-900';
      return 'bg-gradient-to-r from-slate-600/30 via-slate-900/80 to-slate-900';
    }

    if (type === 'win') return 'from-emerald-500/40 to-transparent';
    if (type === 'loss') return 'from-red-500/40 to-transparent';
    return 'from-slate-500/40 to-transparent';
  };

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await fetch(
          `${SHEET_CSV_URL}&t=${new Date().getTime()}`
        );
        const text = await response.text();
        const rows = text.split(/\r?\n/).filter((row) => row.trim() !== '');

        const sheetData = rows.slice(1).map((row) => {
          const columns = row.includes(';') ? row.split(';') : row.split(',');
          const cleanCols = columns.map((col) =>
            col.trim().replace(/^"|"$/g, '')
          );
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
            isFromSheet: true,
          };
        });

        const historicoFixo = [
          {
            date: '20/12/2025',
            homeTeam: 'Maria da Fonte B',
            scoreHome: '0',
            scoreAway: '0',
            awayTeam: "São Mamede d'Este FC",
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Pq. Desp. Municipal',
          },
          {
            date: '13/12/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: '1',
            scoreAway: '3',
            awayTeam: 'Soarense',
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '06/12/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: 'ADI',
            scoreAway: '',
            awayTeam: 'AD Oliveirense',
            competition: 'AF Braga Taça',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '29/11/2025',
            homeTeam: 'GD Sete Fontes',
            scoreHome: '3',
            scoreAway: '3',
            awayTeam: "São Mamede d'Este FC",
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Fora',
          },
          {
            date: '22/11/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: '4',
            scoreAway: '1',
            awayTeam: 'Sobreposta',
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '15/11/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: '5',
            scoreAway: '2',
            awayTeam: 'Arsenal da Devesa',
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '08/11/2025',
            homeTeam: 'Alegrienses',
            scoreHome: '1',
            scoreAway: '2',
            awayTeam: "São Mamede d'Este FC",
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Fora',
          },
          {
            date: '25/10/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: '2',
            scoreAway: '1',
            awayTeam: 'GD Guisande',
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '18/10/2025',
            homeTeam: 'GDR Esporões',
            scoreHome: '2',
            scoreAway: '1',
            awayTeam: "São Mamede d'Este FC",
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Fora',
          },
          {
            date: '04/10/2025',
            homeTeam: "São Mamede d'Este FC",
            scoreHome: '5',
            scoreAway: '0',
            awayTeam: 'GD Peões',
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Campo das Ribeirinhas',
          },
          {
            date: '28/09/2025',
            homeTeam: 'GD Pedralva',
            scoreHome: '3',
            scoreAway: '1',
            awayTeam: "São Mamede d'Este FC",
            competition: 'AF Braga 1ª Divisão',
            stadium: 'Fora',
          },
        ];

        const todosOsJogos = [...sheetData, ...historicoFixo].filter(
          (j) => j.homeTeam !== ''
        );

        const jogosOrdenados = todosOsJogos.sort((a, b) => {
          const parseDate = (d: string) => {
            const [day, month, year] = d.split('/');
            return new Date(`${year}-${month}-${day}`).getTime();
          };
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          if (dateB !== dateA) return dateB - dateA;
          if (a.isFromSheet && !b.isFromSheet) return -1;
          if (!a.isFromSheet && b.isFromSheet) return 1;
          return 0;
        });

        setJogos(jogosOrdenados);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJogos();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="text-red-600 animate-spin" size={40} />
      </div>
    );

  const destaque = jogos[0];
  const ultimosConfrontos = jogos.slice(1);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {destaque && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${getResultGradient(
              destaque,
              true
            )}`}
          >
            <div className="bg-blue-900/40 px-6 py-3 flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
              <span className="flex items-center gap-2 text-white">
                <Calendar size={12} className="text-red-600" /> {destaque.date}
              </span>
              <span className="flex items-center gap-2 text-white">
                <Trophy size={12} className="text-red-600" />{' '}
                {destaque.competition}
              </span>
              <span className="flex items-center gap-2 text-white">
                <MapPin size={12} className="text-red-600" /> {destaque.stadium}
              </span>
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/5 rounded-full p-4 border border-white/10 shadow-inner">
                  <img
                    src={getLogo(destaque.homeTeam)}
                    alt="Home"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic text-white">
                  {destaque.homeTeam}
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-6 bg-[#020617] px-8 py-4 rounded-2xl border border-red-600/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                  <span className="text-6xl font-black italic text-white">
                    {destaque.scoreHome}
                  </span>
                  <span className="text-3xl font-black text-red-600">-</span>
                  <span className="text-6xl font-black italic text-white">
                    {destaque.scoreAway}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/5 rounded-full p-4 border border-white/10 shadow-inner">
                  <img
                    src={getLogo(destaque.awayTeam)}
                    alt="Away"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic text-white">
                  {destaque.awayTeam}
                </h3>
              </div>
            </div>
          </motion.section>
        )}

        <header className="mb-8 flex items-center gap-4">
          <div className="h-8 w-1 bg-red-600" />
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">
            Últimos <span className="text-red-600">Confrontos</span>
          </h2>
        </header>

        <div className="grid gap-3">
          {ultimosConfrontos.map((jogo, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
              className="relative bg-white/5 border border-white/10 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 group transition-all overflow-hidden"
            >
              {/* Gradiente ocupando quase metade da cápsula */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r ${getResultGradient(
                  jogo
                )} backdrop-blur-sm`}
              />

              <div className="relative z-10 flex items-center gap-4 min-w-[140px] pl-4">
                <Clock size={14} className="text-slate-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {jogo.date}
                </span>
              </div>
              <div className="relative z-10 flex-1 flex items-center justify-center gap-4">
                <div className="flex items-center justify-end gap-3 flex-1">
                  <span className="font-bold uppercase text-xs md:text-sm text-white text-right truncate">
                    {jogo.homeTeam}
                  </span>
                  <img
                    src={getLogo(jogo.homeTeam)}
                    className="w-6 h-6 object-contain"
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-2 bg-[#020617] px-4 py-1.5 rounded-lg border border-white/10 group-hover:border-red-600/50">
                  <span className="font-black text-lg text-white">
                    {jogo.scoreHome}
                  </span>
                  <span className="text-red-600 font-bold">-</span>
                  <span className="font-black text-lg text-white">
                    {jogo.scoreAway}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3 flex-1">
                  <img
                    src={getLogo(jogo.awayTeam)}
                    className="w-6 h-6 object-contain"
                    alt=""
                  />
                  <span className="font-bold uppercase text-xs md:text-sm text-white text-left truncate">
                    {jogo.awayTeam}
                  </span>
                </div>
              </div>
              <div className="relative z-10 hidden lg:block min-w-[150px] text-right text-[9px] font-black text-slate-500 uppercase tracking-widest">
                {jogo.competition}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
