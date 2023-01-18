import "./App.css";
import { Menu, Segment } from "semantic-ui-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  switchToHome,
  switchToRegisterDelivery,
  switchToTableDelivery,
} from "./features/pageSwitcher/pageSwitcherSlice";
import HomePage from "./components/pages/HomePage/HomePage";
import RegisterCollaborator from "./components/pages/RegisterCollaborator/RegisterCollaborator";
import VisualizeDeliveries from "./components/pages/VisualizeDeliveries/VisualizeDeliveries";
import IconBox from "./components/icons/IconBox";
import IconEye from "./components/icons/IconEye";
import IconHome from "./components/icons/IconHome";

const App = () => {
  const [activeItem, setActiveItem] = useState("home");
  const pageElementSwitcher = useSelector((state) => state.pageSwitcher.item);
  const dispatch = useDispatch();
  const returnPageContent = (pageElementNumber) => {
    const index = {
      0: <HomePage />,
      1: <RegisterCollaborator />,
      2: <VisualizeDeliveries />,
    };

    const formattedIndex = index[pageElementNumber];
    return formattedIndex;
  };

  const handleItemClick = (e, { name }) => {
    name === "home"
      ? dispatch(switchToHome())
      : name === "Cadastro de entregas"
      ? dispatch(switchToRegisterDelivery())
      : dispatch(switchToTableDelivery());

    setActiveItem(name);
  };

  return (
    <div className="App">
      <div className="header-container">
        <Segment inverted className="menu-container">
          <Menu
            vertical
            inverted
            pointing
            secondary
            size="small"
            className="menu"
          >
            <Menu.Item
              name="home"
              icon={<IconHome className="menu-icon" />}
              className="menu-item"
              active={activeItem === "home"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Cadastro de Colaborador"
              icon={<IconBox className="menu-icon" />}
              className="menu-item"
              active={activeItem === "Cadastro de Colaborador"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Visualizar entregas"
              icon={<IconEye className="menu-icon" />}
              className="menu-item"
              active={activeItem === "Visualizar entregas"}
              onClick={handleItemClick}
            />
          </Menu>
        </Segment>
      </div>
      <div className="content-container">
        {returnPageContent(pageElementSwitcher)}
      </div>
      <div className="footer-container"></div>
    </div>
  );
};

export default App;
