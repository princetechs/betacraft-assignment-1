// src/services/auth.ts
export interface User {
  email: string;
  name: string;
}

export const authenticateWithGoogle = async (token: string): Promise<User> => {
  try {
    const res = await fetch('http://localhost:3000/users/google_oauth2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const userData: User = await res.json();
    return userData;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};