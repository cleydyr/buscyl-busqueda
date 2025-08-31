interface GitHubBannerProps {
  repoUrl: string;
}

export function GitHubBanner({ repoUrl }: GitHubBannerProps) {
  return (
    <div className="github-banner">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        📂 Ver código en GitHub
      </a>
    </div>
  );
}