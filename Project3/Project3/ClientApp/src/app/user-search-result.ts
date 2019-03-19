import { User } from "./user";

export class UserSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
