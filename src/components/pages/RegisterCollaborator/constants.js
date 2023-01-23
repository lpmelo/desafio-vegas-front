export const cepError = {
  content: "Por favor, insira o cep corretamente",
  pointing: "above",
};

export const cpfError = "Por favor, insira o documento CPF corretamente";

export const formInitialState = {
  formData: {
    clientName: "",
    cpf: "",
    admissionDate: "",
    cep: "",
    uf: "",
    city: "",
    district: "",
    address: "",
    number: "",
    complement: "",
    occupation: "",
  },
  messages: {},
  submitEvents: {
    submitFailed: false,
    submitSuccess: false,
  },
  autoComplete: {
    loading: false,
    results: [],
    value: "",
  },
};

export const requiredFields = [
  "clientName",
  "admissionDate",
  "cep",
  "uf",
  "district",
  "address",
  "number",
  "complement",
];

const validateCep = (value) => {
  if (value.length < 8) {
    return true;
  }
  return false;
};

const validateCpf = (value) => {
  if (value.length < 11) {
    return true;
  }
  return false;
};

const genericValidation = (value) => {
  if (!value.length) {
    return true;
  }
  return false;
};

const errorMessage = (fieldName) => {
  const allErrors = {
    clientName: "Campo obrigatório",
    cpf: cpfError,
    admissionDate: "Campo obrigatório",
    cep: cepError.content,
    uf: "Campo obrigatório",
    city: "Campo obrigatório",
    district: "Campo obrigatório",
    address: "Campo obrigatório",
    number: "Campo obrigatório",
    occupation: "Campo obrigatório",
  };

  const errorMessage = allErrors[fieldName];
  return errorMessage;
};

export const isValidCep = (fieldName, fieldLenght) => {
  if (fieldName === "cep") {
    if (fieldLenght === 8) {
      return true;
    }
  }
  return false;
};

export const validateFields = (fieldId, fieldValue) => {
  const fieldsId = {
    clientName: () => genericValidation(fieldValue),
    cpf: () => validateCpf(fieldValue),
    admissionDate: () => genericValidation(fieldValue),
    cep: () => validateCep(fieldValue),
    uf: () => genericValidation(fieldValue),
    city: () => genericValidation(fieldValue),
    district: () => genericValidation(fieldValue),
    address: () => genericValidation(fieldValue),
    number: () => genericValidation(fieldValue),
    occupation: () => genericValidation(fieldValue),
  };

  const fieldValidate =
    Object.keys(fieldsId).includes(fieldId) && fieldsId[fieldId];

  return fieldValidate ? fieldValidate() : false;
};

export const uniqueFieldWithError = (fieldId, state, messages) => {
  let errorField = "";
  let formattedFieldError = {};

  if (validateFields(fieldId, state[fieldId])) {
    errorField = fieldId;
  }

  if (errorField) {
    formattedFieldError = {
      ...messages,
      [errorField]: errorMessage(errorField),
    };
  } else {
    formattedFieldError = { ...messages };
    delete formattedFieldError[fieldId];
  }

  return formattedFieldError ? formattedFieldError : "";
};

export const fieldsWithErrors = (allFieldIds, state) => {
  let errorFields = [];
  let formattedFieldError = {};

  allFieldIds.map((fieldId) => {
    if (validateFields(fieldId, state[fieldId])) {
      errorFields.push(fieldId);
    }
  });

  errorFields.map((error) => {
    formattedFieldError = {
      ...formattedFieldError,
      [error]: errorMessage(error),
    };
  });

  return formattedFieldError;
};
