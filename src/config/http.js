/*
Comunicación con la API
 */
import axios from "axios";

const api = axios.create({});

export const HTTP = (
  method = "POST",
  url = "",
  data = {},
  accessToken = false
) => {
  return new Promise((resolve, reject) => {
    api({
      method: method,
      url: `${url}`,
      [method === "POST" ? "data" : "params"]: {
        ...data,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(({ data }) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(
          err?.response?.data || {
            error: true,
            message:
              "No tenemos comunicación con el servidor por favor intenta más tarde.",
            status: 401,
          }
        );
      });
  });
};
