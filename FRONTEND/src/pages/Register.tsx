import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import Error from "../components/Error";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState([{ message: "", path: "" }]);
  const navigate = useNavigate();

  const handleSumit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError([{ message: "", path: "" }]);
    try {
      // Verificações dos dados do FRONT-END antes de serem mandados ao BACK-END
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim() ||
        !cep.trim()
      ) {
        setError([{ message: "Preencha todos os campos", path: "" }]);
        return;
      }

      if (!(password === confirmPassword)) {
        setError([
          { message: "As senhas precisam ser iguais", path: "confirmPassword" },
        ]);
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
        case 400: {
          const errorData = await res.json();

          for (const error of errorData.errors) {
            setError((prev) => [
              ...prev,
              { message: error.message, path: error.path },
            ]);
          }
          break;
        }
        case 409:
          setError([{ message: "E-mail já cadastrado", path: "email" }]);
          break;
        case 201:
          setName("");
          setEmail("");
          setPasword("");
          setConfirmPassword("");
          setCep("");
          setError([]);
          navigate("/login");
          const data = await res.json();
          console.log(data);
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
    } catch (error) {
      console.log(error);
      setError([
        { message: "Ocorreu um erro. Tente novamente mais tarde", path: "" },
      ]);
      return;
    }
  };

  return (
    <div className="bg-primary flex h-screen w-screen flex-col items-center justify-center">
      <form
        className="bg-primary flex w-[350px] flex-col items-center justify-center gap-6"
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
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Input>
          {error.filter((err) => err.path === "name").length > 0 && (
            <Error error={error.find((err) => err.path === "name")?.message} />
          )}
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
            minLength={3}
            title="A senha deve ter pelo menos 3 caracteres"
            required
          ></Input>
          {error.filter((err) => err.path === "password").length > 0 && (
            <Error
              error={error.find((err) => err.path === "password")?.message}
            />
          )}
          <Input
            placeholder="Confirme sua Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Input>

          {error.filter((err) => err.path === "confirmPassword").length > 0 && (
            <Error
              error={
                error.find((err) => err.path === "confirmPassword")?.message
              }
            />
          )}
          <Input
            placeholder="CEP"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]{5}-?[0-9]{3}"
            title="O CEP deve ter 8 dígitos, com ou sem hífen"
            required
          ></Input>
          {error.filter((err) => err.path === "cep").length > 0 && (
            <Error error={error.find((err) => err.path === "cep")?.message} />
          )}
          {error.filter((err) => err.path === "").length > 0 && (
            <Error error={error.find((err) => err.path === "")?.message} />
          )}
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
