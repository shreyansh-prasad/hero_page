/**
 * Events Data Store — Symbiosis: Living System Interface
 * 
 * Each event defines:
 * - headlineColor: Editorial display color for main typography
 * - biomeColor: Natural system color (Left Hemisphere)
 * - techColor: Engineered system color (Right Hemisphere)
 */

export const events = [
  {
    id: 'zero-day',
    name: 'Zero Day Apocalypse',
    tagline: 'Crack hidden passwords, prove human ingenuity beats the AI.',
    tags: ['ECOLOGICAL DISTURBANCE', 'RESILIENCE INDEX'],
    headlineColor: 'var(--headline-zero-day)',
    biomeColor: 'var(--accent-zero-day-left)',
    techColor: 'var(--accent-zero-day-right)',
    leftAccent: 'var(--accent-zero-day-left)',
    rightAccent: 'var(--accent-zero-day-right)',
    accent: 'var(--accent-zero-day-left)',
    biologicalModel: 'FOREST REGENERATION',
    technologicalAnalog: 'CLIMATE RESILIENCE',
    sharedPrinciple: 'ADAPTATION',
    telemetry: {
      observed: 'WILDFIRE DISTURBANCE',
      analog: 'CLIMATE PREDICTION MODEL',
      coexistence: 'ECOLOGICAL REGENERATION'
    },
    format: 'Live Elimination &bull; Multi-Round',
    teamSize: '1 &ndash; 2 Operatives',
    duration: '3 Hours High-Stakes',
    prize: '$4,000 Cash + GPU Compute',
    description: 'A prompt-engineering and logic battle against an adversarial LLM. Use creativity, jailbreak deduction, and forensic prompting to bypass security firewalls and extract the vault access keys before time runs out.'
  },
  {
    id: 'autopilot',
    name: 'Autopilot',
    tagline: 'Build autonomous AI agents that reason and act on real-world challenges.',
    tags: ['SWARM INTELLIGENCE', 'COLLECTIVE NAVIGATION'],
    headlineColor: 'var(--headline-autopilot)',
    biomeColor: 'var(--accent-autopilot-left)',
    techColor: 'var(--accent-autopilot-right)',
    leftAccent: 'var(--accent-autopilot-left)',
    rightAccent: 'var(--accent-autopilot-right)',
    accent: 'var(--accent-autopilot-left)',
    biologicalModel: 'MURMURATION',
    technologicalAnalog: 'AUTONOMOUS ROBOTICS',
    sharedPrinciple: 'COLLECTIVE INTELLIGENCE',
    telemetry: {
      observed: 'FLOCK COORDINATION',
      analog: 'MULTI-AGENT DRONE SWARM',
      coexistence: 'DECENTRALIZED LOGIC'
    },
    format: 'Autonomous Benchmark &bull; Agent Arena',
    teamSize: '1 &ndash; 4 Builders',
    duration: '6 Hours Sprint',
    prize: '$5,000 Cash + Seed Fast-Track',
    description: 'Architect and deploy multi-agent autonomous swarms capable of spatial reasoning, dynamic tool utilization, and self-correcting decision trees in volatile simulated environments.'
  },
  {
    id: 'devlympics',
    name: '24-Hour Devlympics',
    tagline: 'A 24-hour build-and-pitch innovation sprint with mentors.',
    tags: ['DISTRIBUTED COMPUTING', 'MYCELIUM NODE'],
    headlineColor: 'var(--headline-devlympics)',
    biomeColor: 'var(--accent-devlympics-left)',
    techColor: 'var(--accent-devlympics-right)',
    leftAccent: 'var(--accent-devlympics-left)',
    rightAccent: 'var(--accent-devlympics-right)',
    accent: 'var(--accent-devlympics-left)',
    biologicalModel: 'MYCELIAL NETWORK',
    technologicalAnalog: 'DISTRIBUTED SYSTEMS',
    sharedPrinciple: 'DECENTRALIZED INFRASTRUCTURE',
    telemetry: {
      observed: 'NUTRIENT EXCHANGE',
      analog: 'DATA PACKET ROUTING',
      coexistence: 'NODE DEPENDENCY'
    },
    format: '24-Hour Nonstop &bull; Build & Pitch',
    teamSize: '2 &ndash; 4 Founders',
    duration: '24 Hours Endurance',
    prize: '$10,000 Pool + VC Intros',
    description: 'The ultimate endurance test for builders. Conceive, develop, and live-demo a functioning software or hardware AI prototype within 24 hours, guided by industry tech leads and venture mentors.'
  },
  {
    id: 'flow-in-flux',
    name: 'Flow in Flux',
    tagline: 'Branding, UI/UX, product design, game design, AI-assisted design.',
    tags: ['FLUID SIMULATION', 'ENERGY MOVEMENT'],
    headlineColor: 'var(--headline-flow-flux)',
    biomeColor: 'var(--accent-flow-flux-left)',
    techColor: 'var(--accent-flow-flux-right)',
    leftAccent: 'var(--accent-flow-flux-left)',
    rightAccent: 'var(--accent-flow-flux-right)',
    accent: 'var(--accent-flow-flux-left)',
    biologicalModel: 'FLUID ECOSYSTEM',
    technologicalAnalog: 'GENERATIVE MEDIA',
    sharedPrinciple: 'DYNAMIC EQUILIBRIUM',
    telemetry: {
      observed: 'OCEANIC CURRENTS',
      analog: 'DATA STREAM OPTIMIZATION',
      coexistence: 'FLUID ARCHITECTURE'
    },
    format: 'Creative Suite &bull; Visual Showcase',
    teamSize: '1 &ndash; 3 Designers',
    duration: '8 Hours Intensive',
    prize: '$4,500 Cash + Design Fellowship',
    description: 'A comprehensive design arena pushing the boundaries of interaction design, dynamic generative design systems, and spatial interfaces. Create fluid, hyper-responsive digital artifacts that captivate.'
  },
  {
    id: 'hallucination-hunt',
    name: 'Hallucination Hunt',
    tagline: 'A collaborative technical challenge track for developers of all levels.',
    tags: ['MIMICRY', 'PATTERN RECOGNITION'],
    headlineColor: 'var(--headline-hallucination)',
    biomeColor: 'var(--accent-hallucination-left)',
    techColor: 'var(--accent-hallucination-right)',
    leftAccent: 'var(--accent-hallucination-left)',
    rightAccent: 'var(--accent-hallucination-right)',
    accent: 'var(--accent-hallucination-left)',
    biologicalModel: 'MIMICRY & CAMOUFLAGE',
    technologicalAnalog: 'COMPUTER VISION',
    sharedPrinciple: 'PATTERN PERCEPTION',
    telemetry: {
      observed: 'PREDATOR EVASION',
      analog: 'ADVERSARIAL DETECTION',
      coexistence: 'DECEPTIVE PATTERNS'
    },
    format: 'Capture The Bug &bull; Collaborative Track',
    teamSize: '1 &ndash; 4 Engineers',
    duration: '4 Hours Diagnostics',
    prize: '$3,500 Bounty Pool',
    description: 'Track down, diagnose, and isolate complex model hallucinations, poisoned embeddings, and subtle edge-case failures in deep-learning architectures under live pressure.'
  },
  {
    id: 'case-a-thon',
    name: 'AI Case-a-thon',
    tagline: 'Real-world business case challenges solved with AI-powered strategy.',
    tags: ['NEURAL SYSTEMS', 'PATTERN PROCESSING'],
    headlineColor: 'var(--headline-caseathon)',
    biomeColor: 'var(--accent-caseathon-left)',
    techColor: 'var(--accent-caseathon-right)',
    leftAccent: 'var(--accent-caseathon-left)',
    rightAccent: 'var(--accent-caseathon-right)',
    accent: 'var(--accent-caseathon-left)',
    biologicalModel: 'NEURAL BIOLOGY',
    technologicalAnalog: 'ARTIFICIAL NEURAL NETWORKS',
    sharedPrinciple: 'INFORMATION PROCESSING',
    telemetry: {
      observed: 'SYNAPTIC FIRING',
      analog: 'MACHINE LEARNING MODELS',
      coexistence: 'PREDICTIVE REASONING'
    },
    format: 'Consulting Arena &bull; Case Presentation',
    teamSize: '2 &ndash; 4 Strategists',
    duration: '5 Hours Analysis',
    prize: '$5,000 Cash + Consulting Grants',
    description: 'Devise data-driven strategic interventions for Fortune 500 scenarios using generative analytics and quantitative AI models. Bridge technical capability with multi-million dollar market impact.'
  }
];
