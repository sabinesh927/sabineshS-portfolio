import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import skillsData from '../data/skills.json';

const categories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend'  },
  { key: 'database', label: 'Database' },
  { key: 'ai',       label: 'AI & ML'  },
  { key: 'tools',    label: 'Tools'    },
  { key: 'cloud',    label: 'Cloud'    },
];

function SkillBar({ skill, inView }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-xs sm:text-sm font-medium">{skill.name}</span>
        <span className="text-indigo-400 text-xs sm:text-sm font-semibold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('frontend');
  const activeSkills = skillsData[active] || [];

  return (
    <section id="skills" className="section-padding relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">My Arsenal</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Category tabs — wrap on small screens */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                active === cat.key
                  ? 'bg-indigo-600 text-white'
                  : 'glass border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl mx-auto glass border border-white/10 rounded-2xl p-5 sm:p-8"
        >
          <div className="text-indigo-400 text-xs font-semibold mb-5 uppercase tracking-widest">
            {categories.find(c => c.key === active)?.label}
          </div>
          {activeSkills.map(skill => (
            <SkillBar key={skill.name} skill={skill} inView={isInView} />
          ))}
        </motion.div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[['10+','Technologies'],['5+','Projects'],['4','Internships'],['4','Certifications']].map(([num, label]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="glass border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black gradient-text">{num}</div>
              <div className="text-gray-500 text-xs mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
