import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const [isChecking, setIschecking] = useState(true);
  const cookie = document.cookie;
  const navigate = useNavigate();

  const verifyAuth = (cookie: string) => {
    const cookies = cookie.split("; ");
    const userCookie = cookies.find((e) => e.startsWith("user="));

    if (userCookie) {
      navigate("/", { replace: true });
      return;
    }
    setIschecking(false);
  };

  useEffect(() => {
    verifyAuth(cookie);
  }, []);
  if (isChecking)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#161410]"></div>
    );

  return <>{children}</>;
};

export default PublicRoutes;
