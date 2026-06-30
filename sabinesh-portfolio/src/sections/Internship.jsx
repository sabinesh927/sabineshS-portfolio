import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import internshipsData from '../data/internships.json';

export default function Internship() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="internship" className="section-padding relative z-10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Experience</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Internship <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line — left-5 so it's inside padding on mobile */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-600 via-purple-600 to-transparent" />

          {internshipsData.internships.map((intern, i) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative pl-16 sm:pl-20 mb-10 sm:mb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-[14px] top-6 w-5 h-5 rounded-full bg-indigo-600 border-4 border-gray-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="glass border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-indigo-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 size={15} className="text-indigo-400 flex-shrink-0" />
                      <h3 className="text-white font-bold text-base sm:text-lg">{intern.company}</h3>
                    </div>
                    <p className="text-indigo-400 font-semibold text-sm">{intern.role}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 text-xs text-gray-500 flex-shrink-0">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {intern.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {intern.location}</span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 text-center w-fit">{intern.type}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm mb-4">{intern.description}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {intern.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="text-gray-300 text-xs sm:text-sm font-semibold mb-2">Key Achievements:</div>
                  {intern.achievements.map((a, j) => (
                    <div key={j} className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm">
                      <CheckCircle2 size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
