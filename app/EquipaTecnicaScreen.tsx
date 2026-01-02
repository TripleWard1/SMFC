'use client';
import { motion } from 'framer-motion';

const staff = [
  {
    id: 1,
    name: 'Sérgio Talaia',
    role: 'Treinador Principal',
    img: 'https://scontent.fopo5-1.fna.fbcdn.net/v/t39.30808-6/490939038_1144659757672829_3796680238081369843_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YT6CRpTir0AQ7kNvwGB67n4&_nc_oc=AdkxaY14uSZ2p-tGQZ0MKMtrk8DgANGmJWyBXmoIZiy764QMVFbbrj-h7UFpeS2HR8C3UlH5obhPdmCf7fKOOv0k&_nc_zt=23&_nc_ht=scontent.fopo5-1.fna&_nc_gid=gHqk78hvD_B_eS_a-MWlOw&oh=00_AfkyNAWAOlG7pFjExDHbXO-ouB5gwH2XvzCJOxW_chLNkQ&oe=695A7544',
  },
  {
    id: 2,
    name: 'Nuno Talaia',
    role: 'Treinador Adjunto',
    img: 'https://scontent.fopo5-1.fna.fbcdn.net/v/t39.30808-6/490969700_1144659681006170_3901124519734098417_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3lRb0n5-86kQ7kNvwH6f-_M&_nc_oc=AdliIEQATeROGPTlOkdXk4gJRlgIUojDyt4xBbkZ27DELCM90PlbBX4ov1zXvDizVmxpyMhC4o4TjCKUvhm5oRYb&_nc_zt=23&_nc_ht=scontent.fopo5-1.fna&_nc_gid=rUuOVWzydpYKUBgxcD0UVw&oh=00_AfliIxeQfJxmJj9QmxauDUmSoDO7qPHGQ4kji2Y2w-aQmg&oe=695A5748',
  },
  {
    id: 21,
    name: 'André Barros',
    role: 'Treinador de Guarda-Redes',
    img: 'https://scontent.fopo5-1.fna.fbcdn.net/v/t39.30808-6/489925609_1144659601006178_1912458692516518724_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KJ8mbyWpEv0Q7kNvwGhjL0p&_nc_oc=AdmxJiHhebZo2aODh8TEC5AcezYBtWHndOS0OWfHZdMxtP7_2KNiWjqBUx62Ikyur9y9tNAAVBnCZeC4OE59Oabj&_nc_zt=23&_nc_ht=scontent.fopo5-1.fna&_nc_gid=HrcwXbCXQRgFbKkoSNbkQw&oh=00_AflGqc-37eCD5xat0doT2s57rUmi1q2pHOhHdvnsxCC8TA&oe=695A4B80',
  },
  {
    id: 4,
    name: 'Bertinho',
    role: 'Fisioterapeuta',
    img: 'https://scontent.fopo5-1.fna.fbcdn.net/v/t39.30808-6/516736377_1212112700927534_1344662142293995755_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PrtemUr3FOwQ7kNvwHwXEjj&_nc_oc=Adn6KncGRErijxt9h2JKMOZ5eIkNUycIzlSv2_cCV_bQR2Is54BDDUH4ukuk2mVlL83t4XYHxra3JLaQWXCtSWqK&_nc_zt=23&_nc_ht=scontent.fopo5-1.fna&_nc_gid=2a6q1_CnBlSc-0FHQEYnng&oh=00_AfojkJDkS1EqJ7-ZvmO00n776Ab0Mcn_Acx8MvGutIJz4Q&oe=695DBD2A',
  },
];

export default function EquipaTecnicaScreen() {
  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
            Equipa <span className="text-red-600">Técnica</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mt-2" />
        </header>

        <div className="flex flex-col gap-6">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.08] transition-all duration-300"
            >
              {/* Foto - Lado Esquerdo */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden border-r border-white/10">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Informações - Lado Direito */}
              <div className="flex-1 p-6">
                <div className="flex flex-col">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Detalhe Decorativo de Fundo */}
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                <Trophy
                  size={80}
                  className="text-white -mb-4 -mr-4 rotate-12"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pequeno ajuste caso não tenhas o Lucide-React importado corretamente neste ficheiro
import { Trophy } from 'lucide-react';
