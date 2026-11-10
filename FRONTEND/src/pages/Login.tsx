import { useState, useContext } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import Error from "../components/Error";
import { loginRequest } from "../services/auth.service";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string; path: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError([]);

    if (!email || !password) {
      setError([{ message: "Preencha todos os campos", path: "" }]);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginRequest(email, password);

      if (res.ok) {
        const currentUser = await refreshUser();
        if (!currentUser) {
          setError([
            {
              message: "Não foi possível confirmar a sessão. Tente novamente.",
              path: "",
            },
          ]);
          return;
        }

        navigate("/", { replace: true });
        return;
      }

      const errorData = await res.json();
      switch (res.status) {
        case 400:
          setError(errorData.errors);
          break;
        case 404:
        case 401:
          setError([{ message: errorData.message, path: "" }]);
          break;
        default:
          setError([
            {
              message: "Ocorreu um erro. Tente novamente mais tarde",
              path: "",
            },
          ]);
      }
    } catch {
      setError([
        { message: "Ocorreu um erro. Tente novamente mais tarde", path: "" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary flex h-screen w-screen flex-col items-center justify-center">
      <form
        className="bg-primary flex flex-col items-center justify-center gap-6"
        onSubmit={handleSubmit}
      >
        <Link to={"/"}>
          <img
            src="/logo-paleta.png"
            alt="Logo lanchonete"
            width="100"
            height="86"
          />
        </Link>
        <section className="flex w-full flex-col gap-1.5">
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>
          {error.filter((err) => err.path === "email").length > 0 && (
            <Error error={error.find((err) => err.path === "email")?.message} />
          )}
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Input>
          {error.filter((err) => err.path === "password").length > 0 && (
            <Error
              error={error.find((err) => err.path === "password")?.message}
            />
          )}
          {error.filter((err) => err.path === "").length > 0 && (
            <Error error={error.find((err) => err.path === "")?.message} />
          )}
        </section>
        <section className="flex w-full flex-col gap-1.5">
          <Button
            title={isSubmitting ? "Entrando..." : "Login"}
            type="submit"
            disabled={isSubmitting}
          />
          <Link to={"/register"}>
            <Button
              title="Não tenho uma conta"
              variant="outline"
              type="button"
            />
          </Link>
        </section>
      </form>
    </div>
  );
};

export default Login;
