import { createContext, useReducer, type ReactNode } from "react";

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

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  //action = {type, payload}
  const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  const login = (user: User) => dispatch({ type: "LOGIN", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
