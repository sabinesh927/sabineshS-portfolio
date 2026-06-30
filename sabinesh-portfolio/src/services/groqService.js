import { retrieveContext } from './ragService';

const DEFAULT_REPLY = `Hi! I'm Sabinesh's AI assistant. I can tell you about his:\n\n• 💡 **Skills** - React, Node.js, Python, AI/ML\n• 🚀 **Projects** - Web apps, AI tools, chatbots\n• 🎓 **Education** - B.E. CSE\n• 💼 **Experience** - Internships\n• 📬 **Contact** - Available for opportunities!\n\nWhat would you like to know? ⚡`;

function formatField(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object' && value !== null) return Object.values(value).map(formatField).join(' ');
  return String(value);
}

function buildReplyFromContext(query, contextStr) {
  const q = query.toLowerCase();

  // Greetings / thanks / bye — quick replies, no need to dig into JSON
  if (/\b(hi|hello|hey)\b/.test(q)) {
    return "Hey there! 👋 Ask me anything about Sabinesh — his skills, projects, education, or how to contact him.";
  }
  if (/\b(thanks|thank you)\b/.test(q)) {
    return "You're welcome! 😊 Let me know if you'd like to know more about Sabinesh.";
  }
  if (/\bbye\b/.test(q)) {
    return "Bye! 👋 Feel free to come back if you have more questions about Sabinesh.";
  }

  try {
    const blocks = contextStr.split('\n\n').filter(Boolean);
    const parsed = blocks.map(b => {
      const [, key, json] = b.match(/\[(.*?)\]\n([\s\S]*)/) || [];
      return { key, data: json ? JSON.parse(json) : null };
    }).filter(b => b.data);

    if (!parsed.length) return DEFAULT_REPLY;

    const top = parsed[0];

    switch (top.key) {
      case 'PROFILE': {
        const p = top.data;
        return `**About Sabinesh:**\n\n${p.bio || p.summary || ''}\n\n📧 ${p.email || ''}\n🐙 ${p.github || ''}\n💼 ${p.linkedin || ''}`;
      }
      case 'SKILLS': {
        const s = top.data;
        const lines = Object.entries(s).map(([cat, arr]) =>
          `**${cat.charAt(0).toUpperCase() + cat.slice(1)}:** ${Array.isArray(arr) ? arr.map(i => i.name || i).join(', ') : ''}`
        );
        return `**Sabinesh's Tech Stack:**\n\n${lines.join('\n')}`;
      }
      case 'PROJECTS': {
        const list = top.data.projects || top.data;
        const items = (Array.isArray(list) ? list : []).slice(0, 4).map(
          p => `• **${p.title}** — ${p.description}`
        );
        return `**Featured Projects:**\n\n${items.join('\n\n')}`;
      }
      case 'EDUCATION': {
        const list = top.data.education || top.data;
        const items = (Array.isArray(list) ? list : []).map(
          e => `🎓 **${e.degree}**\n${e.institution} | ${e.cgpa ? 'CGPA: ' + e.cgpa : e.percentage} | ${e.duration}`
        );
        return `**Education:**\n\n${items.join('\n\n')}`;
      }
      case 'INTERNSHIPS': {
        const list = top.data.internships || top.data;
        const items = (Array.isArray(list) ? list : []).map(
          i => `🏢 **${i.company}** — ${i.role}\n${i.duration} | ${i.description}`
        );
        return `**Internship Experience:**\n\n${items.join('\n\n')}`;
      }
      case 'CERTIFICATIONS': {
        const list = top.data.certifications || top.data;
        const items = (Array.isArray(list) ? list : []).map(
          c => `📜 ${c.name} — ${c.issuer} (${c.date})`
        );
        return `**Certifications:**\n\n${items.join('\n')}`;
      }
      case 'FAQ': {
        const list = top.data.faqs || top.data;
        const found = (Array.isArray(list) ? list : []).find(f =>
          q.includes(f.q.toLowerCase().split(' ').slice(0, 3).join(' '))
        );
        return found ? found.a : DEFAULT_REPLY;
      }
      default:
        return DEFAULT_REPLY;
    }
  } catch {
    return DEFAULT_REPLY;
  }
}

export async function sendMessageToGroq(messages, userMessage) {
  await new Promise(resolve => setTimeout(resolve, 500)); // natural "thinking" delay
  const context = retrieveContext(userMessage);
  return buildReplyFromContext(userMessage, context);
}