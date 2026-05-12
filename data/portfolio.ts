export const personalInfo = {
  name: "Jaskeerat Singh",
  location: "Chandigarh, India",
  email: "ijassandhu.dev@gmail.com",
  phone: "+91 6230704204",
  github: "https://github.com/ijassandhu",
  linkedin: "https://www.linkedin.com/in/jaskeerat-singh-77b3b3260/",
  resume:
    "https://drive.google.com/file/d/1duJKH-nCWsQop9CJTUpe8dp_22dS9EnQ/view?usp=drive_link",
} as const;

export const heroContent = {
  eyebrow: "AI ENGINEER / RETRIEVAL SYSTEMS / AUTOMATION",
  headline: "Building production-oriented AI systems for retrieval, document intelligence, and workflow automation.",
  paragraph:
    "Focused on document extraction pipelines, retrieval systems, and AI workflows that integrate into real operational processes.",
  supporting:
    "Based in Chandigarh, India. Open to AI Engineer roles, freelance AI automation projects, and collaborations.",
} as const;

export const navLinks = [
  { label: "Works", href: "#projects" },
  { label: "Archive", href: "#archive" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
] as const;

export const credibilityItems = [
  "LLM Applications",
  "RAG Pipelines",
  "PDF / Document Extraction",
  "AI Workflow Automation",
] as const;

export const profileSkillTags = ["LLM", "RAG", "Document AI", "Automation"] as const;

export const aboutContent = {
  paragraphs: [
    "I'm an AI Engineer focused on building practical AI systems, not just prototypes. My work spans LLMs, RAG pipelines, document AI, prompt engineering, and workflow automation.",
    "Most of my recent work involves LLM-powered extraction systems for industrial MTR PDFs, converting complex unstructured documents into reliable structured outputs. I combine prompt engineering, validation logic, and automation tools to build workflows that actually work in production.",
    "I got drawn into AI because of how quickly it's reshaping the way real-world problems can be solved. What drives me is making AI systems that are reliable and genuinely useful, not just impressive in demos.",
  ],
  highlights: [
    {
      title: "Practical AI Systems",
      description: "Focused on real-world AI workflows, not just experiments.",
    },
    {
      title: "Document Intelligence",
      description: "Experience with LLM-powered extraction from complex industrial PDFs.",
    },
    {
      title: "Automation Mindset",
      description: "Building systems that reduce manual work and improve reliability.",
    },
  ],
  education: {
    degree: "B.Tech in Computer Science",
    institution: "Chandigarh Group of Colleges, Landran",
    period: "2022 - 2026",
  },
} as const;

export const experiences = [
  {
    role: "AI Engineer Intern",
    company: "EOXS",
    location: "Toronto, Ontario, Canada",
    period: "March 2026 - Present",
    current: true,
    bullets: [
      "Developed an LLM-powered pipeline to extract structured data from industrial MTR PDFs.",
      "Reduced manual data entry through automated document processing workflows.",
      "Implemented prompt engineering, validation, and retry logic for reliable extraction.",
    ],
  },
  {
    role: "Software Engineering Trainee",
    company: "My Virtual Teams",
    location: "Ludhiana, India",
    period: "Dec 2025 - Feb 2026",
    current: false,
    bullets: [
      "Built and experimented with LLM-based systems, including RAG pipelines and multimodal assistants.",
      "Collaborated in a team-based development workflow using Git/GitHub.",
      "Explored integration of AI models into web interfaces for interactive applications.",
    ],
  },
] as const;

export const skillCategories = [
  {
    label: "Languages",
    skills: ["Python", "C++", "JavaScript"],
  },
  {
    label: "Generative AI",
    skills: ["LangChain", "RAG", "Context Engineering", "Multimodal AI", "Prompt Engineering"],
  },
  {
    label: "LLM Providers",
    skills: ["OpenAI", "Anthropic", "Gemini", "LLaMA", "Hugging Face"],
  },
  {
    label: "Vector Databases",
    skills: ["FAISS", "Pinecone", "Chroma"],
  },
  {
    label: "Automation & Tools",
    skills: ["n8n", "Git/GitHub", "Postman", "CI/CD"],
  },
  {
    label: "Frameworks / Libraries",
    skills: ["Streamlit", "Pandas", "NumPy", "Gradio"],
  },
  {
    label: "Databases",
    skills: ["MySQL"],
  },
] as const;

export const projects = [
  {
    title: "MTR Extraction System",
    type: "Document AI / LLM Automation",
    description:
      "An AI-powered document extraction workflow for industrial Material Test Report PDFs, converting complex unstructured documents into reliable structured data.",
    stack: ["LLMs", "Prompt Engineering", "PDF Processing", "JSON Extraction", "Validation Logic", "n8n"],
    bullets: [
      "Built extraction logic for manufacturer-specific MTR layouts.",
      "Used prompt engineering, validation, and retry logic to improve output reliability.",
      "Focused on structured JSON outputs for automated business workflows.",
    ],
    link: "https://github.com/ijassandhu/Brannon-Steel",
  },
  {
    title: "AIVA - Multimodal Vision AI Assistant",
    type: "Multimodal AI / Voice Interface",
    description:
      "A multimodal AI assistant combining voice input, image understanding, LLM reasoning, and audio responses.",
    stack: ["Groq", "OpenAI", "Vision Models", "Speech-to-Text", "Text-to-Speech", "Gradio", "Python"],
    bullets: [
      "Engineered a pipeline combining speech recognition, vision models, and LLM inference.",
      "Built an STT to Vision to LLM to TTS flow for voice-driven image interaction.",
      "Developed a Gradio interface supporting image upload, voice queries, and audio responses.",
    ],
    link: "https://github.com/ijassandhu/AIVA",
  },
  {
    title: "Medibot - Medical Knowledge RAG System",
    type: "RAG / Knowledge Retrieval",
    description:
      "A retrieval-augmented generation system for question answering over medical knowledge documents.",
    stack: ["Python", "LangChain", "FAISS", "Streamlit", "Hugging Face"],
    bullets: [
      "Built a RAG system for QA over the Gale medical encyclopedia.",
      "Implemented embeddings and semantic search using FAISS.",
      "Designed query reformulation to improve retrieval accuracy.",
    ],
    link: "https://github.com/ijassandhu/Medibot",
  },
] as const;
