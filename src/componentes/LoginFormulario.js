// src/componentes/LoginFormulario.js
import React, { useState } from "react";
import CampoTexto from "../ForRegistro/CampoTexto";
import CampoContrasena from "../ForRegistro/Campocontrasena";
import FormularioCodigo2FA from "../ForRegistro/FormularioCodigo2FA";
import { loginUsuario, verificarLogin2FA } from "../Servicios/autenticacion";

export default function LoginFormulario({ onLoginExitoso }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estado para 2FA
  const [otpActivo, setOtpActivo] = useState(false);
  const [otpTempToken, setOtpTempToken] = useState("");
  const [otpDestino, setOtpDestino] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await loginUsuario({ email, password });

      if (res.requires2fa) {
        setOtpActivo(true);
        setOtpTempToken(res.tempToken);
        setOtpDestino(res.destino);
      } else {
        localStorage.setItem("authToken", res.token);
        onLoginExitoso(res.usuario);
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  const manejarVerificar2FA = async (codigo) => {
    try {
      const res = await verificarLogin2FA({ tempToken: otpTempToken, codigo });
      localStorage.setItem("authToken", res.token);
      onLoginExitoso(res.usuario);
    } catch (err) {
      alert("Error: " + (err.message || "Código inválido"));
    }
  };

  if (otpActivo) {
    return (
      <FormularioCodigo2FA
        tempToken={otpTempToken}
        destino={otpDestino}
        onExito={() => {}}
        onVolver={() => setOtpActivo(false)}
      />
    );
  }

  return (
    <form onSubmit={manejarLogin} style={{ width: "100%" }}>
      {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}

      <CampoTexto
        etiqueta="Correo electrónico"
        nombre="email"
        tipo="email"
        valor={email}
        onCambio={(e) => setEmail(e.target.value)}
        placeholder="tucorreo@dominio.com"
      />

      <CampoContrasena
        etiqueta="Contraseña"
        nombre="password"
        valor={password}
        onCambio={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <button
        type="submit"
        disabled={cargando}
        className="boton-principal"
        style={{ marginTop: "24px", width: "100%" }}
      >
        {cargando ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}