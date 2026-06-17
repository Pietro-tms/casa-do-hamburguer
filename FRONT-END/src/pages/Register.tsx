import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSumit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Verificações dos dados do FRONT-END antes de serem mandados ao BACAK-END

      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !cep.trim()) {
        setError("Preencha todos os campos");
        return;
      }

      if (!(password === confirmPassword)) {
        setError("As senhas precisam ser iguais");
        return;
      }

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      const status = res.status;

      // Trata respostas do BACK-END
      switch (status) {
        case 400:
          setError("Preencha todos os campos");
          break;
        case 409:
          setError("E-mail ja cadastrado");
          break;
        case 201:
          setName("");
          setEmail("");
          setPasword("");
          setConfirmPassword("");
          setCep("");
          setError("");
          navigate("/login");
          const data = await res.json();
          console.log(data);
          break;
        case 500:
          setError("Ocorreu um erro. Tente novamente mais tarde");
          break;
        default:
          setError("Ocorreu um erro. Tente novamente mais tarde");
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um erro. Tente novamente mais tarde");
      return;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary">
      <form
        className="flex flex-col items-center justify-center gap-6 bg-primary"
        onSubmit={handleSumit}
      >
        <Link to={"/"}>
          <img src="./logo.png" alt="Logo lanchonete" />
        </Link>
        <section className="flex w-full flex-col gap-1.5">
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Input>
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
          <Input
            placeholder="Confirme sua Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Input>
          <Input
            placeholder="CEP"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          ></Input>
          <p className="text-sm text-red-500">{error}</p>
        </section>

        <section className="flex w-full flex-col gap-1.5">
          <Button title="Criar conta" type="submit" />
          <Link to={"/login"}>
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </section>
      </form>
    </div>
  );
};

export default Register;
