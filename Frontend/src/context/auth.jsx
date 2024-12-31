/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchLoggedinUserDetails = async () => {
    const { data } = await axios.get("/api/v1/users/profile",{
      withCredentials:true
    });
    setUser(data);
  };

  useEffect(() => {
    fetchLoggedinUserDetails();
  }, []);

  return <authContext.Provider value={{user}}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
