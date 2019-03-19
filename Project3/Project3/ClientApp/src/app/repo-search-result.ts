import { Repo } from "./repo";

export class RepoSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}
