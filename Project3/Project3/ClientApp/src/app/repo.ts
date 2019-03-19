import { Commit } from "./commit";
import { Issue } from "./issue";

export class Repo {

  name: string;
  pageUrl: string;
  description: string;
  numStars: number;
  numWatchers: number;
  numForks: number;
  numIssues: number;
  language: string;
  cloneUrl: string;
  recentCommits: Commit[];
  issues: Issue[];

}
