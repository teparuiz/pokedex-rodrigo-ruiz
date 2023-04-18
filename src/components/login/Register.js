import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const { setIsLogged } = props;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();

  const ValidEmail = (email) => {
    const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (valid.test(email)) {
      return true;
    } else {
      alert("Email no válido");
    }
  };

  const register = () => {
    // Guardar los datos del estado en localStorage
    if (ValidEmail(email)) {
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("nickName", nickName);
      setIsLogged(false);
      navigate("/login");
    } else {
      alert("Revisa tus datos");
    }
  };
  return (
    <>
      <div className="flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 text-center">
        <div className="self-center mb-6 text-xl font-light text-black sm:text-2xl dark:text-white">
          <h2> Registrate </h2>
        </div>
        <form autoComplete="off">
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                type="text"
                id="sign-in-name"
                name="Nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Nombre"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                type="text"
                id="sign-in-nickname"
                name="Alias"
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                }}
                placeholder="Nickname"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                type="email"
                id="email"
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
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <input
                type="password"
                id="sign-in-password"
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
          <div className="flex w-full mt-2">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={register}
            >
              Registar
            </button>
          </div>
          <div>
            <Link to="/login">¿Ya tienes cuenta?</Link>
          </div>
        </form>

        <div className="mt-8"></div>
      </div>
    </>
  );
}

export default Register;
