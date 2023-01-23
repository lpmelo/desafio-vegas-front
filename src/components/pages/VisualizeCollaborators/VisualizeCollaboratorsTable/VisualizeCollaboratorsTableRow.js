import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import IconAngleDown from "../../../icons/IconAngleDown";
import IconAngleUp from "../../../icons/IconAngleUp";
import SemanticUiTable from "../../../../lib/elementComponents/SemanticUiTable/SemanticUiTable";
import { registerTableHeadCells } from "../constants";
import RegisterTableRow from "../RegisterTable/RegisterTableRow";
import IconPensil from "../../../icons/IconPensil";
import IconTrashAlternate from "../../../icons/IconTrashAlternate";
import { deleteCollaborator } from "../../../../Api";
import { setIsLoading } from "../features/visualizeCollaboratorsSlice";
import { useDispatch } from "react-redux";
import "./VisualizeCollaboratorsTableRow.css";

const VisualizeCollaboratorsTableRow = ({ props }) => {
  const dispatch = useDispatch();

  const [buttonsActive, setButtonsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const handleClick = (event) => {
    setActiveIndex(!activeIndex);
  };

  const deleteCollaboratorWork = async (id) => {
    setButtonsActive(true);
    await deleteCollaborator(id);
    dispatch(setIsLoading(true));
  };

  const handleOpenEditModal = (event) => {};

  const handleOpenWarningModal = (event, id) => {
    deleteCollaboratorWork(id);
  };

  return (
    <>
      <Table.Row>
        <Table.Cell textAlign="center" width={1}>
          <div className="collapse-container" onClick={(e) => handleClick(e)}>
            {activeIndex ? <IconAngleUp /> : <IconAngleDown />}
          </div>
        </Table.Cell>
        <Table.Cell width={4}>{props.clientName}</Table.Cell>
        <Table.Cell width={2}>{props.city}</Table.Cell>
        <Table.Cell width={1} textAlign="center">
          {props.uf}
        </Table.Cell>
        <Table.Cell width={3} textAlign="center">
          {props.occupation}
        </Table.Cell>
        <Table.Cell textAlign="right" width={3}>
          {props.admissionDate}
        </Table.Cell>
        <Table.Cell
          textAlign="center"
          width={3}
          className="action-icons-cell"
          disabled={buttonsActive}
        >
          <div className="action-icons" onClick={(e) => handleOpenEditModal(e)}>
            <IconPensil />
          </div>
          <div
            className="action-icons"
            onClick={(e) => handleOpenWarningModal(e, props.id)}
          >
            <IconTrashAlternate />
          </div>
        </Table.Cell>
      </Table.Row>
      {activeIndex && (
        <Table.Row className="sub-row">
          <Table.Cell colSpan={7}>
            <SemanticUiTable
              headCells={registerTableHeadCells}
              SemanticUiTableRow={RegisterTableRow}
              data={props}
              subTable
            />
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};

export default VisualizeCollaboratorsTableRow;
