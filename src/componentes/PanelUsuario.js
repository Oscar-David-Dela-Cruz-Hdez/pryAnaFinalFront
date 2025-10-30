// src/componentes/PanelUsuario.js
import React from "react";

export default function PanelUsuario({ usuario, onLogout }) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>✅ Inicio de sesión exitoso</h2>
      <p>Bienvenido, <strong>{usuario.nombre} {usuario.ap}</strong></p>
      <p>Email: {usuario.email}</p>
      <button
        onClick={onLogout}
        style={{
          marginTop: "24px",
          padding: "10px 20px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Salir
      </button>
    </div>
  );
}