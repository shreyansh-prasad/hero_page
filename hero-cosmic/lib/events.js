/**
 * Shunya Competition Events — The 6 core data objects.
 * Each event is rendered 3× (18 DOM nodes) for seamless infinite looping.
 * Content is accessed via: events[nodeIndex % EVENTS.length]
 */

export const EVENTS = [
  {
    id: 0,
    title: "Zero Day Apocalypse",
    tag: "Prompt Engineering · AI Battle",
    description:
      "Face off against an LLM in a high-stakes battle of prompt engineering, logic, and strategy. Outsmart the AI, crack hidden passwords, and prove that human ingenuity still has the upper hand.",
    accent: "#FF2D55", // Pulsar Red
    date: "July 2026",
  },
  {
    id: 1,
    title: "Autopilot",
    tag: "Autonomous AI Agents",
    description:
      "Build autonomous AI agents that think, reason, and solve real-world challenges with maximum efficiency. If you're passionate about the future of AI, this is your chance to create systems that don't just respond—they act.",
    accent: "#00C2FF", // Ion Blue
    date: "July 2026",
  },
  {
    id: 2,
    title: "24-Hour Devlympics",
    tag: "Innovation Sprint · Hackathon",
    description:
      "Turn bold ideas into impactful products in an intense 24-hour innovation sprint. Collaborate, build, and pitch your solution while learning from mentors and competing against the brightest minds.",
    accent: "#FFD60A", // Solar Flare
    date: "August 2026",
  },
  {
    id: 3,
    title: "Flow in Flux 2026",
    tag: "Design · UI/UX · Branding",
    description:
      "Push the boundaries of creativity through Branding, UI/UX, Product Design, Game Design, and AI-assisted design. Transform ambitious ideas into compelling experiences that balance innovation, aesthetics, and usability.",
    accent: "#BF5AF2", // Nebula Violet
    date: "August 2026",
  },
  {
    id: 4,
    title: "Hallucination Hunt",
    tag: "Community · Collaboration",
    description:
      "Connect with fellow developers through an exciting technical experience filled with collaboration, learning, and innovation. Whether you're a beginner or an experienced coder, expect challenges that inspire and communities that empower.",
    accent: "#32D74B", // Plasma Green
    date: "September 2026",
  },
  {
    id: 5,
    title: "AI Case-a-thon",
    tag: "Business · Strategy · AI",
    description:
      "Tackle real-world business challenges where technology meets strategy and innovation. Combine analytical thinking with AI-powered solutions to craft ideas that create measurable impact.",
    accent: "#FF9F0A", // Quasar Amber
    date: "September 2026",
  },
];
