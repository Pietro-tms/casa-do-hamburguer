import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const { isChecking, user, authError, initializeAuth } = useContext(UserContext);

  if (isChecking)
    return (
      <div className="bg-primary flex h-screen w-screen flex-col items-center justify-center"></div>
    );

  if (authError) {
    return (
      <div>
        <p>{authError}</p>
        <button onClick={() => void initializeAuth()}>Tentar novamente</button>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoutes;
