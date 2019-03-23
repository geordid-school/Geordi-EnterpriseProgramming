import { Commit } from "./commit";
import { Issue } from "./issue";
import { User } from "./user";

export class Repo {

  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  subscribers_count: number;
  forks: number;
  open_issues: number;
  language: string;
  clone_url: string;
  commits_url: string;
  issues_url: string;
  owner: User;
  commits: Commit[];
  issues: Issue[];

}
