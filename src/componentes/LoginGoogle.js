// src/componentes/LoginGoogle.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

export default function LoginGoogle({ onLoginSuccess }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("http://localhost:4000/api/usuarios/login/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        onLoginSuccess(data.usuario);
      } else {
        alert("Error: " + (data.error || "No se pudo iniciar sesión"));
      }
    } catch (error) {
      console.error("Error con Google:", error);
      alert("No se pudo iniciar sesión con Google. Intenta de nuevo.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontWeight: "bold",
        marginTop: "16px",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        style={{ width: "20px", height: "20px" }}
      />
      Iniciar sesión con Google
    </button>
  );
}