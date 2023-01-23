import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import { getAllCollaborators } from "../../../Api";
import SemanticUiLoader from "../../../lib/elementComponents/Loader/SemanticUiLoader";
import SemanticUiTable from "../../../lib/elementComponents/SemanticUiTable/SemanticUiTable";
import { visualizeCollaboratorsHeadCells } from "./constants";
import {
  saveAllCollaborators,
  setIsLoading,
} from "./features/visualizeCollaboratorsSlice";
import "./VisualizeCollaborators.css";
import VisualizeCollaboratorsTableRow from "./VisualizeCollaboratorsTable/VisualizeCollaboratorsTableRow";

const VisualizeCollaborators = () => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(false);

  const allCollaborators = useSelector(
    (state) => state.visualizeCollaborators.collaborators
  );
  const isLoading = useSelector(
    (state) => state.visualizeCollaborators.isLoading
  );

  const onResponseSuccess = (res) => {
    dispatch(setIsLoading(false));
    dispatch(saveAllCollaborators(res));
  };

  const onResponseFailure = (res) => {
    dispatch(setIsLoading(false));
    console.log(res.message);
  };

  const getAllWork = async () => {
    let response = "";

    dispatch(setIsLoading(true));

    await getAllCollaborators().then((res) => (response = res));

    !response.message
      ? onResponseSuccess(response)
      : onResponseFailure(response);
  };

  useEffect(() => {
    getAllWork();
    setFirstLoad(true);
  }, []);

  useEffect(() => {
    if (firstLoad && isLoading) {
      getAllWork();
    }
  }, [isLoading, allCollaborators]);

  return (
    <div className="table-container">
      <Segment className="card-table-container">
        {isLoading ? (
          <>
            <SemanticUiLoader
              active
              size={"large"}
              content={"Carregando dados"}
              className="loader-get-collaborators"
            />
          </>
        ) : (
          <>
            <SemanticUiTable
              color={"green"}
              key={"green"}
              headCells={visualizeCollaboratorsHeadCells}
              SemanticUiTableRow={VisualizeCollaboratorsTableRow}
              data={allCollaborators}
            />
          </>
        )}
      </Segment>
    </div>
  );
};

export default VisualizeCollaborators;
