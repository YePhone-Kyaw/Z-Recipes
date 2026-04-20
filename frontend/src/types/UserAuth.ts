type User = {
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type AuthState = {
  user: User | null;
};

export type { User, AuthContextType, AuthState }
