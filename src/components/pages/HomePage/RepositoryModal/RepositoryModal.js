import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Modal } from "semantic-ui-react";
import { backModalText, frontModalText } from "./constants";
import "./RepositoryModal.css";

const RepositoryModal = ({ open, setOpen }) => {
  const { type } = useSelector((state) => state.homePage.repositoryModal);
  const dispatch = useDispatch();
  const dispatchControlModal = (modalState) => {
    dispatch(setOpen(modalState));
  };
  return (
    <Modal
      onClose={() => dispatchControlModal(false)}
      onOpen={() => dispatchControlModal(true)}
      open={open}
      className="modal"
    >
      <Modal.Header>Acessar o repositório</Modal.Header>
      <Modal.Content>
        <div className="text-modal-container">
          {type === 0 ? (
            <>
              {frontModalText}
              <div className="link-container">
                <a href="https://github.com/lpmelo/desafio-vegas-front">
                  Repositório Front End
                </a>
              </div>
            </>
          ) : (
            <>
              {backModalText}
              <div className="link-container">
                <a href="https://github.com/lpmelo/desafio-vegas-back">
                  Repositório Back End
                </a>
              </div>
            </>
          )}
        </div>
        <div className="modal-image-container">
          <Image src="/images/github.jpg" className="github-image" centered />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default RepositoryModal;
