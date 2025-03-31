
export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  active?: boolean;
}

export interface UserWithPassword {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  active?: boolean;
}
