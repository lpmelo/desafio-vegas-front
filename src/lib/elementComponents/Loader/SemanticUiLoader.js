import React from "react";
import { Loader } from "semantic-ui-react";

const SemanticUiLoader = ({ content, active, size, className }) => {
  return (
    <Loader active={active} size={size} className={className}>
      {content}
    </Loader>
  );
};

export default SemanticUiLoader;
