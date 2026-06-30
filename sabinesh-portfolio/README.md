# Sabinesh AI Portfolio

Premium AI-powered portfolio website for a Full Stack Developer.

## Features

- Dark premium theme with Aurora background, particles, mouse glow
- Animated sections: Hero, About, Skills, Projects, Internship, Education, Certifications, Resume, Contact
- **AI Chatbot** with RAG architecture powered by Groq API
- Fully responsive — mobile to desktop
- Framer Motion animations throughout
- Glassmorphism UI design

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Groq API (LLaMA 3)
- RAG with JSON knowledge base

## Setup

1. Clone and install:
```bash
npm install
```

2. Add your Groq API key:
```bash
cp .env.example .env
# Edit .env and add your GROQ API key
# Get free key at: https://console.groq.com
```

3. Add your resume:
```
Place your resume PDF at: public/resume.pdf
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Customization

Update your personal data in `src/data/`:
- `profile.json` — name, bio, contact info
- `skills.json` — your tech skills
- `projects.json` — your projects
- `education.json` — academic background
- `internships.json` — work experience
- `certifications.json` — certificates

## Deploy

Deploy instantly to Vercel:
```bash
npm install -g vercel
vercel
```

Add `VITE_GROQ_API_KEY` in Vercel environment variables.

## Get Groq API Key (Free)

1. Visit https://console.groq.com
2. Sign up (free)
3. Create an API key
4. Add to `.env` file
