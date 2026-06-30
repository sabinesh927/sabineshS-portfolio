import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="resume" className="section-padding relative z-10">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Resume</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Download My <span className="gradient-text">Resume</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass border border-white/10 rounded-3xl p-8 sm:p-10"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <FileText size={36} className="text-white" />
          </div>
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">Sabinesh S — AI & Fullstack Developer</h3>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            Download my resume to explore my experience in Full Stack Development and Generative AI, including internships, technical projects, skills, certifications, and academic achievements.</p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <motion.a
              href="/resume.pdf"
              download="Sabinesh_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all text-sm sm:text-base"
            >
              <Download size={17} /> Download PDF
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl glass border border-white/20 text-white font-semibold hover:border-indigo-500/50 transition-all text-sm sm:text-base"
            >
              <Eye size={17} /> Preview
            </motion.a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            {[].map(item => (
              <span key={item} className="flex items-center gap-1">
                <span className="text-indigo-400">✓</span> {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
