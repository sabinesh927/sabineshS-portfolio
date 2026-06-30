import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import certsData from '../data/certifications.json';

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-padding relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Certifications</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            My <span className="gradient-text">Credentials</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {certsData.certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition-all group"
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center"
                style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
              >
                <Award size={22} style={{ color: cert.color }} />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-sm mb-1 leading-snug">{cert.name}</h3>
              <p className="text-gray-500 text-xs mb-1">{cert.issuer}</p>
              <span className="text-gray-600 text-xs">{cert.date}</span>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href="#" className="inline-flex items-center gap-1 text-indigo-400 text-xs hover:text-indigo-300">
                  <ExternalLink size={11} /> View
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
