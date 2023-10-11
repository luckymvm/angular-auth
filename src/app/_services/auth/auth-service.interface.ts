export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp {
  email: string;
  username: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';
