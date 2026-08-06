export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  version: string;
  githubUrl: string;
  downloadUrl: string;
  installUrl: string;
  documentationUrl: string;
  supportUrl: string;
  agentrouterUrl: string;
  statusEndpoint?: string;

  navigation: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;

  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
  };

  primaryFeatures: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    badge?: string;
  }>;

  whyFeatures: Array<{
    id: string;
    title: string;
    description: string;
    iconName: string;
    mascotInspect?: boolean;
  }>;

  howItWorks: {
    badge: string;
    title: string;
    description: string;
    nodes: Array<{
      id: number;
      name: string;
      subtext: string;
    }>;
    cards: Array<{
      title: string;
      description: string;
      codeSnippet: string;
    }>;
    lifecycleBefore: Array<{
      label: string;
      status: 'request' | 'error' | 'fail';
      detail?: string;
    }>;
    lifecycleAfter: Array<{
      label: string;
      status: 'request' | 'proxy' | 'converted' | 'retry' | 'success';
      detail?: string;
    }>;
  };

  retryLogic: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    timeline: Array<{
      step: number;
      title: string;
      subtitle: string;
      detail: string;
    }>;
    rateLimitCard: {
      originalCode: string;
      convertedCode: string;
      retryAfter: string;
    };
    backoffSteps: Array<{
      attempt: string;
      delay: string;
      seconds: number;
    }>;
    retryableItems: string[];
    nonRetryableItems: string[];
  };

  quickstart: {
    badge: string;
    title: string;
    subhead: string;
    steps: Array<{
      step: number;
      title: string;
      tabs: Array<{
        label: string;
        code: string;
        language: string;
      }>;
    }>;
    reassuranceCards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };

  compatibility: {
    title: string;
    subtitle: string;
    agentRouterCard: {
      title: string;
      highlights: string[];
    };
    matrix: Array<{
      component: string;
      messagesApi: 'supported' | 'partial' | 'not_supported';
      streaming: 'supported' | 'partial' | 'not_supported';
      toolCalls: 'supported' | 'partial' | 'not_supported';
      authentication: 'supported' | 'partial' | 'not_supported';
      retryBehavior: 'supported' | 'partial' | 'not_supported';
      notes: string;
    }>;
  };

  faq: Array<{
    id: string;
    question: string;
    answer: string;
  }>;

  troubleshooting: Array<{
    title: string;
    symptom: string;
    solution: string;
  }>;

  docs: Array<{
    id: string;
    title: string;
    content: string;
    codeExamples?: Array<{
      language: string;
      label: string;
      code: string;
    }>;
  }>;
}

export const siteContent: SiteConfig = {
  name: "Claude Proxy",
  shortName: "Claude Proxy",
  tagline: "Reliability proxy for Claude Code + AgentRouter",
  description: "A local Python proxy that sits between Claude Code and AgentRouter. It normalizes supported quota or rate-limit failures into HTTP 429 responses with Retry-After, allowing compatible clients to apply their normal retry behavior.",
  version: process.env.NEXT_PUBLIC_CURRENT_VERSION || "v3.1.0",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL || "https://github.com/brainstormersia-cmd/agentrouter-autoretry-claudecode",
  downloadUrl: process.env.NEXT_PUBLIC_DOWNLOAD_URL || "https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/retry-proxy.py",
  installUrl: "https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/install.py",
  documentationUrl: process.env.NEXT_PUBLIC_DOCUMENTATION_URL || "/docs",
  supportUrl: process.env.NEXT_PUBLIC_SUPPORT_URL || "https://github.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/issues",
  agentrouterUrl: process.env.NEXT_PUBLIC_AGENTROUTER_URL || "https://agentrouter.org",
  statusEndpoint: process.env.NEXT_PUBLIC_STATUS_ENDPOINT || "http://localhost:8787/stats",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Docs", href: "/docs" },
    { label: "FAQ", href: "/faq" },
  ],

  hero: {
    badge: "Built around reliability",
    headline: "Claude Proxy",
    headlineAccent: "for AgentRouter",
    subhead: "Normalizes supported quota or rate-limit failures into HTTP 429 responses with Retry-After, allowing compatible clients to apply their normal retry behavior.",
    primaryCta: "Get Started",
    secondaryCta: "View Docs",
  },

  primaryFeatures: [
    {
      id: "auto-retry",
      title: "Auto Retry",
      description: "Recognizes supported temporary upstream failures and preserves the client’s retry workflow.",
      icon: "RotateCw"
    },
    {
      id: "403-429",
      title: "403 → 429 Normalization",
      description: "Converts recognized quota-style failures into 429 responses with Retry-After.",
      icon: "ShieldAlert",
      image: "/assets/feature-403-429.png"
    },
    {
      id: "local-first",
      title: "Local First",
      description: "Runs locally and keeps proxy configuration under your control.",
      icon: "Home"
    }
  ],

  whyFeatures: [
    {
      id: "auto-retry",
      title: "Auto Retry",
      description: "Converts 403/400/504 rate-limit errors into 429 + Retry-After so Claude Code retries automatically via its watchdog.",
      iconName: "RotateCw",
      mascotInspect: true
    },
    {
      id: "retry-after",
      title: "Retry-After Headers",
      description: "Sets standards-compatible Retry-After headers on converted responses. The client applies its own exponential backoff with jitter.",
      iconName: "Clock"
    },
    {
      id: "403-to-429",
      title: "403 -> 429",
      description: "Detects quota-related 403 responses and converts them to 429. Genuine permission denials stay 403.",
      iconName: "ArrowRightLeft",
      mascotInspect: true
    },
    {
      id: "local-first",
      title: "Local First",
      description: "Runs locally on localhost:8787. Keeps proxy credentials on your machine.",
      iconName: "Lock"
    },
    {
      id: "cli-friendly",
      title: "CLI Friendly",
      description: "Interactive setup: run python retry-proxy.py and configure. Works with Anthropic-compatible clients.",
      iconName: "Terminal"
    },
    {
      id: "safe-defaults",
      title: "Circuit Breaker",
      description: "Permanent errors pass through without conversion, preventing infinite retry loops.",
      iconName: "ShieldCheck"
    }
  ],

  howItWorks: {
    badge: "Reliability layer for your Claude API requests.",
    title: "How the proxy stabilizes your session",
    description: "Claude Proxy sits between Claude Code and AgentRouter. It intercepts error responses, classifies them as retryable or permanent, and converts retryable errors into 429 with Retry-After so Claude Code auto-retries.",
    nodes: [
      { id: 1, name: "Claude Code / Client", subtext: "Your CLI or application sends requests" },
      { id: 2, name: "Claude Proxy", subtext: "Intercepts responses & classifies errors" },
      { id: 3, name: "AgentRouter", subtext: "Routes to best available model/provider" },
      { id: 4, name: "Model Provider", subtext: "Processes request & returns response" }
    ],
    cards: [
      {
        title: "Intercept errors",
        description: "Catches error responses from AgentRouter before they reach Claude Code. Peeks at the first 8KB of SSE streams to detect errors hidden inside 200 responses.",
        codeSnippet: "HTTP/1.1 403 Forbidden\n{\"error\":\"用户额度不足, 剩余额度: $-71\"}"
      },
      {
        title: "Classify retryable failures",
        description: "Reads the response body to determine if the error is a rate limit (retryable) or a permanent failure (not retryable).",
        codeSnippet: "用户额度不足 (quota)     -> retryable ✓\nrate_limit              -> retryable ✓\n无权访问模型 (no model)  -> permanent ✕"
      },
      {
        title: "Convert & stabilize",
        description: "Transforms retryable 403/400/504 errors into 429 with Retry-After. Claude Code's watchdog retries automatically. Permanent errors pass through unchanged.",
        codeSnippet: "HTTP/1.1 429 Too Many Requests\nRetry-After: 20\n\n{\"type\":\"rate_limit_error\"}"
      }
    ],
    lifecycleBefore: [
      { label: "Request", status: "request" },
      { label: "403 Quota Exceeded", status: "error" },
      { label: "Session Breaks", status: "fail" }
    ],
    lifecycleAfter: [
      { label: "Request", status: "request" },
      { label: "Claude Proxy Intercept", status: "proxy" },
      { label: "Convert to 429 + Retry-After (20s)", status: "converted" },
      { label: "Client Retries (watchdog)", status: "retry" },
      { label: "Success", status: "success" }
    ]
  },

  retryLogic: {
    badge: "Built for reliability. Made for builders.",
    title: "Retry Logic",
    subtitle: "Smarter failure handling.",
    description: "Claude Proxy converts recognized quota or rate-limit gateway errors into 429 + Retry-After headers. Claude Code's built-in watchdog then applies exponential backoff with jitter to retry the request.",
    timeline: [
      { step: 1, title: "Timeout", subtitle: "Network", detail: "Connection reset or timeout. Proxy returns 503 retryable." },
      { step: 2, title: "Capacity", subtitle: "529", detail: "Upstream provider saturated. Proxy passes with Retry-After." },
      { step: 3, title: "Server Error", subtitle: "5xx", detail: "502/503/504 gateway errors. Proxy adds Retry-After." },
      { step: 4, title: "Quota Exceeded", subtitle: "403", detail: "AgentRouter quota error. Proxy converts recognized 403 to 429." },
      { step: 5, title: "Session Stays Alive", subtitle: "Recovered", detail: "Claude Code watchdog retries. You keep coding." }
    ],
    rateLimitCard: {
      originalCode: 'HTTP/1.1 403 Forbidden\n\n{"error":"用户额度不足, 剩余额度: $-71"}',
      convertedCode: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 20\n\n{"type":"rate_limit_error"}',
      retryAfter: "20s"
    },
    backoffSteps: [
      { attempt: "Client retries", delay: "Claude Code watchdog applies", seconds: 1 },
      { attempt: "Backoff", delay: "Exponential + jitter", seconds: 2 },
      { attempt: "Up to", delay: "MAX_RETRIES (300 with watchdog)", seconds: 4 },
      { attempt: "Proxy sets", delay: "Retry-After: 20s per conversion", seconds: 8 },
      { attempt: "Result", delay: "Session continues or fails fast", seconds: 16 }
    ],
    retryableItems: [
      "Quota/rate-limit 403 responses (用户额度不足, quota, limit)",
      "HTTP 504 gateway timeouts",
      "HTTP 429 rate limits",
      "HTTP 500/502/503/5xx server errors",
      "HTTP 520-527 Cloudflare errors",
      "Network connection resets and timeouts"
    ],
    nonRetryableItems: [
      "Invalid or missing API keys (HTTP 401)",
      "Model not accessible / no access (无权访问模型)",
      "Malformed JSON requests (HTTP 400 non-rate-limit)",
      "Non-existent model endpoints (HTTP 404)",
      "Genuine permission denials (HTTP 403 permanent)"
    ]
  },

  quickstart: {
    badge: "Get up and running in under 2 minutes.",
    title: "Install in minutes",
    subhead: "Three simple steps to stabilize your Claude Code + AgentRouter sessions.",
    steps: [
      {
        step: 1,
        title: "Download retry-proxy.py",
        tabs: [
          {
            label: "curl",
            language: "bash",
            code: "curl -O https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/retry-proxy.py"
          },
          {
            label: "git",
            language: "bash",
            code: "git clone https://github.com/brainstormersia-cmd/agentrouter-autoretry-claudecode.git\ncd agentrouter-autoretry-claudecode"
          }
        ]
      },
      {
        step: 2,
        title: "Run interactive setup",
        tabs: [
          {
            label: "interactive",
            language: "bash",
            code: "python retry-proxy.py\n# Answer configuration questions\n# Auto-configures ~/.claude/settings.json"
          },
          {
            label: "headless",
            language: "bash",
            code: "python retry-proxy.py --start --upstream https://agentrouter.org\n# Starts immediately on port 8787"
          }
        ]
      },
      {
        step: 3,
        title: "Point Claude Code to the proxy",
        tabs: [
          {
            label: "settings.json",
            language: "json",
            code: '{\n  "env": {\n    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",\n    "ANTHROPIC_API_KEY": "your-agentrouter-key",\n    "CLAUDE_CODE_RETRY_WATCHDOG": "1",\n    "CLAUDE_CODE_MAX_RETRIES": "300"\n  }\n}'
          },
          {
            label: "env vars",
            language: "bash",
            code: "export ANTHROPIC_BASE_URL=http://127.0.0.1:8787\nexport ANTHROPIC_API_KEY=your-agentrouter-key\nexport CLAUDE_CODE_RETRY_WATCHDOG=1\n\nclaude --dangerously-skip-permissions"
          }
        ]
      }
    ],
    reassuranceCards: [
      {
        title: "Runs on localhost",
        description: "Your proxy runs locally on http://127.0.0.1:8787. Nothing leaves your machine except API calls to AgentRouter.",
        icon: "Home"
      },
      {
        title: "No key leaves your machine",
        description: "Claude Proxy forwards whatever Claude Code sends. It never stores API keys.",
        icon: "Shield"
      },
      {
        title: "Works with AgentRouter",
        description: "Injects required headers and handles SSE streams for hidden errors.",
        icon: "Star"
      }
    ]
  },

  compatibility: {
    title: "Compatibility & Integrations",
    subtitle: "Designed primarily for AgentRouter, works with any Anthropic-compatible gateway.",
    agentRouterCard: {
      title: "Designed primarily for AgentRouter",
      highlights: [
        "Injects claude-cli/1.0.0 User-Agent (AgentRouter requires this)",
        "Detects Chinese error messages (用户额度不足, 无权访问模型)",
        "Peeks SSE streams for errors hidden in 200 responses",
        "Filters 'data: null' SSE events that break Anthropic parsers"
      ]
    },
    matrix: [
      {
        component: "Claude Code CLI",
        messagesApi: "supported",
        streaming: "supported",
        toolCalls: "supported",
        authentication: "supported",
        retryBehavior: "supported",
        notes: "Primary target. Uses ANTHROPIC_BASE_URL + CLAUDE_CODE_RETRY_WATCHDOG."
      },
      {
        component: "Anthropic Messages API",
        messagesApi: "supported",
        streaming: "supported",
        toolCalls: "supported",
        authentication: "supported",
        retryBehavior: "supported",
        notes: "Fully compatible with /v1/messages format."
      },
      {
        component: "AgentRouter Gateway",
        messagesApi: "supported",
        streaming: "supported",
        toolCalls: "supported",
        authentication: "supported",
        retryBehavior: "supported",
        notes: "Primary intended upstream. Injects required headers."
      },
      {
        component: "OpenAI-compatible clients",
        messagesApi: "partial",
        streaming: "partial",
        toolCalls: "partial",
        authentication: "partial",
        retryBehavior: "partial",
        notes: "Proxy targets /v1/messages."
      },
      {
        component: "Custom HTTP Clients",
        messagesApi: "supported",
        streaming: "supported",
        toolCalls: "supported",
        authentication: "supported",
        retryBehavior: "supported",
        notes: "Works with cURL, Python requests, Axios, fetch using Anthropic format."
      }
    ]
  },

  faq: [
    {
      id: "why-403-to-429",
      question: "Why convert some 403 responses to 429?",
      answer: "AgentRouter returns 403 for quota limits (e.g. 用户额度不足). Claude Code treats 403 as a permanent error and stops. By converting recognized quota 403s into 429 with Retry-After, Claude Code's watchdog retries automatically. Genuine permission denials stay 403 and are not retried."
    },
    {
      id: "local-privacy",
      question: "Does the proxy keep configuration local?",
      answer: "Yes. The proxy runs entirely on your local loopback (http://127.0.0.1:8787). It forwards whatever Claude Code sends and never stores API keys."
    },
    {
      id: "claude-code-support",
      question: "Does it work with Claude Code?",
      answer: "Yes! Claude Code reads ANTHROPIC_BASE_URL from settings.json. Pointing it to http://127.0.0.1:8787 and enabling CLAUDE_CODE_RETRY_WATCHDOG=1 allows seamless auto-retries."
    },
    {
      id: "which-retried",
      question: "Which failures are retried?",
      answer: "The proxy normalizes: quota/rate-limit 403 responses, HTTP 504 gateway timeouts, HTTP 429 rate limits, HTTP 500/502/503/5xx server errors, HTTP 520-527 Cloudflare errors, and network connection resets/timeouts."
    },
    {
      id: "which-not-retried",
      question: "Which errors are NOT retried?",
      answer: "The circuit breaker prevents retrying invalid API keys (401), model access denials, non-existent models (404), and genuine permission denials."
    },
    {
      id: "latency-impact",
      question: "How much latency does the proxy add?",
      answer: "Under normal operation, the proxy streams responses through with negligible local latency."
    },
    {
      id: "prompt-modification",
      question: "Does it modify prompts or tools?",
      answer: "The proxy strips unsupported parameters from request bodies and forces streaming upstream for better error detection. It never alters your prompt text or messages."
    },
    {
      id: "other-gateways",
      question: "Can it be used with other gateways?",
      answer: "Yes. Use --upstream to point at any Anthropic-compatible gateway. The retry logic works regardless of the upstream gateway."
    }
  ],

  troubleshooting: [
    {
      title: "Connection Refused (ECONNREFUSED)",
      symptom: "Claude Code shows 'Error: connect ECONNREFUSED 127.0.0.1:8787'",
      solution: "The proxy isn't running. Start it first: 'python retry-proxy.py --start'."
    },
    {
      title: "Invalid AgentRouter Key",
      symptom: "HTTP 401 Unauthorized on every request",
      solution: "Check your API key in ~/.claude/settings.json. The proxy forwards it to AgentRouter - if it's wrong, AgentRouter returns 401."
    },
    {
      title: "Still Receiving Hard 403 Errors",
      symptom: "Session terminates with 403 Forbidden",
      solution: "Check proxy logs - this means the error is a genuine permission denial, not a rate limit. Only recognized quota 403s are converted."
    }
  ],

  docs: [
    {
      id: "overview",
      title: "Overview",
      content: "Claude Proxy is a local Python proxy that sits between Claude Code and AgentRouter. It normalizes supported quota or rate-limit failures into HTTP 429 responses with Retry-After, allowing compatible clients to apply their normal retry behavior.",
      codeExamples: [
        {
          language: "bash",
          label: "Quick test",
          code: "python retry-proxy.py --start\n# Then in another terminal:\nclaude --dangerously-skip-permissions"
        }
      ]
    },
    {
      id: "install",
      title: "Installation & Setup",
      content: "Download retry-proxy.py and run it. Pure Python 3.8+ standard library.",
      codeExamples: [
        {
          language: "bash",
          label: "Download & Run",
          code: "curl -O https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/retry-proxy.py\npython retry-proxy.py"
        }
      ]
    },
    {
      id: "configuration",
      title: "Environment Configuration",
      content: "The proxy is configured via ~/.claude/settings.json.",
      codeExamples: [
        {
          language: "json",
          label: "settings.json",
          code: '{\n  "env": {\n    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",\n    "ANTHROPIC_API_KEY": "your-agentrouter-key",\n    "CLAUDE_CODE_RETRY_WATCHDOG": "1",\n    "CLAUDE_CODE_MAX_RETRIES": "300"\n  }\n}'
        }
      ]
    }
  ]
};
