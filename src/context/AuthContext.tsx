"use client"
import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { IUser } from "@/lib/types";
import Swal from "sweetalert2";

interface IAuth {
  user: IUser | null;
  signUp: (data: IdataUser) => Promise<{ success: boolean; error: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string }>;
  logout: () => void
}

interface IdataUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthContext = createContext({} as IAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  // Load user from cookie
  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Sign up method
  const signUp = async (data: IdataUser) => {
    try {
      const response = await axios.post("http://alisab.ir/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: "",
        city: "",
        address: "",
      });

      if (response.status === 200) {
        const userData = response.data.user;
        const token = response.data.token;

        setUser(userData);

        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });

        router.push("/");
        toast.success(`Welcome " ${userData.name} " . You are logged in.`, {
          autoClose: 5000,
          style: {
            width: 'auto',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            paddingRight: "50px"
          },
        });
      }

      return { success: true, error: "" };

    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return {
          success: false,
          error: error.response.data,
        };
      }
      console.error("System error:", error.message);
      return { success: false, error: "" };
    }
  };



  // login method
  const login = async (email: string, password: string) => {
    try {

      const response = await axios.post("http://alisab.ir/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const userData = response.data.user;
        const token = response.data.token;

        setUser(userData);

        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });

        router.push("/");
        toast.success(`Welcome " ${userData.name} " . You are logged in.`, {
          autoClose: 5000,
          style: {
            width: 'auto',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            paddingRight: "50px"
          },
        });
      }
      return { success: true, error: "" };

      

    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        return {
          success: false,
          error: error.response.data,
        };
      }
      if (error.response.status === 401) {
        return {
          success: false,
          error: { general: "The email or password is incorrect..." },  
        };
      }
      console.error("System error is :", error.message);
      return { success: false, error: "" };
    }
  }


  // Lohout method
  const logout = () => {

    Swal.fire({
      title: "Do you want to log out of your account?",
      icon: "info",
      showCancelButton: true,
      cancelButtonColor: "#cdcdcd",
      confirmButtonColor: "#e73333",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null)
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/");
        toast.success(`You have logged out of your account .`, {
          autoClose: 5000,
          style: {
            width: 'auto',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            paddingRight: "50px"
          },
        });
      }
    });



  }

  return (
    <AuthContext.Provider value={{ user, signUp, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
