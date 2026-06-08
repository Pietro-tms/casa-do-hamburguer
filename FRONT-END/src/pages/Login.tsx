import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");
  const { setUser, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSumit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    switch (res.status) {
      case 400:
        setError("Preencha todos os campos");
        break;
      case 404:
        setError("Usuário não encontrado");
        break;
      case 401:
        setError("Senha incorreta");
        break;
      case 200:
        setError("");
        setEmail("");
        setPasword("");
        navigate("/");
        const data = await res.json();
        setUser(data);
        console.log(user?.name);
        break;
      case 500:
        setError("Ocorreu um erro. Tente novamente mais tarde");
        break;
      default:
        setError("");
    }

    console.log(res.status);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#161410]">
      <form
        className="flex flex-col items-center justify-center gap-6 bg-[#161410]"
        onSubmit={handleSumit}
      >
        <Link to={"/"}>
          <img src="./logo.png" alt="Logo lanchonete" />
        </Link>
        <section className="flex w-full flex-col gap-1.5">
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            required
          ></Input>
          <p className="text-red-500">{error}</p>
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
