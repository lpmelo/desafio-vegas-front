import React from "react";
import { Label, List, Segment } from "semantic-ui-react";
import "./AutoCompleteResultsRenderer.css";
const AutoCompleteResultsRenderer = ({ props }) => {
  const returnColor = (condition) => {
    if (condition === "Sim") {
      return "green";
    } else {
      return "red";
    }
  };
  return (
    <>
      <Segment className="result-segment">
        <Label attached="top left" content={props.title} color="teal" />
        <List className="result-container">
          <List.Item
            icon="book"
            content={
              <>
                <p>Categoria</p>
                <Label
                  color="orange"
                  className="label-options"
                  content={props.category}
                />
              </>
            }
          />
          <List.Item
            icon="dollar"
            content={
              <>
                <p>Pagamento</p>
                <Label
                  color="green"
                  className="label-options"
                  content={props.payment}
                />
              </>
            }
          />

          <List.Item
            icon="gift"
            content={
              <>
                <p>Tem Benefício?</p>
                <Label
                  color={returnColor(props.beneficts)}
                  className="label-options"
                  content={props.beneficts}
                />
              </>
            }
          />
        </List>
      </Segment>
    </>
  );
};

export default AutoCompleteResultsRenderer;
