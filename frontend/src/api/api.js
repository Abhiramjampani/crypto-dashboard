import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const URL = "http://localhost:8000";

export const AuthenticateSignin = async (data) => {
  try {
    const response = await axios.post(`${URL}/user/login`, data);
    toast.success("Login Successful");
    sessionStorage.setItem("jwt", response.data.token);
    return response;
  } catch (error) {
    console.log("Error While Login");
    console.log(error);
    toast.error("Login Failed");
  }
};

export const AuthenticateSignup = async (data) => {
  try {
    const response = await axios.post(`${URL}/user/signup`, data);
    toast.success("Signup Successful");
    console.log(response)
    return response;
  } catch (error) {
    console.log("Error While Signup");
    console.log(error);
    toast.error("Signup Failed");
  }
};
