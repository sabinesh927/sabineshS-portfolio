import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, Coffee } from 'lucide-react';
import profileImg from "../assets/sabinesh.jpeg";


const traits = [
  { icon: Code2,   label: 'Clean Code',    desc: 'Readable, maintainable code'      },
  { icon: Brain,   label: 'AI Enthusiast', desc: 'Building smart AI-powered apps'   },
  { icon: Rocket,  label: 'Fast Learner',  desc: 'Adapting to new tech quickly'     },
  { icon: Coffee,  label: 'Problem Solver',desc: 'Creative solutions to hard problems'},
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  // Only Y-axis animations — X animations can trigger horizontal scroll
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  });

  return (
    <section id="about" className="section-padding relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Passionate <span className="gradient-text">Developer</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Photo block */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 p-1">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900">
                    <img
                        src={profileImg}
                        alt="Sabinesh"
                        className="w-full h-full object-cover"
                        />
                   </div>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-3 -right-3 glass border border-white/10 rounded-xl p-3 sm:p-4 text-center"
              >
                
              </motion.div>
            </div>
          </motion.div>

          {/* Text block */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="space-y-5 min-w-0"   /* min-w-0 prevents flex child overflow */
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white">
            Hi, I'm Sabinesh
            Software Developer | AI & Web Technologies
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
             I'm a Computer Science Engineering student from Tamil Nadu, India, passionate about Full Stack Development and Generative AI. I build modern, responsive web applications using React, Next.js, Node.js, and Python while integrating Large Language Models (LLMs), LangChain, and LangGraph to create intelligent AI-powered applications. I'm continuously learning and building projects that solve real-world problems. </p>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I enjoy building complete, end-to-end applications—from creating modern, responsive user interfaces to developing scalable backend systems and integrating AI technologies. My passion is solving real-world problems by building intelligent, high-performance software that delivers meaningful impact. </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
              {['python','React.js','Langchain','RAG','Gen AI','Agentic AI'].map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full glass border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm">
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {traits.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass border border-white/10 rounded-xl p-3 sm:p-4 hover:border-indigo-500/40 transition-colors">
                  <Icon size={18} className="text-indigo-400 mb-2" />
                  <div className="text-white font-semibold text-xs sm:text-sm">{label}</div>
                  <div className="text-gray-500 text-xs">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
