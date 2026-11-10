export interface UserInterface {
  id: string;
  name: string;
  email: string;
  cep: string;
  adm: boolean;
}

export type userContextType = {
  user: UserInterface | null; // null = não há usuário logado
  isChecking: boolean; // true = ainda estamos consultando /me
  authError: string | null; // null = não há erro de autenticação
  refreshUser: () => Promise<UserInterface | null>;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
};
