import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      name: username,
      password: password,
    });

    return response;

  } catch (error) {
    console.error("Error logging in:", error.response.data);
    alert("Login failed, please check your username and password");
  }
};
