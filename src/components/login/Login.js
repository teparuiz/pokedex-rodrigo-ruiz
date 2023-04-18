import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../style/login.module.css";
const Login = (props) => {
  const { isLogged, setIsLogged } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
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
                <input
                  type="email"
                  id="sign-in-email"
                  name="Correo"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Correo electrónico"
                  pattern=".+@globex\.com"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <div className="col-6">
                <input
                  type="password"
                  id="sign-in-email"
                  name="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Contraseña"
                  required
                />
              </div>
            </div>
            <div
              className="flex mt-
            4"
            >
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={login}
              >
                Iniciar sesión
              </button>
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
