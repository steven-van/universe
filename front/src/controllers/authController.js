import { login } from "../services/authService";

export const handleLogin = async (username, password, navigate) => {
  try {
    const response = await login(username, password);

    // Récupère le token JWT (A faire quand on voudra utiliser le système de token pour sécurirer lappli)
    const { token } = response.data;
    // Stocke le token dans le localStorage, ce qui permet de le récup après
    localStorage.setItem("token", token);
    // localStorage.setItem('username', username); // Méthode de charlatan, cest pas propre mais ca suffit pour un premier jet
    // Et la on redirige
    navigate("/home");
  } catch (error) {
    console.error("Error logging in:", error.response.data);
    alert("Login failed, please check your username and password");
  }
};
