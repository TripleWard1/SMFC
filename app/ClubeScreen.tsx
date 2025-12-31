'use client';
import { motion } from 'framer-motion';
import { History, Target, MapPin } from 'lucide-react';

export default function ClubeScreen() {
  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com Logo e Título */}
        <header className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 mb-6"
          >
            <img
              src="https://i.imgur.com/S4Jv3DI.png"
              alt="SMFC Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            />
          </motion.div>

          <div className="text-center">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
              Nossa <span className="text-red-600">História</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto" />
          </div>
        </header>

        {/* Bloco de História Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
        >
          <History className="absolute -top-6 -right-6 text-white/5 w-32 h-32" />

          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed text-lg italic mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
              Clube da Freguesia de Este S. Mamede, concelho de Braga, fundado
              em 1975, por alguns elementos do corpo nacional de escutas desta
              Freguesia...
            </p>

            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                Vivendo alguns meses em paralelo com os escuteiros, mas cedo os
                seus fundadores se aperceberam que não podiam viver nesta
                situação. Foi então que, volvidos alguns meses, foi decidido dar
                um nome próprio: <strong>LEÕES FUTEBOL CLUBE</strong>. No início
                as dificuldades foram muitas, as primeiras reuniões foram feitas
                numa casa particular, já em ruínas, onde foram planeadas várias
                atividades.
              </p>

              <div className="bg-red-600/10 border-l-4 border-red-600 p-6 my-8 rounded-r-xl">
                <p className="text-white italic font-medium m-0">
                  "O ponto mais alto da sua história ocorreu em 1991, ano em que
                  foi campeão da série B, ascendendo à primeira divisão
                  distrital... ficando Este S. Mamede praticamente deserto."
                </p>
              </div>

              <p>
                Em 26 de Maio de 2003, através de um concurso aos jovens
                estudantes da Freguesia para um novo logotipo e denominação, o
                clube passou a chamar-se{' '}
                <strong>“S. Mamede d’Este Futebol Clube”</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Secção de Futuro / Visão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-4 text-red-600">
              <Target size={24} />
              <h3 className="text-white font-black uppercase tracking-widest text-sm">
                Visão e Futuro
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-loose">
              Além do Futebol, pensamos em construir uma secção para o Futebol
              Juvenil e também Futsal, aproveitando as infraestruturas da
              Freguesia. É preciso gente com vontade de trabalhar para
              enriquecer o desporto nesta terra.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-center items-center text-center"
          >
            <MapPin className="text-red-600 mb-2" size={24} />
            <span className="text-white font-black text-2xl">SMFC</span>
            <span className="text-red-600 font-bold">(2011)</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
