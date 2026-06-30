import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Bot, User, Sparkles } from 'lucide-react';
import { sendMessageToGroq } from '../services/groqService';

const SUGGESTIONS = [
  'Who is Sabinesh?',
  'What are his skills?',
  'Show his projects',
  'Can I hire him?',
  'His education?',
  'Internship experience?',
];

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3 items-center">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-500"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isBot = msg.role === 'assistant';
  return (
    <div className={`flex gap-2 sm:gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isBot ? 'bg-indigo-600' : 'bg-purple-600'}`}>
        {isBot ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
      </div>
      <div className={`max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
        isBot
          ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
          : 'bg-indigo-600 text-white rounded-tr-none'
      }`}>
        {msg.content}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! 👋 I'm Sabinesh's AI Assistant. Ask me anything about his skills, projects, experience, or how to hire him!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const reply = await sendMessageToGroq(history, msg);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }]);
    }
    setLoading(false);
  };

  const clearChat = () => setMessages([
    { role: 'assistant', content: "Chat cleared! How can I help you learn about Sabinesh? 😊" }
  ]);

  return (
    <>
      {/* Trigger button — fixed, well within viewport */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/40 flex items-center justify-center transition-all"
        style={{ width: 52, height: 52 }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={20} /></motion.div>
            : <motion.div key="mc" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={20} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window — max-width capped so it never causes overflow */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed bottom-20 right-5 z-50 flex flex-col glass border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: 'min(360px, calc(100vw - 40px))',  /* Never exceeds viewport */
              height: 'min(520px, calc(100dvh - 120px))',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-indigo-600/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Sabinesh AI</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online
                  </div>
                </div>
              </div>
              <button onClick={clearChat} className="text-gray-500 hover:text-white transition-colors" aria-label="Clear chat">
                <Trash2 size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
              {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-indigo-500/40 hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Ask about Sabinesh..."
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <motion.button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center disabled:opacity-50 transition-all flex-shrink-0"
                >
                  <Send size={14} />
                </motion.button>
              </div>
              <p className="text-gray-600 text-xs text-center mt-2">Powered by Groq AI + RAG</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
