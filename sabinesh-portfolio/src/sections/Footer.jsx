import { motion } from 'framer-motion';
import { GitFork, Link2, Mail, Zap, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">

          <div className="flex items-center gap-2 gradient-text font-bold text-lg sm:text-xl">
            <Zap size={18} className="text-indigo-400" />
            Sabinesh S
          </div>

          <p className="text-gray-500 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Sabinesh S. Built with React, Tailwind &amp; ❤️
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            {[
              { icon: GitFork, href: 'https://github.com/sabinesh927',      label: 'GitHub'   },
              { icon: Link2,   href: 'https://www.linkedin.com/in/sabinesh-s-736118294/', label: 'LinkedIn' },
              { icon: Mail,    href: 'mailto:sabinesh14s@gmail.com',      label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="p-2 rounded-lg text-gray-500 hover:text-indigo-400 transition-colors">
                <Icon size={17} />
              </a>
            ))}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/40 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>

        </div>
      </div>
    </footer>
  );
}
