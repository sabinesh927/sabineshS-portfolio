import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Star } from 'lucide-react';
import educationData from '../data/education.json';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section-padding relative z-10">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Education</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Academic <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="space-y-5 sm:space-y-6">
          {educationData.education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg leading-snug">{edu.institution}</h3>
                    <p className="text-indigo-400 font-medium text-sm">{edu.degree}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {edu.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {edu.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg sm:text-xl">
                    <Star size={16} />
                    {edu.cgpa || edu.percentage}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                    edu.status === 'Pursuing'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {edu.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                {edu.highlights.map(h => (
                  <span key={h} className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs">{h}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
