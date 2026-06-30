import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight, Sparkles, GitFork, Link2 } from 'lucide-react';

const roles = [
    'AI Full Stack Developer',
    'Frontend Engineer',
    'React Specialist',
    'AI/ML Enthusiast',
    'Open to Internship',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIdx];
    let i = 0;
    let timeout;
    if (typing) {
      const interval = setInterval(() => {
        setDisplayed(role.slice(0, ++i));
        if (i === role.length) {
          clearInterval(interval);
          timeout = setTimeout(() => setTyping(false), 2000);
        }
      }, 60);
      return () => { clearInterval(interval); clearTimeout(timeout); };
    } else {
      let j = role.length;
      const interval = setInterval(() => {
        setDisplayed(role.slice(0, --j));
        if (j === 0) {
          clearInterval(interval);
          setRoleIdx(prev => (prev + 1) % roles.length);
          setTyping(true);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [roleIdx, typing]);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  // ⚠ Use opacity-only or Y-axis animations — no X-axis that can push layout
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center section-padding z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-400 text-sm mb-8">
            <Sparkles size={14} />
            Available for Internship &amp; Full-time
          </motion.div>

          <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight break-words">
            Hi, I'm <span className="gradient-text">Sabinesh</span>
          </motion.h1>

          {/* Fixed height prevents layout shift; min-w-0 prevents flex blowout */}
          <motion.div
            variants={item}
            className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-300 mb-8 min-h-[3rem] flex items-center justify-center overflow-hidden"
          >
            <span className="gradient-text typing-cursor truncate max-w-full px-2">{displayed}</span>
          </motion.div>

          <motion.p variants={item} className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed px-2">
            Building intelligent, scalable web applications at the intersection of modern frontend development and cutting-edge AI technologies.
          </motion.p>

          {/* flex-wrap ensures buttons stack on tiny screens instead of overflowing */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mb-16 px-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/30 text-sm sm:text-base"
            >
              Hire Me <ArrowRight size={17} />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl glass border border-white/20 text-white font-semibold hover:border-indigo-500/50 transition-all text-sm sm:text-base"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl glass border border-white/20 text-white font-semibold hover:border-indigo-500/50 transition-all text-sm sm:text-base"
            >
              <Download size={16} /> Resume
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="flex items-center justify-center gap-5">
            {[
              { icon: GitFork, href: 'https://github.com/sabinesh927',          label: 'GitHub'   },
              { icon: Link2,   href: 'https://www.linkedin.com/in/sabinesh-s-736118294/',     label: 'LinkedIn' },
              { icon: Mail,    href: 'mailto:sabinesh14s@gmail.com',          label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="p-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-16 grid grid-cols-3 gap-6 max-w-xs mx-auto">
            {[['5+', 'Projects'], ['4', 'Internships'], ['7.8', 'CGPA']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black gradient-text">{num}</div>
                <div className="text-gray-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
