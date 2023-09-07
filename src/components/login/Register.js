import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Button from "../form/Button";
import { handleError, handleSucess, ValidEmail } from "../../config/utils";

function Register(props) {
  const { setIsLogged } = props;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();



  const register = () => {
    // Guardar los datos del estado en localStorage
    if (ValidEmail(email)) {
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("nickName", nickName);
      setIsLogged(false);
      handleSucess('Cuenta creada con exito')
      navigate("/login");
    } else {
      handleError("Revisa tus datos");
    }
  };

  const _disabled = () => {
    let disabled = false;
    if (!password) return (disabled = true);
    if (!email) return (disabled = true);

    return disabled;
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
              <Input
                name="Nombre"
                value={name}
                onChange={setName}
                placeholder="Escribe tu nombre"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <Input
                name="Usuario"
                value={nickName}
                onChange={setNickName}
                placeholder="Escribe tu usuario"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
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
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
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
          <div className="flex w-full mt-2">
            <Button
              onClick={register}
              name="Crear cuenta"
              icon="person_add_alt"
              disabled={_disabled()}
            />
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
