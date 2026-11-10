export const registerRequest = async (
  name: string,
  email: string,
  password: string,
  cep: string,
) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, cep }),
  });
  return response;
};

export const loginRequest = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return response;
};

export const getMe = async (signal?: AbortSignal) => {
  const response = await fetch("http://localhost:3000/me", {
    credentials: "include",
    signal,
  });
  return response;
};

export const logoutRequest = async () => {
  const response = await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
  return response;
};
