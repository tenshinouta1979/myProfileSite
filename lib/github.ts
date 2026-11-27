export type GithubActivity = {
  days: Array<{ date: string; level: number } | null> | null;
  languages: Array<{ name: string; repos: number }> | null;
};
