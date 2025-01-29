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

export const signupService = async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/signup", user);

    return response;
  } catch (error) {
    console.error("Error signing up:", error.response.data);
    alert("Signup failed, please check your information");
  }
};
