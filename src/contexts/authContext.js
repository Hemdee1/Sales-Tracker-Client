import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const saveUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(saveUser);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setUser(data);
      setError(null);

      // save to local storage
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const logIn = async (email, password) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setUser(data);
      setError(null);

      // save to local storage
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const logOut = () => {
    setUser(null);
    // setSales([]);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{ signIn, logOut, logIn, user, error, setError }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AppContext);
};

export default AuthProvider;
