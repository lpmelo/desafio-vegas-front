import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import { editCollaborator, getAllCollaborators } from "../../../Api";
import SemanticUiLoader from "../../../lib/elementComponents/Loader/SemanticUiLoader";
import SemanticUiModal from "../../../lib/elementComponents/SemanticUiModal/SemanticUiModal";
import SemanticUiTable from "../../../lib/elementComponents/SemanticUiTable/SemanticUiTable";
import { visualizeCollaboratorsHeadCells } from "./constants";
import EditModal from "./EditModal/EditModal";
import {
  clearCollaboratorData,
  openEditModal,
  saveAllCollaborators,
  setBtnLocked,
  setBtnNotActiveActions,
  setIsLoading,
} from "./features/visualizeCollaboratorsSlice";
import "./VisualizeCollaborators.css";
import VisualizeCollaboratorsTableRow from "./VisualizeCollaboratorsTable/VisualizeCollaboratorsTableRow";
const VisualizeCollaborators = () => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(false);

  const editModalOpen = useSelector(
    (state) => state.visualizeCollaborators.editModal.open
  );

  const { btnLocked, data, messages } = useSelector(
    (state) => state.visualizeCollaborators.editModal.collaborator
  );

  const allCollaborators = useSelector(
    (state) => state.visualizeCollaborators.collaborators
  );
  const isLoading = useSelector(
    (state) => state.visualizeCollaborators.isLoading
  );

  const onResponseSuccess = (res) => {
    dispatch(setIsLoading(false));
    dispatch(setBtnNotActiveActions(false));
    dispatch(saveAllCollaborators(res));
  };

  const onResponseFailure = (res) => {
    dispatch(setIsLoading(false));
    dispatch(setBtnNotActiveActions(false));
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

  const onCloseEditModal = () => {
    dispatch(clearCollaboratorData());
  };

  const handleUpdateCollaborator = async () => {
    if (!Object.keys(messages).length) {
      dispatch(setBtnNotActiveActions(true));
      await editCollaborator(
        data.id,
        data.clientName,
        data.cpf,
        data.admissionDate,
        data.cep,
        data.uf,
        data.city,
        data.district,
        data.address,
        data.number,
        data.complement,
        data.occupation
      );
      dispatch(setIsLoading(true));
    }
    dispatch(setBtnLocked(true));
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
      <SemanticUiModal
        open={editModalOpen}
        setOpen={openEditModal}
        onClose={onCloseEditModal}
        title={"Editar Colaborador"}
        content={<EditModal />}
        action
        btnPositiveDisabled={btnLocked}
        onClickPositiveAction={handleUpdateCollaborator}
      />
    </div>
  );
};

export default VisualizeCollaborators;
