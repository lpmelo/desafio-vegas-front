import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import "./RegisterCollaborator.css";
import IconSearch from "../../icons/IconSearch";
import {
  fieldsWithErrors,
  isValidCep,
  uniqueFieldWithError,
} from "./constants";
import { useDispatch, useSelector } from "react-redux";
import {
  changeValue,
  clearState,
  saveGetResponse,
  changeMessages,
  clearMessages,
  onSubmitFailed,
  onSubmitSuccess,
  clearValidations,
  clearAutoCompleteAction,
  finishSearchAutoCompleteAction,
  searchAutoCompleteAction,
  updateSelectAutoCompleteAction,
  setIsLoading,
} from "./features/registerCollaboratorSlice";
import { getCep } from "../../../ApiCep";
import IconUserCicle from "../../icons/IconUserCicle";
import IconPlus from "../../icons/IconPlus";
import { postNewCollaborator } from "../../../Api";
import { v4 as uuidv4 } from "uuid";
import SemanticUiReduxAutoComplete from "../../../lib/elementComponents/SemanticUIAutoComplete.js/SemanticUiAutoComplete";
import AutoCompleteResultsRenderer from "./AutoCompleteResultsRenderer/AutoCompleteResultsRenderer";
import IconIdCard from "../../icons/IconIdCard";
import moment from "moment";
import SemanticUiLoader from "../../../lib/elementComponents/Loader/SemanticUiLoader";

const RegisterCollaborator = () => {
  const [hasValue, setHasValue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const autoCompleteState = useSelector(
    (state) => state.registerCollaborator.autoComplete
  );
  const formValues = useSelector(
    (state) => state.registerCollaborator.formData
  );
  const messages = useSelector((state) => state.registerCollaborator.messages);

  const { submitSuccess, submitFailed } = useSelector(
    (state) => state.registerCollaborator.submitEvents
  );

  const { isLoading } = useSelector((state) => state.registerCollaborator);

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
  const activePage = useSelector((state) => state.pageSwitcher.item);

  const dispatch = useDispatch();

  const threatResponseData = (response) => {
    dispatch(saveGetResponse(response));
  };

  const onSuccess = () => {
    dispatch(clearState(""));
    dispatch(clearAutoCompleteAction());
    dispatch(onSubmitSuccess());
  };

  const dispatchErrorMessages = (errorFields) => {
    dispatch(changeMessages({ ...errorFields }));
  };

  const verifyData = (keysOrFieldId, haveError) => {
    if (Array.isArray(keysOrFieldId)) {
      const fieldsWithError = fieldsWithErrors(keysOrFieldId, formValues);
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
        formValues,
        messages
      );
      dispatchErrorMessages(fieldWithError);
    }

    if (haveError) {
      return haveError;
    }
  };

  const handleClearDate = (event, { name, value }) => {
    dispatch(changeValue({ changedValue: "", field: name }));
  };

  const handleChangeDate = (event, { name, value }) => {
    if (value) {
      dispatch(changeValue({ changedValue: value, field: name }));
    }
  };

  const handleBlurDate = (event) => {
    if (event) {
      verifyData(event.target.id);
    }
  };

  const handleChange = (event, field) => {
    const value = event.target.value;
    if (field === "cep" && value.length < 9) {
      dispatch(changeValue({ changedValue: value, field }));
    } else if (field === "cpf" && value.length < 12) {
      dispatch(changeValue({ changedValue: value, field }));
    } else if (field !== "cep" && field !== "cpf") {
      dispatch(changeValue({ changedValue: value, field }));
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

  const postNewCollaboratorWork = async (collaborator) => {
    dispatch(setIsLoading(true));
    await postNewCollaborator(
      collaborator.id,
      collaborator.clientName,
      collaborator.cpf,
      collaborator.admissionDate,
      collaborator.cep,
      collaborator.uf,
      collaborator.city,
      collaborator.district,
      collaborator.address,
      collaborator.number,
      collaborator.complement,
      collaborator.occupation
    ).then((res) =>
      res.message ? onSuccess() : console.log(res.response.data.message)
    );
    dispatch(setIsLoading(false));
  };

  const handleSubmit = () => {
    let haveError = false;
    const formKeys = Object.keys(formValues);
    haveError = verifyData(formKeys, haveError);

    if (haveError) {
      dispatch(onSubmitFailed());
    } else {
      const newId = uuidv4();

      const date = moment(formValues.admissionDate, "DD/MM/YYYY");

      const formattedDate = date.format("YYYY-MM-DD");

      const collaborator = {
        id: newId,
        clientName: formValues.clientName,
        cpf: formValues.cpf,
        admissionDate: formattedDate,
        cep: formValues.cep,
        uf: formValues.uf,
        city: formValues.city,
        district: formValues.district,
        address: formValues.address,
        number: Number(formValues.number),
        complement: formValues.complement,
        occupation: formValues.occupation,
      };

      postNewCollaboratorWork(collaborator);
    }
  };

  const resultRenderer = (data) => {
    return <AutoCompleteResultsRenderer props={data} />;
  };

  useEffect(() => {
    dispatch(clearState(""));
    dispatch(clearAutoCompleteAction());
    dispatch(clearMessages());
    dispatch(clearValidations());
  }, [activePage]);

  useEffect(() => {
    if (formValues.cep.length < 8) {
      setIsDisabled(true);
      setHasValue(false);
    }
  }, [formValues.cep]);

  useEffect(() => {
    if (formValues.admissionDate) {
      verifyData("admissionDate");
    }
  }, [formValues.admissionDate]);

  return (
    <>
      <Segment className="form-container">
        <Grid className="grid-container">
          <Grid.Row columns={1} className="row-title">
            <Grid.Column className="register-title">
              <h1>Cadastrar novo Colaborador</h1>
              {submitSuccess && (
                <Message
                  success
                  header="Colaborador cadastrado com sucesso!"
                  content={`Você cadastrou um colaborador com sucesso, para visualiza-lo, acesse a aba 'Visualizar Colaboradores'`}
                />
              )}

              {submitFailed && (
                <Message
                  error
                  header="Existem erros no preenchimento do cadastro!"
                  content={`Existem erros no preenchimento do cadastro, por favor verifique e preencha corretamente`}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="row-form" columns={1}>
            {isLoading ? (
              <>
                <SemanticUiLoader
                  active
                  size={"small"}
                  content={"Inserindo colaborador"}
                  className="loader-insert-collaborator"
                />
              </>
            ) : (
              <>
                <Button
                  icon={IconPlus}
                  content="Incluir"
                  className="btn-submit"
                  onClick={() => handleSubmit()}
                />
              </>
            )}

            <Grid.Column className="container-form">
              <Form className="form">
                <Form.Group>
                  <Form.Input
                    id="clientName"
                    placeholder="Nome do Colaborador"
                    error={messages.clientName && messages.clientName}
                    fluid
                    width={8}
                    icon={IconUserCicle}
                    iconPosition="left"
                    label="Nome do Colaborador"
                    value={formValues.clientName}
                    onChange={(e) => handleChange(e, "clientName")}
                    onBlur={(e) => handleBlur(e)}
                    required
                    disabled={isLoading}
                  />
                  <Form.Field width={8}>
                    <SemanticUiReduxAutoComplete
                      id="occupation"
                      state={autoCompleteState}
                      placeholder={"Função do colaborador"}
                      handleBlur={handleBlur}
                      clearAction={clearAutoCompleteAction}
                      finishSearchAction={finishSearchAutoCompleteAction}
                      searchAction={searchAutoCompleteAction}
                      updateSelectAction={updateSelectAutoCompleteAction}
                      options={mockOptions}
                      filterValueName="title"
                      error={messages.occupation && messages.occupation}
                      resultRenderer={resultRenderer}
                      label="Função"
                      required
                      disabled={isLoading}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    id="cpf"
                    placeholder="CPF"
                    error={messages.cpf && messages.cpf}
                    fluid
                    width={8}
                    icon={IconIdCard}
                    iconPosition="left"
                    label="CPF"
                    value={formValues.cpf}
                    onChange={(e) => handleChange(e, "cpf")}
                    onBlur={(e) => handleBlur(e)}
                    required
                    disabled={isLoading}
                  />
                  <Form.Field width={4}>
                    <DateInput
                      id="admissionDate"
                      name="admissionDate"
                      label="Data de Admissão"
                      clearable
                      onClear={handleClearDate}
                      error={messages.admissionDate && messages.admissionDate}
                      fluid
                      placeholder="Selecione a data"
                      dateFormat="DD/MM/YYYY"
                      startMode="year"
                      onChange={handleChangeDate}
                      onBlur={handleBlurDate}
                      closable
                      value={formValues.admissionDate}
                      required
                      disabled={isLoading}
                    />
                  </Form.Field>

                  <Form.Input
                    id="cep"
                    name="cep"
                    placeholder="CEP"
                    error={messages.cep && messages.cep}
                    fluid
                    width={4}
                    icon={IconSearch}
                    iconPosition="left"
                    label="CEP"
                    value={formValues.cep}
                    onChange={(e) => handleChange(e, "cep")}
                    onBlur={(e) => handleBlur(e)}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    id="city"
                    label={hasValue ? "Cidade" : false}
                    placeholder="Cidade"
                    error={hasValue && messages.city && messages.city}
                    width={6}
                    value={formValues.city}
                    onChange={(e) => handleChange(e, "city")}
                    onBlur={(e) => handleBlur(e)}
                    disabled={isDisabled || isLoading}
                    required
                  />
                  <Form.Input
                    id="uf"
                    label={hasValue ? "UF" : false}
                    placeholder="UF"
                    error={hasValue && messages.uf && messages.uf}
                    width={2}
                    value={formValues.uf}
                    onChange={(e) => handleChange(e, "uf")}
                    onBlur={(e) => handleBlur(e)}
                    disabled={isDisabled || isLoading}
                    required
                  />
                  <Form.Input
                    id="address"
                    label={hasValue ? "Rua" : false}
                    placeholder="Rua"
                    error={hasValue && messages.address && messages.address}
                    width={6}
                    value={formValues.address}
                    onChange={(e) => handleChange(e, "address")}
                    onBlur={(e) => handleBlur(e)}
                    disabled={isDisabled || isLoading}
                    required
                  />
                  <Form.Input
                    id="number"
                    label={hasValue ? "Número" : false}
                    placeholder="Número"
                    error={hasValue && messages.number && messages.number}
                    width={2}
                    value={formValues.number}
                    disabled={isDisabled || isLoading}
                    onChange={(e) => handleChange(e, "number")}
                    onBlur={(e) => handleBlur(e)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    id="district"
                    label={hasValue ? "Bairro" : false}
                    placeholder="Bairro"
                    error={hasValue && messages.district && messages.district}
                    width={8}
                    value={formValues.district}
                    onChange={(e) => handleChange(e, "district")}
                    onBlur={(e) => handleBlur(e)}
                    disabled={isDisabled || isLoading}
                    required
                  />
                  <Form.Input
                    id="complement"
                    label={hasValue ? "Complemento" : false}
                    placeholder="Complemento"
                    width={8}
                    value={formValues.complement}
                    onChange={(e) => handleChange(e, "complement")}
                    disabled={isDisabled || isLoading}
                  />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default RegisterCollaborator;
