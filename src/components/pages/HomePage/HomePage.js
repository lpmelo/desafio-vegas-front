import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, GridColumn, Image, Segment } from "semantic-ui-react";
import ElementCard from "../../../lib/elementComponents/ElementCard/ElementCard";
import {
  welcomeFrontMessage,
  welcomeBackMessage,
  frontendModalMessage,
  backendModalMessage,
} from "./constants";
import { changeModalType, controlModal } from "./features/HomePageSlice";
import "./HomePage.css";
import RepositoryModal from "./RepositoryModal/RepositoryModal";

const HomePage = () => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((state) => state.homePage.repositoryModal);
  const returnMessageContent = () => {
    return (
      <>
        <div>{welcomeFrontMessage}</div>
        <div style={{ marginTop: "10px" }}>{welcomeBackMessage}</div>
      </>
    );
  };

  const handleOpenModal = (cardNumber) => {
    dispatch(changeModalType(cardNumber));
    dispatch(controlModal(true));
  };

  return (
    <>
      <Segment className="card-container">
        <Grid stackable columns={2}>
          <Grid.Row columns={1}>
            <GridColumn textAlign="left">
              <Container fluid>
                <ElementCard
                  image={
                    <Image
                      src="/images/marketing-vegas.jpg"
                      className="marketing-image"
                    />
                  }
                  title={"Desafio Vegas - Desenvolvedor Fullstack"}
                  content={returnMessageContent()}
                />
                <div className="modal-cards-container">
                  <div
                    className="modal-card-div"
                    onClick={(e) => handleOpenModal(0)}
                  >
                    <ElementCard
                      image={
                        <Image
                          src="/images/reactjs.jpeg"
                          className="marketing-image"
                        />
                      }
                      title={"Front End"}
                      content={frontendModalMessage}
                    />
                  </div>
                  <div
                    className="modal-card-div"
                    onClick={() => handleOpenModal(1)}
                  >
                    <ElementCard
                      image={
                        <Image
                          src="/images/php.jpg"
                          className="marketing-image"
                        />
                      }
                      title={"Back End"}
                      content={backendModalMessage}
                    />
                  </div>
                </div>
                <Container className="image-container">
                  <Image
                    src="/images/logo-entrada.png"
                    centered
                    className="logo-image"
                  />
                </Container>
              </Container>
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Segment>
      <RepositoryModal open={open} setOpen={controlModal} />
    </>
  );
};

export default HomePage;
