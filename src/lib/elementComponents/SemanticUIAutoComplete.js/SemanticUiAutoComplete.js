import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Search } from "semantic-ui-react";
import "./SemanticUiAutoComplete.css";

const SemanticUiReduxAutoComplete = ({
  id,
  placeholder,
  state,
  handleBlur,
  searchAction,
  clearAction,
  finishSearchAction,
  updateSelectAction,
  options,
  filterValueName,
  resultRenderer,
  label,
  required,
  error,
}) => {
  const dispatch = useDispatch();

  const { loading, results, value } = state;

  const timeoutRef = useRef();

  const returnLabelClassName = () => {
    const requiredLabel = "autocomplete-label-required";
    const defaultLabel = "autocomplete-label";
    const requiredLabelError = "autocomplete-label-required error";
    const defaultLabelError = "autocomplete-label error";
    if (error) {
      if (required) {
        return requiredLabelError;
      }
      return defaultLabelError;
    }
    if (required) {
      return requiredLabel;
    }
    return defaultLabel;
  };

  const handleResultSelect = (e, data) => {
    dispatch(updateSelectAction(data.result.title));
  };

  const handleChangeAutoComplete = (e, data) => {
    dispatch(searchAction(data.value));

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch(clearAction());
        return;
      }

      const result = options.filter((option) =>
        option[filterValueName].includes(data.value)
      );

      dispatch(finishSearchAction(result));
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {label ? (
        <>
          <p className={returnLabelClassName()}>{label}</p>
        </>
      ) : (
        <></>
      )}
      <Search
        id={id}
        loading={loading}
        placeholder={placeholder}
        onBlur={handleBlur}
        onResultSelect={handleResultSelect}
        onSearchChange={handleChangeAutoComplete}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        input={<Form.Input error={error} />}
      />
    </>
  );
};

export default SemanticUiReduxAutoComplete;
