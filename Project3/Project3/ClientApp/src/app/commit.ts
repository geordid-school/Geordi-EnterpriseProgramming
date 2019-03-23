import { User } from "./user";

export class Commit {

  author: User;
  html_url: string;
  message: string;
  comment_count: number;

  fromJson(json: any): Commit {
    const commit = new Commit();

    commit.author = json.commit.author.name;
    commit.html_url = json.html_url;
    commit.message = json.commit.message;
    commit.comment_count = json.commit.comment_count;

    return commit;
  }
}

