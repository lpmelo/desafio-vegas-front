import axios from "axios";
import {
  REACT_APP_LARAVEL_API_BASE_URL,
  REACT_APP_LARAVEL_API_DELETE,
  REACT_APP_LARAVEL_API_POST,
  REACT_APP_LARAVEL_API_ROUTE_GET_ALL,
  REACT_APP_LARAVEL_API_ROUTE_GET_BY_ID,
  REACT_APP_LARAVEL_API_ROUTE_PUT,
} from "./constants";

export const postNewCollaborator = async (
  id,
  clientName,
  cpf,
  admissionDate,
  cep,
  uf,
  city,
  district,
  address,
  number,
  complement,
  occupation
) => {
  try {
    const res = await axios.post(
      `${REACT_APP_LARAVEL_API_BASE_URL}${REACT_APP_LARAVEL_API_POST}`,
      {
        id,
        clientName,
        cpf,
        admissionDate,
        cep,
        uf,
        city,
        district,
        address,
        number,
        complement,
        occupation,
      }
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const getAllCollaborators = async () => {
  try {
    const res = await axios.get(
      `${REACT_APP_LARAVEL_API_BASE_URL}${REACT_APP_LARAVEL_API_ROUTE_GET_ALL}`,
      {}
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const getCollaboratorById = async (id) => {
  try {
    const res = await axios.get(
      `${REACT_APP_LARAVEL_API_BASE_URL}${REACT_APP_LARAVEL_API_ROUTE_GET_BY_ID}${id}`,
      {}
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const editCollaborator = async (
  id,
  clientName,
  cpf,
  admissionDate,
  cep,
  uf,
  city,
  district,
  address,
  number,
  complement,
  occupation
) => {
  try {
    const res = await axios.put(
      `${REACT_APP_LARAVEL_API_BASE_URL}${REACT_APP_LARAVEL_API_ROUTE_PUT}${id}`,
      {
        clientName,
        cpf,
        admissionDate,
        cep,
        uf,
        city,
        district,
        address,
        number,
        complement,
        occupation,
      }
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const deleteCollaborator = async (id) => {
  try {
    const res = await axios.delete(
      `${REACT_APP_LARAVEL_API_BASE_URL}${REACT_APP_LARAVEL_API_DELETE}${id}`,
      {}
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};
