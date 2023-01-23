import axios from "axios";

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
      `${process.env.REACT_APP_LARAVEL_API_BASE_URL}${process.env.REACT_APP_LARAVEL_API_POST}`,
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
      `${process.env.REACT_APP_LARAVEL_API_BASE_URL}${process.env.REACT_APP_LARAVEL_API_ROUTE_GET_ALL}`,
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
      `${process.env.REACT_APP_LARAVEL_API_BASE_URL}${process.env.REACT_APP_LARAVEL_API_ROUTE_GET_BY_ID}${id}`,
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
      `${process.env.REACT_APP_LARAVEL_API_BASE_URL}${process.env.REACT_APP_LARAVEL_API_ROUTE_PUT}${id}`,
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
      `${process.env.REACT_APP_LARAVEL_API_BASE_URL}${process.env.REACT_APP_LARAVEL_API_DELETE}${id}`,
      {}
    );

    if (res.data) {
      return res.data;
    }
  } catch (err) {
    return err;
  }
};
