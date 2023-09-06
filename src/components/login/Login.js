import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../style/login.module.css";
import Input from "../form/Input";
import Button from "../form/Button";
const Login = (props) => {
  const { isLogged, setIsLogged } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    const itsLogin = email === storedEmail && password === storedPassword;
    if (itsLogin) {
      setIsLogged(true);
      navigate("/");
      alert("Inicio de sesión exitoso");
    } else {
      alert("Revisa los datos que son incorrectos");
    }
  };

  return (
    <div className={style.login}>
      <div className="flex flex-col w-full max-w-md text-center">
        <div className="self-center mb-6 text-xl font-light text-black sm:text-2xl dark:text-white">
          <h1> Pokédex </h1>
        </div>

        <div className="mt-2">
          <form autoComplete="off">
            <div className="flex flex-col mb-4">
              <div className="col-6">
                <Input
                  type="email"
                  name="Correo"
                  value={email}
                  onChange={setEmail}
                  placeholder="Escribe tu correo electrónico"
                  pattern=".+@globex\.com"
                  required={true}
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <div className="col-6">
                {" "}
                <Input
                  type="password"
                  name="Contraseña"
                  placeholder="Escribe tu contraseña"
                  onChange={setPassword}
                  value={password}
                  required={true}
                />
              </div>
            </div>
            <div
              className="flex mt-
            4"
            >
              <Button
                onClick={login}
                name="Iniciar sesión"
                icon="login"
                className="btn btn-secondary"
              />
              <div>
                <Link to="/register">¿No tienes una cuenta?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
