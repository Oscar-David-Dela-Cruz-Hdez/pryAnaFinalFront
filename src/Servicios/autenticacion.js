// Define la URL base de tu API (Backend en puerto 4000 + prefijo de rutas)
const BASE_URL = "http://localhost:4000/api/usuarios";

export async function registrarUsuario(payload) {
  // La ruta aquí es solo "/register" porque el prefijo ya está en BASE_URL
  const r = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "No se pudo registrar"); // Cambiado a data.error
  return data;
}
// servicios/autenticacion.js

// ... tus funciones existentes ...

export async function loginUsuario(payload) {
  const r = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Credenciales inválidas");
  return data;
}

export async function verificarLogin2FA({ tempToken, codigo }) {
  const r = await fetch(`${BASE_URL}/login/2fa/verificar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tempToken, codigo }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Código inválido");
  return data;
}
export async function verificarRegistro2FA({ tempToken, codigo }) {
  // Ruta completa: http://localhost:4000/api/usuarios/register/2fa/verificar
  const r = await fetch(`${BASE_URL}/register/2fa/verificar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tempToken, codigo }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Código inválido o expirado"); // Cambiado a data.error
  return data;
}

export async function reenviarRegistro2FA({ tempToken }) {
  // Ruta completa: http://localhost:4000/api/usuarios/register/2fa/reenviar
  const r = await fetch(`${BASE_URL}/register/2fa/reenviar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tempToken }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "No se pudo reenviar"); // Cambiado a data.error
  return data;
}