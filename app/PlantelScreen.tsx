'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserCircle, ArrowLeft, Trophy, Timer, Activity } from 'lucide-react';

const allPlayers = [
  // GUARDA-REDES
  { id: 1, name: 'José Torres', pos: 'Guarda Redes', no: '5', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/42/1387642_jose_torres_20251121125426.jpg', nat: 'PT' },
  { id: 2, name: 'Rui Nascimento', pos: 'Guarda Redes', no: '17', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/43/1387643_rui_nascimento_20251121125426.jpg', nat: 'PT' },
  // DEFESAS
  { id: 3, name: 'Marco Ferreira', pos: 'Defesa', no: '3', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/07/47/1090747_marco_ferreira_20240806202253.png', nat: 'PT' },
  { id: 4, name: 'Teixeira', pos: 'Defesa', no: '9', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/31/66/1383166_teixeira_20251114145330.jpg', nat: 'PT' },
  { id: 5, name: 'Nélson Rodrigues', pos: 'Defesa', no: '10', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/86/75/608675_nelson_rodrigues_20240801203140.jpg', nat: 'PT' },
  { id: 6, name: 'Eduardo Rauschkolb', pos: 'Defesa', no: '11', img: 'https://cdn-img.zerozero.pt/img/jogadores/46/1176946_20230701005155_eduardo_rauschkolb.png', nat: 'BR' },
  { id: 7, name: 'Pedro Gonçalves', pos: 'Defesa', no: '16', img: 'https://cdn-img.zerozero.pt/img/jogadores/74/1022574__20230720145325_pedro_goncalves.png', nat: 'PT' },
  { id: 8, name: 'André Silva', pos: 'Defesa', no: '20', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/55/48/545548_andre_silva_20250620095843.jpg', nat: 'PT' },
  { id: 9, name: 'Jorge Silva', pos: 'Defesa', no: '21', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/11/90/661190_jorge_silva_20250602140333.jpg', nat: 'PT' },
  // MÉDIOS
  { id: 10, name: 'Xandão', pos: 'Médio', no: '1', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/93/1387693_xandao_20251121151125.jpg', nat: 'BR' },
  { id: 11, name: 'Renato Gonçalves', pos: 'Médio', no: '2', img: 'https://cdn-img.zerozero.pt/img/jogadores/72/1022572__20230720145324_renato_goncalves.png', nat: 'PT' },
  { id: 12, name: 'Mota', pos: 'Médio', no: '8', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/50/39/565039_mota_20250602140243.jpg', nat: 'PT' },
  { id: 13, name: 'André Pires', pos: 'Médio', no: '12', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/24/42/462442_andre_pires_20250602140555.jpg', nat: 'PT' },
  { id: 14, name: 'Márcio Olimar', pos: 'Médio', no: '13', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/49/1347649_marcio_olimar_20250926102253.jpg', nat: 'AO' },
  { id: 15, name: 'Diogo Sá Rodrigues', pos: 'Médio', no: '19', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/76/41/1387641_diogo_sa_rodrigues_20251121125425.jpg', nat: 'PT' },
  // AVANÇADOS
  { id: 16, name: 'André Braga', pos: 'Avançado', no: '4', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/69/29/1386929_andre_braga_20251120120357.jpg', nat: 'BR' },
  { id: 17, name: 'Renato', pos: 'Avançado', no: '6', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/94/69/1039469_renato_20250620100000.jpg', nat: 'PT' },
  { id: 18, name: 'Rodrigo Aguiar', pos: 'Avançado', no: '7', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/86/51/2808651_rodrigo_araujo_20251119230716.jpg', nat: 'BR' },
  { id: 19, name: 'João Barreiros', pos: 'Avançado', no: '14', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/25/66/952566_joao_barreiros__20240812135045.jpg', nat: 'PT' },
  { id: 20, name: 'Denilson Campos', pos: 'Avançado', no: '15', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/01/02/1350102_denilson_silva_campos_20250930125523.jpg', nat: 'AO' },
  { id: 21, name: 'David Simões', pos: 'Avançado', no: '18', img: 'https://cdn-img.zerozero.pt/img/jogadores/new/85/02/678502_david_simoes_20250602140513.jpg', nat: 'PT' },
];

const categories = ['Todos', 'Guarda Redes', 'Defesa', 'Médio', 'Avançado'];

export default function PlantelScreen() {
  const [filter, setFilter] = useState('Todos');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const getPlayerStats = (player: any) => {
    // Dados baseados na tua imagem do Xandão
    if (player.name === 'Xandão') {
      return { jogos: 10, golos: 1, minutos: 888, forma: ['V', 'V', 'E', 'D', 'E'], v: 5, e: 2, d: 3 };
    }
    return { jogos: 0, golos: 0, minutos: 0, forma: ['-'], v: 0, e: 0, d: 0 };
  };

  const filteredPlayers =
    filter === 'Todos'
      ? allPlayers
      : allPlayers.filter((p) => p.pos === filter);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <ShieldCheck size={24} />
              <span className="font-black uppercase tracking-[0.4em] text-xs">SÃO MAMEDE FUTEBOL CLUBE</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
              O <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Plantel</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Temporada 2025 / 2026</p>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-20 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filter === cat ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-24">
          {categories.filter((c) => c !== 'Todos').map((cat) => {
            const playersInCat = filteredPlayers.filter((p) => p.pos === cat);
            if (playersInCat.length === 0) return null;

            return (
              <section key={cat} className="relative">
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-2xl font-black uppercase italic text-red-600 whitespace-nowrap">{cat}s</h2>
                  <div className="w-full h-[1px] bg-gradient-to-r from-red-600/50 to-transparent" />
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {playersInCat.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedPlayer(p)}
                        className="relative aspect-[3/4] bg-[#0a0f1e] border border-white/5 rounded-[2rem] overflow-hidden group shadow-2xl cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
                        <div className="absolute top-4 right-6 z-0">
                          <span className="text-7xl font-black italic text-white/[0.03] group-hover:text-red-600/[0.05] transition-colors duration-500">{p.no}</span>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 z-20">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{p.nat}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">#{p.no}</span>
                          </div>
                          <h3 className="text-2xl font-black uppercase italic leading-none text-white mb-4 group-hover:text-red-500 transition-colors">{p.name}</h3>
                          <div className="w-8 h-1 bg-red-600 group-hover:w-full transition-all duration-700 rounded-full" />
                        </div>
                        <div className="absolute inset-0 z-0">
                          {p.img ? (
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-50 group-hover:opacity-100" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]"><UserCircle size={180} strokeWidth={1} /></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            );
          })}
        </div>

        {/* --- PAINEL LATERAL PREMIUM (CORRIGIDO PARA MOBILE) --- */}
        <AnimatePresence>
          {selectedPlayer && (
            <>
              {/* Overlay Escuro: Clicar aqui também fecha o menu */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedPlayer(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]" // Z-index alto para cobrir tudo
              />
              
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                /* h-full e overflow-y-auto permitem o scroll vertical no telemóvel */
                className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#020617] border-l border-white/10 z-[120] flex flex-col shadow-2xl"
              >
                {/* Cabeçalho Fixo para o botão Voltar estar sempre visível */}
                <div className="p-6 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-20">
                  <button 
                    onClick={() => setSelectedPlayer(null)} 
                    className="text-slate-500 uppercase text-[11px] font-black tracking-[0.3em] flex items-center gap-2 hover:text-white transition-colors active:scale-95"
                  >
                    <ArrowLeft size={18} className="text-red-600" /> Voltar ao Plantel
                  </button>
                </div>

                {/* Área de Conteúdo com Scroll Próprio */}
                <div className="flex-1 overflow-y-auto p-8 pt-4 pb-24 custom-scrollbar">
                  
                  {/* Foto e Info Principal */}
                  <div className="relative mb-12 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full" />
                    <img src={selectedPlayer.img} className="w-56 h-56 mx-auto rounded-3xl object-cover border border-white/10 shadow-2xl relative z-10" alt={selectedPlayer.name} />
                    <div className="mt-8 relative z-10">
                      <span className="text-red-600 font-black italic text-6xl opacity-10 absolute -top-6 left-0 w-full text-center">#{selectedPlayer.no}</span>
                      <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-tight mb-2">{selectedPlayer.name}</h2>
                      <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">{selectedPlayer.pos} • S. MAMEDE D'ESTE</p>
                    </div>
                  </div>

                  {/* Grid de Stats Baseado na Imagem do Xandão */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center">
                      <Trophy className="mx-auto mb-2 text-yellow-500/50" size={20} />
                      <span className="block text-4xl font-black text-white">{getPlayerStats(selectedPlayer).jogos}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Jogos</span>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center">
                      <Activity className="mx-auto mb-2 text-red-500/50" size={20} />
                      <span className="block text-4xl font-black text-red-500">{getPlayerStats(selectedPlayer).golos}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Golos</span>
                    </div>
                  </div>

                  {/* Barra de Minutos Estilo App Mobile */}
                  <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 mb-8">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Minutos Jogados</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-white italic">{getPlayerStats(selectedPlayer).minutos}</span>
                          <span className="text-slate-600 font-black text-sm uppercase">Min</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(getPlayerStats(selectedPlayer).minutos / 900) * 100}%` }} 
                        className="h-full bg-gradient-to-r from-red-600 to-red-400" 
                      />
                    </div>
                  </div>

                  {/* Forma Recente VVED */}
                  <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Forma Recente</h4>
                    <div className="flex gap-3 justify-center">
                      {getPlayerStats(selectedPlayer).forma.map((res: string, i: number) => (
                        <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${
                          res === 'V' ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 
                          res === 'E' ? 'bg-slate-500/20 text-slate-500 border border-slate-500/20' : 
                          res === 'D' ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-white/5 text-slate-700'
                        }`}>
                          {res}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}