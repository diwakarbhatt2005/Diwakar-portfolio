/** ✏️ SKILLS — single source of truth for the Skillset section. */

export type Skill = {
  index: string;
  title: string;
  description: string;
};

export const SKILLS: Skill[] = [
  {
    index: "01",
    title: "Frontend Engineering",
    description:
      "Crafting responsive, scalable interfaces with React.js, Next.js, JavaScript, HTML5, CSS3 and Tailwind CSS.",
  },
  {
    index: "02",
    title: "Backend & Systems",
    description:
      "Building robust backend services and real-time applications with Python, FastAPI, REST APIs, WebSocket, Socket.io, PostgreSQL and SQL.",
  },
  {
    index: "03",
    title: "AI & Intelligent Automation",
    description:
      "Developing AI-powered features using OpenAI, LLMs, RAG, embeddings, AI agents and n8n to automate real-world workflows.",
  },
  {
    index: "04",
    title: "AI Development & Engineering Tools",
    description:
      "Working with modern AI development workflows including Claude Skills & Agents, MCP, Antigravity, Wispr Flow and Playwright.",
  },
  {
    index: "05",
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications with AWS (EC2, S3, IAM), Docker, Docker Compose, GitHub, GitLab, CI/CD and GitHub Actions.",
  },
  {
    index: "06",
    title: "APIs & Product Integrations",
    description:
      "Connecting products with real-world services including Paymob, Bosta, CoinPayments and WhatsApp Business API.",
  },
  {
    index: "07",
    title: "Development Workflow",
    description:
      "Using VS Code and ClickUp for development, collaboration, project tracking and delivery.",
  },
];
