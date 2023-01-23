import React from "react";
import { Table } from "semantic-ui-react";
import "./SemanticUiTable.css";

const SemanticUiTable = ({
  color,
  key,
  headCells,
  SemanticUiTableRow,
  data,
  subTable,
  tableClassName,
}) => {
  const returnHeadCellPosition = (position) => {
    const allPositions = {
      center: "center",
      left: "left",
      right: "right",
    };

    const headcellPosition = allPositions[position];

    return headcellPosition;
  };
  return (
    <Table color={color} key={key} className={tableClassName}>
      <Table.Header>
        <Table.Row>
          {headCells.map((headCell) => {
            return (
              <Table.HeaderCell
                className={returnHeadCellPosition(headCell.position)}
              >
                {headCell.name}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {subTable ? (
          data ? (
            <SemanticUiTableRow props={data} />
          ) : (
            <></>
          )
        ) : data.length ? (
          data.map((rowData) => {
            return <SemanticUiTableRow props={rowData} />;
          })
        ) : (
          <></>
        )}
      </Table.Body>
    </Table>
  );
};

export default SemanticUiTable;
