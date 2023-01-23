import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "semantic-ui-react";

const SemanticUiModal = ({
  open,
  setOpen,
  content,
  className,
  title,
  onOpen,
  onClose,
  action,
  onClickPositiveAction,
  btnPositiveDisabled,
}) => {
  const dispatch = useDispatch();
  const dispatchControlModal = (modalState) => {
    dispatch(setOpen(modalState));
  };

  const onClickPositive = () => {
    onClickPositiveAction();
    dispatchControlModal(false);
  };

  const onOpenModal = () => {
    onOpen();
    dispatchControlModal(true);
  };

  const onCloseModal = () => {
    onClose();
    dispatchControlModal(false);
  };
  return (
    <Modal
      onClose={() => onCloseModal()}
      onOpen={() => onOpenModal()}
      open={open}
      className={className}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      {action ? (
        <>
          <Modal.Actions>
            <Button onClick={(e) => onCloseModal()} negative>
              Cancelar
            </Button>
            <Button
              onClick={(e) => onClickPositive()}
              disabled={btnPositiveDisabled}
              positive
            >
              Salvar
            </Button>
          </Modal.Actions>
        </>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default SemanticUiModal;
