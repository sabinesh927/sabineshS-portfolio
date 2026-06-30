import profileData from "../data/profile.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";
import educationData from "../data/education.json";
import internshipsData from "../data/internships.json";
import certificationsData from "../data/certifications.json";
import faqData from "../data/faq.json";

const knowledgeBase = [
  {
    key: "faq",
    data: faqData,
    keywords: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "thanks",
      "thank you",
      "bye",
      "who created you",
      "help",
      "question",
    ],
  },
  {
    key: "profile",
    data: profileData,
    keywords: [
      "who",
      "about",
      "bio",
      "sabinesh",
      "contact",
      "email",
      "phone",
      "linkedin",
      "github",
      "hire",
      "location",
      "resume",
    ],
  },
  {
    key: "skills",
    data: skillsData,
    keywords: [
      "skill",
      "skills",
      "technology",
      "tech",
      "frontend",
      "backend",
      "react",
      "javascript",
      "python",
      "django",
      "node",
      "mysql",
      "html",
      "css",
      "bootstrap",
      "tailwind",
      "rag",
      "langchain",
      "langgraph",
      "agentic",
      "mcp",
      "gen ai",
      "ai",
    ],
  },
  {
    key: "projects",
    data: projectsData,
    keywords: [
      "project",
      "projects",
      "portfolio",
      "chatbot",
      "rag chatbot",
      "assistant",
      "website",
      "application",
      "build",
      "developed",
    ],
  },
  {
    key: "education",
    data: educationData,
    keywords: [
      "education",
      "college",
      "degree",
      "study",
      "cgpa",
      "school",
      "qualification",
      "engineering",
    ],
  },
  {
    key: "internships",
    data: internshipsData,
    keywords: [
      "internship",
      "internships",
      "experience",
      "company",
      "career",
      "acl",
      "taras",
      "ak infopark",
      "capnies",
    ],
  },
  {
    key: "certifications",
    data: certificationsData,
    keywords: [
      "certificate",
      "certification",
      "certifications",
      "course",
      "courses",
    ],
  },
];

export function retrieveContext(query) {
  const q = query.toLowerCase().trim();

  const matches = knowledgeBase
    .map((item) => ({
      ...item,
      score: item.keywords.filter((k) => q.includes(k)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!matches.length) {
    return knowledgeBase
      .map((item) => `[${item.key.toUpperCase()}]\n${JSON.stringify(item.data)}`)
      .join("\n\n");
  }

  return matches
    .slice(0, 3)
    .map((item) => `[${item.key.toUpperCase()}]\n${JSON.stringify(item.data)}`)
    .join("\n\n");
}

export function buildSystemPrompt(context) {
  return `
You are Sabinesh's AI Portfolio Assistant.

Answer ONLY using the information provided below.

==============================
PORTFOLIO KNOWLEDGE
${context}
==============================

Rules:

1. Only answer questions about Sabinesh.
2. Never invent information.
3. Be professional and friendly.
4. Use markdown when needed.
5. Keep answers under 150 words.
6. If information is unavailable, say:
"I couldn't find that information in Sabinesh's portfolio."
7. Encourage users to explore the portfolio or contact Sabinesh for more details.
`;
}