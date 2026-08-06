'use client';

import React from 'react';
import { PixelImage } from './PixelImage';

// Real Pixel Art Image Components from uploaded asset files

export const PixelIconRefresh: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <PixelImage src="/assets/pixel-refresh.png" alt="Auto Retry" width={size} height={size} className={className} />
);

export const PixelIconHouseHeart: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <PixelImage src="/assets/pixel-home-heart.png" alt="Local First" width={size} height={size} className={className} />
);

export const PixelIconShieldHeart: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <PixelImage src="/assets/pixel-shield-heart.png" alt="Safe Defaults" width={size} height={size} className={className} />
);

export const PixelIcon403To429: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <PixelImage src="/assets/pixel-403-429-badge.png" alt="403 to 429" width={size} height={size} className={className} />
);

export const PixelIconTerminal: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-terminal.png" alt="Terminal" width={size} height={size} className={className} />
);

export const PixelIconAiFont: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-ai.png" alt="AI Provider" width={size} height={size} className={className} />
);

export const PixelIconNetworkNode: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-connection.png" alt="Network Connection" width={size} height={size} className={className} />
);

export const PixelIconRouter: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-icon-router.png" alt="Router" width={size} height={size} className={className} />
);

export const PixelIconKeyCross: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-icon-key-cross.png" alt="Invalid Key" width={size} height={size} className={className} />
);

export const PixelIcon403Warning: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-icon-403-warning.png" alt="403 Warning" width={size} height={size} className={className} />
);

export const PixelIconClock: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-icon-clock.png" alt="Clock" width={size} height={size} className={className} />
);

export const PixelIconFaqBubble: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <PixelImage src="/assets/pixel-icon-faq-bubble.png" alt="FAQ" width={size} height={size} className={className} />
);

// Pixel Art Pill Badges (Claude Code, Anthropic API, OpenAI Compatible, AgentRouter)
export const PixelBadgeClaudeCode: React.FC<{ className?: string }> = ({ className = '' }) => (
  <PixelImage src="/assets/badge-claude-code.png" alt="Claude Code" width={140} height={32} className={className} />
);

export const PixelBadgeAnthropicApi: React.FC<{ className?: string }> = ({ className = '' }) => (
  <PixelImage src="/assets/badge-anthropic-api.png" alt="Anthropic API" width={140} height={32} className={className} />
);

export const PixelBadgeOpenAiCompatible: React.FC<{ className?: string }> = ({ className = '' }) => (
  <PixelImage src="/assets/badge-openai-compatible.png" alt="OpenAI Compatible" width={160} height={32} className={className} />
);

export const PixelBadgeAgentRouter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <PixelImage src="/assets/badge-agentrouter.png" alt="AgentRouter" width={140} height={32} className={className} />
);
