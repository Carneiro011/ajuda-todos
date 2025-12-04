// src/services/auth.ts
export interface LoginResponse {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
  token: string;
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas ou erro no servidor');
  }

  const data = await response.json();
  return data as LoginResponse;
}
