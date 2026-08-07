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

  guides: Array<{
    id: string;
    client: string;
    icon: string;
    description: string;
    steps: string[];
    config: string;
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
    { label: "Guides", href: "/guides" },
    { label: "Compatibility", href: "/compatibility" },
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
      description: "Converts 403/400/504 rate-limit errors into 429 + Retry-After so the client retries automatically via its watchdog.",
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
      description: "Detects quota-related 403 responses (including Chinese error messages like 用户额度不足) and converts them to 429. Genuine permission denials stay 403.",
      iconName: "ArrowRightLeft",
      mascotInspect: true
    },
    {
      id: "header-injection",
      title: "Header Injection",
      description: "Injects the claude-cli/1.0.0 User-Agent that AgentRouter requires. Without it, AgentRouter rejects non-Claude-Code clients with 401 unauthorized.",
      iconName: "Terminal"
    },
    {
      id: "peek-stream",
      title: "Stream Inspection",
      description: "Peeks at the first SSE events to detect errors hidden inside HTTP 200 responses. Catches 'empty or malformed response' crashes before they reach the client.",
      iconName: "ShieldCheck"
    },
    {
      id: "malformed-fix",
      title: "Malformed Response Fix",
      description: "Detects empty bodies, HTML error pages, and JSON error payloads disguised as 200. Converts them to retryable 503 so the client retries instead of crashing.",
      iconName: "ShieldAlert"
    },
    {
      id: "stream-folding",
      title: "Response Folding",
      description: "When a client requests non-streaming (stream:false), the proxy folds the forced SSE stream back into a single JSON object matching the expected format.",
      iconName: "RefreshCw"
    },
    {
      id: "data-null-filter",
      title: "data:null Filtering",
      description: "Removes 'data: null' SSE events that break Anthropic parsers and cause silent failures in long sessions.",
      iconName: "Shield"
    },
    {
      id: "local-first",
      title: "Local First",
      description: "Runs locally on localhost:8787. Pure Python 3.8+ standard library, zero dependencies. Your API keys never leave your machine.",
      iconName: "Lock"
    },
    {
      id: "safe-defaults",
      title: "Circuit Breaker",
      description: "Permanent errors (invalid key, model not found, permission denied) pass through without conversion, preventing infinite retry loops.",
      iconName: "ShieldCheck"
    }
  ],

  howItWorks: {
    badge: "Reliability layer for your Claude API requests.",
    title: "How the proxy stabilizes your session",
    description: "ClaudeShield sits between your client and AgentRouter. It injects required headers, inspects SSE streams for hidden errors, folds non-streaming responses, and converts retryable failures into 429 with Retry-After so the client auto-retries.",
    nodes: [
      { id: 1, name: "Claude Code / Client", subtext: "Your CLI or application sends requests" },
      { id: 2, name: "ClaudeShield", subtext: "Injects headers, inspects streams, classifies errors" },
      { id: 3, name: "AgentRouter", subtext: "Routes to best available model/provider" },
      { id: 4, name: "Model Provider", subtext: "Processes request & returns response" }
    ],
    cards: [
      {
        title: "Inject & forward",
        description: "Injects the claude-cli/1.0.0 User-Agent that AgentRouter requires. Strips unsupported parameters (temperature, top_p). Forces streaming upstream for better error detection. Forwards all auth headers as-is.",
        codeSnippet: "User-Agent: claude-cli/1.0.0 (external, cli)\nAuthorization: Bearer <your-key>\nanthropic-version: 2023-06-01"
      },
      {
        title: "Inspect & classify",
        description: "Peeks at the first complete SSE events to detect errors hidden inside HTTP 200. Parses data: lines as JSON to avoid false positives. Detects Chinese quota errors (用户额度不足). Filters data:null events that break parsers.",
        codeSnippet: "用户额度不足 (quota)     -> retryable\nrate_limit              -> retryable\n无权访问模型 (no model)  -> permanent\n\"error\": null           -> legitimate (ignored)"
      },
      {
        title: "Convert & fold",
        description: "Transforms retryable 403/400/504 errors into 429 with Retry-After. Folds forced SSE streams back into single JSON for non-streaming clients. Permanent errors pass through unchanged (circuit breaker).",
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
    },
    {
      id: "claude-desktop",
      question: "Does it work with Claude Desktop?",
      answer: "Yes. Enable Developer Mode in Claude Desktop (Help → Troubleshooting → Enable Developer Mode), then configure the gateway: base URL http://127.0.0.1:8787, your AgentRouter API key, auth scheme 'bearer'. Apply and restart. The proxy injects the required claude-cli User-Agent automatically."
    },
    {
      id: "opencode-support",
      question: "Does it work with OpenCode?",
      answer: "Yes. OpenCode speaks both Anthropic Messages API and OpenAI-compatible format. Point your provider baseURL to http://127.0.0.1:8787 (Anthropic) or http://127.0.0.1:8787/v1 (OpenAI-compatible). Both work - tested live with 200 responses."
    },
    {
      id: "cline-roo-support",
      question: "Does it work with Cline or Roo Code?",
      answer: "Yes. Both are VS Code extensions that support custom Anthropic-compatible endpoints. Set the API provider to 'Anthropic' and the base URL to http://127.0.0.1:8787. The proxy handles auth injection and retries transparently."
    },
    {
      id: "codex-support",
      question: "Does it work with Codex CLI?",
      answer: "Yes. Codex uses the OpenAI Chat Completions format (/v1/chat/completions), which AgentRouter accepts. Set OPENAI_BASE_URL to http://127.0.0.1:8787/v1 and OPENAI_API_KEY to your AgentRouter key. The proxy forwards requests as-is and applies the same retry logic."
    },
    {
      id: "other-clients",
      question: "Does it work with other AI coding agents?",
      answer: "Any client that speaks the Anthropic Messages API (/v1/messages) or OpenAI Chat Completions (/v1/chat/completions) works. Point the client's base URL to http://127.0.0.1:8787. The proxy forwards requests as-is to AgentRouter."
    },
    {
      id: "stream-false",
      question: "What happens with non-streaming requests?",
      answer: "The proxy forces streaming upstream for better error detection, then folds the SSE response back into a single JSON object matching the format the client expects (Anthropic message or OpenAI chat.completion). This prevents 'empty or malformed response' errors."
    },
    {
      id: "update-proxy",
      question: "How do I update to the latest version?",
      answer: "Run 'python retry-proxy.py --update'. It downloads the latest version from GitHub, backs up the current file to retry-proxy.py.bak, and replaces itself. Then restart the proxy with --start."
    },
    {
      id: "stats-endpoint",
      question: "Can I monitor the proxy?",
      answer: "Yes. The proxy exposes GET /stats (JSON telemetry: version, uptime, request count, conversions, errors, retry rate) and GET /health (simple health check). Use these for monitoring dashboards or the status page."
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

  guides: [
    {
      id: "claude-code",
      client: "Claude Code",
      icon: "/assets/badge-claude-code.png",
      description: "The primary target. Point Claude Code at the proxy via settings.json.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "Edit ~/.claude/settings.json and set ANTHROPIC_BASE_URL to http://127.0.0.1:8787",
        "Set CLAUDE_CODE_RETRY_WATCHDOG=1 and CLAUDE_CODE_MAX_RETRIES=300 for infinite retries",
        "Launch: claude --dangerously-skip-permissions"
      ],
      config: `{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",
    "ANTHROPIC_API_KEY": "your-agentrouter-key",
    "CLAUDE_CODE_RETRY_WATCHDOG": "1",
    "CLAUDE_CODE_MAX_RETRIES": "300"
  }
}`
    },
    {
      id: "claude-desktop",
      client: "Claude Desktop",
      icon: "/assets/badge-anthropic-api.png",
      description: "Use Claude Desktop with AgentRouter via the developer-mode gateway.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "In Claude Desktop: Help → Troubleshooting → Enable Developer Mode",
        "Configure gateway: base URL http://127.0.0.1:8787, your AgentRouter key, auth scheme 'bearer'",
        "Apply and restart Claude Desktop"
      ],
      config: `Gateway Base URL: http://127.0.0.1:8787
Gateway API Key: your-agentrouter-key
Auth Scheme: bearer`
    },
    {
      id: "opencode",
      client: "OpenCode",
      icon: "/assets/pixel-terminal.png",
      description: "Terminal AI agent by SST. Works with both Anthropic and OpenAI-compatible formats.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "Edit ~/.config/opencode/opencode.json (or opencode.jsonc)",
        "Add a provider with baseURL http://127.0.0.1:8787 (Anthropic) or /v1 (OpenAI-compatible)",
        "Launch: opencode"
      ],
      config: `{
  "provider": {
    "claudeshield": {
      "name": "ClaudeShield (AgentRouter)",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://127.0.0.1:8787/v1",
        "apiKey": "your-agentrouter-key"
      },
      "models": {
        "claude-opus-5": { "name": "Claude Opus 5" }
      }
    }
  }
}`
    },
    {
      id: "cline",
      client: "Cline",
      icon: "/assets/pixel-terminal.png",
      description: "VS Code extension. Supports custom Anthropic-compatible endpoints.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "In Cline settings: API Provider → Anthropic",
        "Set Base URL to http://127.0.0.1:8787",
        "Enter your AgentRouter API key"
      ],
      config: `API Provider: Anthropic
Base URL: http://127.0.0.1:8787
API Key: your-agentrouter-key`
    },
    {
      id: "roo-code",
      client: "Roo Code",
      icon: "/assets/pixel-terminal.png",
      description: "VS Code extension (fork of Cline). Same configuration approach.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "In Roo Code settings: API Provider → Anthropic",
        "Set Base URL to http://127.0.0.1:8787",
        "Enter your AgentRouter API key"
      ],
      config: `API Provider: Anthropic
Base URL: http://127.0.0.1:8787
API Key: your-agentrouter-key`
    },
    {
      id: "curl",
      client: "cURL / HTTP",
      icon: "/assets/pixel-terminal.png",
      description: "Any HTTP client. Test the proxy directly with a single request.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "Send a request to http://127.0.0.1:8787/v1/messages",
        "The proxy forwards to AgentRouter with the required headers"
      ],
      config: `curl http://127.0.0.1:8787/v1/messages \\
  -H "x-api-key: your-agentrouter-key" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{"model":"claude-opus-5","max_tokens":64,
       "messages":[{"role":"user","content":"Hello"}]}'`
    },
    {
      id: "codex",
      client: "Codex CLI",
      icon: "/assets/pixel-terminal.png",
      description: "OpenAI's coding agent. Uses the OpenAI Chat Completions format, which AgentRouter accepts.",
      steps: [
        "Start the proxy: python retry-proxy.py --start --upstream https://agentrouter.org",
        "Set OPENAI_BASE_URL to http://127.0.0.1:8787/v1",
        "Set OPENAI_API_KEY to your AgentRouter key",
        "Launch: codex"
      ],
      config: `# Terminal (macOS / Linux)
export OPENAI_BASE_URL=http://127.0.0.1:8787/v1
export OPENAI_API_KEY=your-agentrouter-key

# PowerShell (Windows)
$env:OPENAI_BASE_URL="http://127.0.0.1:8787/v1"
$env:OPENAI_API_KEY="your-agentrouter-key"

# Launch
codex`
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
