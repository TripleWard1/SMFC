'use client';

import { motion } from 'framer-motion';
import { Football, CheckCircle, Diamond, Crown, ArrowRight } from 'lucide-react'; // Ícones temáticos
import { useRouter } from 'next/navigation'; // Para navegação
import Image from 'next/image'; // Para otimização de imagens

export default function LandingScreen() {
  const router = useRouter();

  // Função para simular transição e redirecionar
  const handleEnterApp = (plan: 'free' | 'premium' | 'pro') => {
    console.log(`Entrando na Webapp como: ${plan}`);
    // Aqui podes adicionar lógica para autenticação ou seleção de plano
    // Por agora, apenas redireciona para a página principal (onde os jogos e plantel estão)
    // Podes ajustar a rota conforme a tua estrutura.
    router.push('/home'); // Ou '/' se o home for a raiz do app
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Elemento de fundo com efeito de campo de futebol, ajustado para ser mais subtil */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('/campo-futebol-overlay.png')`, // Imagem de campo de futebol (precisas de a adicionar)
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'lighten', // Mistura subtil com o fundo
          filter: 'grayscale(100%) blur(2px)', // Desatura e desfoca para um efeito mais dramático
        }}
      />
       {/* Esfera vermelha com efeito de luz (para a transição de futebol) */}
       <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-red-600/10 filter blur-3xl opacity-50 absolute"
        />
         <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full bg-red-600/20 filter blur-2xl opacity-70 absolute"
        />
      </motion.div>


      <motion.div
        className="relative z-20 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Image
            src="https://i.imgur.com/eqWlwr7.png" // Logo do SMFC
            alt="SMFC Logo"
            width={150}
            height={150}
            className="mx-auto mb-4 filter drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]"
            priority // Otimiza o carregamento da logo
          />
          <h1 className="text-4xl sm:text-6xl font-black italic text-white mb-4 leading-tight">
            Bem-vindo ao <span className="text-red-600">SMFC</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Acompanha o teu clube, equipa e resultados de forma profissional.
            Escolhe o teu plano para aceder à plataforma.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Cartão de Acesso Gratuito */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(220,38,38,0.3)" }}
            className="bg-[#0a0f1e]/70 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => handleEnterApp('free')}
          >
            <Football size={48} className="text-red-600 mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">Acesso Básico</h3>
            <p className="text-slate-400 text-sm mb-4">
              Conteúdo essencial para todos os adeptos.
            </p>
            <ul className="text-left text-slate-300 text-sm mb-6 w-full px-4">
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Resultados dos jogos</li>
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Plantel</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Notícias básicas</li>
            </ul>
            <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
              Entrar <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Cartão de Acesso Premium */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(251,191,36,0.3)" }}
            className="bg-[#0a0f1e]/70 border border-yellow-400/30 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden"
            onClick={() => handleEnterApp('premium')}
          >
            <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</span>
            <Diamond size={48} className="text-yellow-400 mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">Plano Premium</h3>
            <p className="text-slate-400 text-sm mb-4">
              Experiência completa com acesso exclusivo.
            </p>
            <ul className="text-left text-slate-300 text-sm mb-6 w-full px-4">
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Tudo do Básico</li>
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Estatísticas detalhadas</li>
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Conteúdo exclusivo</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Sem anúncios</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
              Saber Mais <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Cartão de Acesso Profissional */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(168,85,247,0.3)" }}
            className="bg-[#0a0f1e]/70 border border-purple-500/30 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => handleEnterApp('pro')}
          >
            <Crown size={48} className="text-purple-500 mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">Plano Profissional</h3>
            <p className="text-slate-400 text-sm mb-4">
              Ferramentas avançadas para análise profunda.
            </p>
            <ul className="text-left text-slate-300 text-sm mb-6 w-full px-4">
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Tudo do Premium</li>
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Análise tática avançada</li>
              <li className="flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-emerald-500" /> Relatórios personalizáveis</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Suporte prioritário</li>
            </ul>
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
              Contratar <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}