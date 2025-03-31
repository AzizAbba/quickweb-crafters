
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;  // Added name as optional property
  role: "user" | "admin";
  active?: boolean;
}

export interface UserWithPassword {
  id: string;
  username: string;
  email: string;
  password: string;
  name?: string;  // Added name as optional property
  role: "user" | "admin";
  active?: boolean;
}
