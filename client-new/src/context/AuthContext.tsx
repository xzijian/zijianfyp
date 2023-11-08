"use client";

import { createContext, useReducer, useEffect } from "react";

export declare interface UserInterface {
  course: string;
  email: string;
  names: string;
  token: string;
  year: string;
}

export declare interface AuthContextInterface {
  user: UserInterface;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const authReducer = (
  state: any,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
