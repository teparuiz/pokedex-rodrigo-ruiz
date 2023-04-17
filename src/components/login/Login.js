import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import App from "../../App";

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
    <div>
      <div className="flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 text-center">
        <div className="self-center mb-6 text-xl font-light text-black sm:text-2xl dark:text-white">
          Pokedex
        </div>

        <div className="mt-8">
          <form action="#" autoComplete="off">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <input
                  type="text"
                  id="sign-in-email"
                  name="Correo"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Correo electrónico"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <input
                  type="password"
                  id="sign-in-email"
                  name="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div className="flex mt-2">
              <button type="submit" className="btn btn-primary" onClick={login}>
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
