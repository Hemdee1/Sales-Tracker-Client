import { createContext, useContext, useEffect, useState } from "react";
import { useGlobalAuthContext } from "./authContext";

const appContext = createContext();

const AppProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState();
  const { user } = useGlobalAuthContext();

  useEffect(() => {
    const fetchSales = async () => {
      const response = await fetch("http://localhost:5000/sale/api", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setSales(data);
      }
    };

    if (user) {
      fetchSales();
    }
  }, [user]);

  console.log(sales);

  const addSale = async (formData) => {
    // return if there is no user logged in
    if (!user) return;

    const response = await fetch("http://localhost:5000/sale/api", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      setSales((prev) => [data, ...prev]);
      setError([]);
    } else {
      setError(data.data);
    }
  };

  const deleteSale = async (id) => {
    // return if there is no user logged in
    if (!user) return;

    const response = await fetch("http://localhost:5000/sale/api/" + id, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      setSales(sales.filter((sale) => sale._id !== id));
    }
  };

  return (
    <appContext.Provider
      value={{ sales, error, setSales, addSale, deleteSale }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(appContext);
};

export default AppProvider;
