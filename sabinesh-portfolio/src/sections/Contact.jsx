import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, GitFork, Link2, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const contacts = [
    { icon: Mail,    label: 'Email',    value: 'sabinesh14s@gmail.com',          href: 'mailto:sabinesh14s@gamil.com' },
    { icon: Phone,   label: 'Phone',    value: '+91 84890 39175',                href: 'tel:+91 8489039175' },
    { icon: MapPin,  label: 'Location', value: 'Tamil Nadu, India',              href: '#' },
    { icon: GitFork, label: 'GitHub',   value: 'https://github.com/sabinesh927',            href: 'https://github.com/sabinesh927' },
    { icon: Link2,   label: 'LinkedIn', value: 'linkedin.com/in/sabinesh-s-736118294',       href: 'https://www.linkedin.com/in/sabinesh-s-736118294/' },
  ];

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base px-2">
            Open to internships, full-time roles, and exciting collaborations. Let's build something awesome!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white text-lg sm:text-xl font-bold mb-5 sm:mb-6">Contact Information</h3>
            <div className="space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass border border-white/10 rounded-xl hover:border-indigo-500/40 transition-all group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/40 transition-colors">
                    <Icon size={16} className="text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-gray-500 text-xs">{label}</div>
                    <div className="text-white text-xs sm:text-sm font-medium truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white text-lg sm:text-xl font-bold mb-5 sm:mb-6">Send a Message</h3>
            <form onSubmit={submit} className="space-y-4">
              <input
                name="name" value={form.name} onChange={handle} required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <input
                name="email" value={form.email} onChange={handle} required type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <textarea
                name="message" value={form.message} onChange={handle} required rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-lg shadow-indigo-500/30 text-sm sm:text-base"
              >
                {sent ? (
                  <><CheckCircle size={17} /> Message Sent!</>
                ) : loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={17} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
