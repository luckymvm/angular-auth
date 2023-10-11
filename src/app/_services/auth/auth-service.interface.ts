export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp {
  email: string;
  username: string;
  password: string;
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';
