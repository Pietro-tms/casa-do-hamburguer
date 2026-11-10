import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { userContextType, UserInterface } from "../types/User";
import { getMe, logoutRequest } from "../services/auth.service";

export const UserContext = createContext<userContextType>({
  user: null,
  isChecking: true,
  refreshUser: async () => null,
  logout: async () => {},
  authError: null,
  initializeAuth: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const authRequestId = useRef(0);

  const refreshUser = useCallback(
    (signal?: AbortSignal): Promise<UserInterface | null> => {
      const requestId = ++authRequestId.current;
      const isCurrentRequest = () =>
        !signal?.aborted && requestId === authRequestId.current;

      return getMe(signal)
        .then(async (res) => {
          if (!res.ok && res.status !== 401) {
            throw new Error("Não foi possível verificar a sessão");
          }

          const currentUser =
            res.status === 401 ? null : ((await res.json()) as UserInterface);

          if (!isCurrentRequest()) return null;

          setUser(currentUser);
          setAuthError(null);
          return currentUser;
        })
        .catch(() => {
          if (isCurrentRequest()) {
            setAuthError("Não foi possível verificar a sessão");
          }
          return null;
        })
        .finally(() => {
          if (isCurrentRequest()) setIsChecking(false);
        });
    },
    [],
  );

  const initializeAuth = useCallback(async () => {
    setIsChecking(true);
    setAuthError(null);

    await refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    const res = await logoutRequest();

    // Uma sessão expirada já está encerrada no servidor.
    if (!res.ok && res.status !== 401) {
      throw new Error("Não foi possível sair. Tente novamente.");
    }

    // Impede que uma consulta anterior a /me restaure o usuário após sair.
    authRequestId.current += 1;
    setUser(null);
    setAuthError(null);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refreshUser(controller.signal);
    return () => controller.abort();
  }, [refreshUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        isChecking,
        refreshUser,
        logout,
        authError,
        initializeAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
