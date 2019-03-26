import { Repo } from "./repo";

export class User {

  login: string;
  avatar_url: string;
  name: string;
  blog: string;
  location: string;
  html_url: string;
  repos_url: string;
  repos: Repo[];
  followers_url: string;
  followers: User[];

}
