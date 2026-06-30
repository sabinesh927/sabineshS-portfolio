import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitFork, ExternalLink } from 'lucide-react';
import projectsData from '../data/projects.json';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = projectsData.projects.filter(p =>
    (active === 'All' || p.category === active) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="projects" className="section-padding relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">My Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Filter bar — wraps on small screens */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <div className="flex gap-2 flex-wrap">
            {projectsData.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  active === cat
                    ? 'bg-indigo-600 text-white'
                    : 'glass border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all group flex flex-col"
            >
              {/* Image — constrained to card width */}
              <div className="relative overflow-hidden h-44 sm:h-48 w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-indigo-600/80 text-white text-xs font-semibold">
                    Featured
                  </span>
                )}
                <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 text-gray-300 text-xs">
                  {project.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">{project.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Tech chips wrap naturally */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2 py-1 rounded-md bg-indigo-600/20 text-indigo-400 text-xs border border-indigo-500/20 whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                    <GitFork size={14} /> Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 text-xs sm:text-sm transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
