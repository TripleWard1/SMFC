'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Timer, UserCircle } from 'lucide-react';
import { useState } from 'react';
import LandingScreen from './LandingScreen';

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
  
  return (
    <div className="relative">
      {/* Hero Section Abstrato Premium */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#020617]">
          {/* 1. Imagem com Opacidade Alta e sem o efeito de mistura (mix-blend) que a escurece */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://i.imgur.com/5xPm9Fl.jpeg')",
            }}
          />

          {/* 2. ELIMINA OU COMENTA ESTA LINHA ABAIXO PARA TIRAR O PRETO POR CIMA */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/90 to-[#020617]" /> */}

          {/* 3. Brilhos de cor (Opcional: podes mantê-los ou tirar para ficar 100% limpo) */}
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
              Próximo Jogo: 4D 12H 30M
            </span>
          </div>
          <h1 className="text-[13vw] font-black italic uppercase leading-[0.75] tracking-tighter text-white">
            SÃO MAMEDE
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px #dc2626' }}
            >
              D'ESTE F.C.
            </span>
          </h1>
        </motion.div>
      </section>

      {/* Secção de Plantel de Destaque */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 -mt-32 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">
              Os Guerreiros
            </h2>
            <div className="flex items-center gap-2 text-red-600">
              <ShieldCheck size={18} />
              <p className="font-bold uppercase tracking-[0.3em] text-[11px]">
                Destaques da Jornada
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('mudarAba', { detail: 'Plantel' })
              )
            }
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-full transition-all group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              Ver o Plantel Completo
            </span>
            <ArrowRight
              size={14}
              className="text-white group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Grelha Horizontal Fixa com 4 Colunas */}
        <div className="grid grid-cols-4 gap-4">
          {/* ADICIONADO .slice(0, 4) AQUI PARA MOSTRAR APENAS 4 */}
          {players.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative aspect-[3/4] bg-[#0f172a] border border-white/5 rounded-[1.5rem] overflow-hidden group shadow-2xl"
            >
              {/* Espaço para Foto (IMG) - Garante que p.img tem o link correto */}
              <div className="absolute inset-0 z-0">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-50 group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full opacity-20">
                    <UserCircle size={48} />
                  </div>
                )}
              </div>

              {/* Gradiente de Leitura */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />

              {/* Número no topo */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-3xl font-black italic text-white/10 group-hover:text-red-600/40 transition-colors">
                  {p.no}
                </span>
              </div>

              {/* Nome e Info no fundo */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
                  {p.pos}
                </p>
                <h4 className="text-xl font-black uppercase italic leading-none text-white truncate">
                  {p.name}
                </h4>
                <div className="w-0 h-[2px] bg-red-600 mt-3 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-20 bg-[#020617] px-6 text-center">
        <img
          src="https://i.imgur.com/eqWlwr7.png"
          className="w-16 h-16 grayscale opacity-20 mx-auto mb-8"
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600">
          Braga • São Mamede D'Este • 2026
        </p>
      </footer>
    </div>
  );
}
