import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import Error from "../components/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState([{ message: "", path: "" }]);
  

  const navigate = useNavigate();

  const handleSumit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError([{ message: "", path: "" }]);
    try {
      if (!email || !password) {
        setError([{ message: "Preencha todos os campos", path: "" }]);
        return;
      }

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const errorData = await res.json();

      switch (res.status) {
        case 400:
          for (const error of errorData.errors) {
            setError((prev) => [
              ...prev,
              { message: error.message, path: error.path },
            ]);
          }
          break;
        case 404:
          setError([{ message: errorData.message, path: "" }]);
          break;
        case 401:
          setError([{ message: errorData.message, path: "" }]);
          break;
        case 200:
          setError([]);
          setEmail("");
          setPasword("");
          navigate("/");
          break;
        case 500:
          setError([
            {
              message: "Ocorreu um erro. Tente novamente mais tarde",
              path: "",
            },
          ]);
          break;
        default:
          setError([
            {
              message: "Ocorreu um erro. Tente novamente mais tarde",
              path: "",
            },
          ]);
      }

      console.log(res.status);
    } catch (error) {
      setError([
        { message: "Ocorreu um erro. Tente novamente mais tarde", path: "" },
      ]);
    }
  };

  return (
    <div className="bg-primary flex h-screen w-screen flex-col items-center justify-center">
      <form
        className="bg-primary flex flex-col items-center justify-center gap-6"
        onSubmit={handleSumit}
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
            onChange={(e) => setPasword(e.target.value)}
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
          <Button title="Login" type="submit" />
          <Link to={"/register"}>
            <Button title="Não tenho uma conta" variant="outline" />
          </Link>
        </section>
      </form>
    </div>
  );
};

export default Login;
