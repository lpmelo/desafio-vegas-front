import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DateInput } from "semantic-ui-calendar-react";
import { Form, Grid, Segment } from "semantic-ui-react";
import SemanticUiReduxAutoComplete from "../../../../lib/elementComponents/SemanticUIAutoComplete.js/SemanticUiAutoComplete";
import IconIdCard from "../../../icons/IconIdCard";
import IconSearch from "../../../icons/IconSearch";
import IconUserCicle from "../../../icons/IconUserCicle";
import {
  changeCollaboratorData,
  changeCollaboratorMessages,
  clearAutoCompleteAction,
  finishSearchAutoCompleteAction,
  saveCepGetResponse,
  searchAutoCompleteAction,
  setBtnLocked,
  updateSelectAutoCompleteAction,
} from "../features/visualizeCollaboratorsSlice";
import {
  fieldsWithErrors,
  isValidCep,
  uniqueFieldWithError,
} from "./constants";
import { getCep } from "../../../../ApiCep";
import AutoCompleteResultsRenderer from "./AutoCompleteResultsRenderer/AutoCompleteResultsRenderer";
import moment from "moment";

const EditModal = () => {
  const dispatch = useDispatch();
  const { collaborator } = useSelector(
    (state) => state.visualizeCollaborators.editModal
  );
  const { data, messages, autoComplete } = useSelector(
    (state) => state.visualizeCollaborators.editModal.collaborator
  );
  const [hasValue, setHasValue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialCollaborator, setInitialCollaborator] = useState(data);

  const mockOptions = [
    {
      id: uuidv4(),
      title: "Técnico em Informática",
      category: "Suporte",
      payment: "R$ 1000,00",
      beneficts: "Não",
    },
    {
      id: uuidv4(),
      title: "Desenvolvedor Fullstack",
      category: "Tecnologia da Informação",
      payment: "R$ 3060,00",
      beneficts: "Sim",
    },
    {
      id: uuidv4(),
      title: "Segurança",
      category: "Serviços Gerais",
      payment: "R$ 2750,00",
      beneficts: "Não",
    },
    {
      id: uuidv4(),
      title: "Analista Contábil",
      category: "Financeiro",
      payment: "R$ 4320,00",
      beneficts: "Sim",
    },
    {
      id: uuidv4(),
      title: "Diretor",
      category: "Gestão",
      payment: "R$ 15780,00",
      beneficts: "Não",
    },
  ];

  const dispatchErrorMessages = (errorFields) => {
    dispatch(changeCollaboratorMessages({ ...errorFields }));
  };

  const verifyData = (keysOrFieldId, haveError) => {
    if (Array.isArray(keysOrFieldId)) {
      const fieldsWithError = fieldsWithErrors(keysOrFieldId, collaborator);
      const isEmpty = Object.keys(fieldsWithError).length === 0;
      if (!isEmpty) {
        haveError = true;
      } else {
        haveError = false;
      }

      dispatchErrorMessages(fieldsWithError);
    } else {
      const fieldWithError = uniqueFieldWithError(
        keysOrFieldId,
        data,
        messages
      );
      dispatchErrorMessages(fieldWithError);
    }

    if (haveError) {
      return haveError;
    }
  };

  const threatResponseData = (response) => {
    dispatch(saveCepGetResponse(response));
  };

  const handleChange = (event, field) => {
    const value = event.target.value;
    if (field === "cep" && value.length < 9) {
      dispatch(changeCollaboratorData({ changedValue: value, field }));
    } else if (field === "cpf" && value.length < 12) {
      dispatch(changeCollaboratorData({ changedValue: value, field }));
    } else if (field !== "cep" && field !== "cpf") {
      dispatch(changeCollaboratorData({ changedValue: value, field }));
    }
  };

  const handleBlur = (event) => {
    verifyData(event.target.id);
    if (isValidCep(event.target.name, event.target.value.length)) {
      getCep(event.target.value).then((res) => threatResponseData(res));
      setHasValue(true);
      setIsDisabled(false);
    }
  };

  const resultRenderer = (data) => {
    return <AutoCompleteResultsRenderer props={data} />;
  };

  const handleClearDate = (event, { name, value }) => {
    dispatch(changeCollaboratorData({ changedValue: "", field: name }));
  };

  const handleChangeDate = (event, { name, value }) => {
    if (value) {
      dispatch(changeCollaboratorData({ changedValue: value, field: name }));
    }
  };

  const handleBlurDate = (event) => {
    if (event) {
      verifyData(event.target.id);
    }
  };

  const verifyIfHasChanges = (initialState, actualState) => {
    let hasChanges = false;
    let hasBlankValues = false;
    let needToLock = false;
    const keys = Object.keys(initialState);

    keys.forEach((key) =>
      key === "admissionDate"
        ? initialState[key] != actualState[key]
          ? (hasChanges = true)
          : ""
        : initialState[key] != actualState[key]
        ? (hasChanges = true)
        : ""
    );

    keys.forEach(function (key) {
      if (key !== "complement") {
        if (key === "admissionDate") {
          if (actualState[key].length < 10) {
            hasBlankValues = true;
          }
        }
        if (!actualState[key].length) {
          if (!actualState[key]) {
            hasBlankValues = true;
          }
        }
      }
    });

    if (!hasChanges || hasBlankValues) {
      needToLock = true;
    }
    if (needToLock) {
      dispatch(setBtnLocked(true));
    } else {
      dispatch(setBtnLocked(false));
    }
  };

  useEffect(() => {
    dispatch(setBtnLocked(true));
  }, []);

  useEffect(() => {
    if (data.cep.length < 8) {
      setIsDisabled(true);
      setHasValue(false);
    }
    if (data.cep.length === 8) {
      setIsDisabled(false);
      setHasValue(true);
    }
  }, [data.cep]);

  useEffect(() => {
    if (data.admissionDate) {
      verifyData("admissionDate");
    }
  }, [data.admissionDate]);

  useEffect(() => {
    verifyIfHasChanges(initialCollaborator, data);
  }, [data]);

  return (
    <>
      <Grid className="grid-container">
        <Grid.Row className="row-form" columns={1}>
          <Grid.Column className="container-form">
            <Form className="form">
              <Form.Group>
                <Form.Input
                  id="clientName"
                  placeholder="Nome do Colaborador"
                  fluid
                  width={8}
                  icon={IconUserCicle}
                  iconPosition="left"
                  label="Nome do Colaborador"
                  value={data.clientName}
                  onChange={(e) => handleChange(e, "clientName")}
                  onBlur={(e) => handleBlur(e)}
                  required
                  error={messages.clientName && messages.clientName}
                />
                <Form.Field width={8}>
                  <SemanticUiReduxAutoComplete
                    id="occupation"
                    state={autoComplete}
                    placeholder={"Função do colaborador"}
                    handleBlur={handleBlur}
                    clearAction={clearAutoCompleteAction}
                    finishSearchAction={finishSearchAutoCompleteAction}
                    searchAction={searchAutoCompleteAction}
                    updateSelectAction={updateSelectAutoCompleteAction}
                    options={mockOptions}
                    filterValueName="title"
                    resultRenderer={resultRenderer}
                    label="Função"
                    required
                    error={messages.occupation && messages.occupation}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  id="cpf"
                  placeholder="CPF"
                  fluid
                  width={8}
                  icon={IconIdCard}
                  iconPosition="left"
                  label="CPF"
                  value={data.cpf}
                  onChange={(e) => handleChange(e, "cpf")}
                  onBlur={(e) => handleBlur(e)}
                  required
                  error={messages.cpf && messages.cpf}
                />
                <Form.Field width={4}>
                  <DateInput
                    id="admissionDate"
                    name="admissionDate"
                    label="Data de Admissão"
                    clearable
                    onClear={handleClearDate}
                    fluid
                    placeholder="Selecione a data"
                    dateFormat="DD/MM/YYYY"
                    startMode="year"
                    onChange={handleChangeDate}
                    onBlur={handleBlurDate}
                    closable
                    value={data.admissionDate}
                    required
                    error={messages.admissionDate && messages.admissionDate}
                  />
                </Form.Field>

                <Form.Input
                  id="cep"
                  name="cep"
                  placeholder="CEP"
                  fluid
                  width={4}
                  icon={IconSearch}
                  iconPosition="left"
                  label="CEP"
                  value={data.cep}
                  onChange={(e) => handleChange(e, "cep")}
                  onBlur={(e) => handleBlur(e)}
                  required
                  error={messages.cep && messages.cep}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  id="city"
                  label={hasValue ? "Cidade" : false}
                  placeholder="Cidade"
                  width={6}
                  value={data.city}
                  onChange={(e) => handleChange(e, "city")}
                  onBlur={(e) => handleBlur(e)}
                  disabled={isDisabled}
                  required
                  error={messages.city && messages.city}
                />
                <Form.Input
                  id="uf"
                  label={hasValue ? "UF" : false}
                  placeholder="UF"
                  width={2}
                  value={data.uf}
                  onChange={(e) => handleChange(e, "uf")}
                  onBlur={(e) => handleBlur(e)}
                  disabled={isDisabled}
                  required
                  error={messages.uf && messages.uf}
                />
                <Form.Input
                  id="address"
                  label={hasValue ? "Rua" : false}
                  placeholder="Rua"
                  width={6}
                  value={data.address}
                  onChange={(e) => handleChange(e, "address")}
                  onBlur={(e) => handleBlur(e)}
                  disabled={isDisabled}
                  required
                  error={messages.address && messages.address}
                />
                <Form.Input
                  id="number"
                  label={hasValue ? "Número" : false}
                  placeholder="Número"
                  width={2}
                  value={data.number}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(e, "number")}
                  onBlur={(e) => handleBlur(e)}
                  required
                  error={messages.number && messages.number}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  id="district"
                  label={hasValue ? "Bairro" : false}
                  placeholder="Bairro"
                  error={hasValue && messages.district && messages.district}
                  width={8}
                  value={data.district}
                  onChange={(e) => handleChange(e, "district")}
                  onBlur={(e) => handleBlur(e)}
                  disabled={isDisabled}
                  required
                />
                <Form.Input
                  id="complement"
                  label={hasValue ? "Complemento" : false}
                  placeholder="Complemento"
                  width={8}
                  value={data.complement}
                  onChange={(e) => handleChange(e, "complement")}
                  disabled={isDisabled}
                  error={messages.complement && messages.complement}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default EditModal;
