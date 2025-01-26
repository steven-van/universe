import axios from "axios";

export const loginService = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    });

    return response;

  } catch (error) {
    console.error("Error logging in:", error.response.data);
    alert("Login failed, please check your email and password");
  }
};
