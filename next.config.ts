import type { NextConfig } from "next";

// GitHub Pages serves from /claudeshield/ subpath
// For custom domain or root deployment, remove basePath and assetPrefix
const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.DEPLOY_TARGET === "github-pages";
const repoName = "claudeshield";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
