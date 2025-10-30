// src/App.js
import React, { useState, useEffect } from "react";
import RegistroFormulario from "./ForRegistro/Registroformulario";
import LoginFormulario from "./componentes/LoginFormulario";
import LoginGoogle from "./componentes/LoginGoogle";
import PanelUsuario from "./componentes/PanelUsuario";
import "./Style/formulario.css";

function App() {
  const [vista, setVista] = useState("registro"); // "registro", "login", "panel"
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  // Verificar si hay token al cargar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Aquí podrías validar el token con el backend
      // Por simplicidad, asumimos que es válido
      setVista("panel");
    }
  }, []);

  const manejarLoginExitoso = (usuario) => {
    setUsuarioLogueado(usuario);
    setVista("panel");
  };

  const manejarLogout = () => {
    localStorage.removeItem("authToken");
    setUsuarioLogueado(null);
    setVista("login");
  };

  if (vista === "panel" && usuarioLogueado) {
    return <PanelUsuario usuario={usuarioLogueado} onLogout={manejarLogout} />;
  }

  return (
    <div className="fondo-gradiente">
      <div className="contenedor-formulario">
        <div className="encabezado">
          <h1 className="titulo">
            {vista === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p className="subtitulo">
            {vista === "login"
              ? "Accede a tu cuenta"
              : "Regístrate para continuar"}
          </p>
        </div>

        {vista === "login" ? (
          <>
            <LoginFormulario onLoginExitoso={manejarLoginExitoso} />
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <LoginGoogle onLoginSuccess={manejarLoginExitoso} />
            </div>
            <p style={{ textAlign: "center" }}>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setVista("registro")}
                style={{ background: "none", border: "none", color: "#9580ff", cursor: "pointer" }}
              >
                Regístrate aquí
              </button>
            </p>
          </>
        ) : (
          <>
            <RegistroFormulario alEnviar={async (datos) => {
              const res = await fetch("http://localhost:4000/api/usuarios/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Error al registrar");
              return data;
            }} />
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setVista("login")}
                style={{ background: "none", border: "none", color: "#9580ff", cursor: "pointer" }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;