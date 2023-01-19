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
  const [activeItem, setActiveItem] = useState(0);
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

  const handleItemClick = (e, { index }) => {
    index === 0
      ? dispatch(switchToHome())
      : index === 1
      ? dispatch(switchToRegisterDelivery())
      : dispatch(switchToTableDelivery());

    setActiveItem(index);
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
              name="Pagina Inicial"
              index={0}
              icon={<IconHome className="menu-icon" />}
              className="menu-item"
              active={activeItem === 0}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Cadastro de Colaborador"
              index={1}
              icon={<IconBox className="menu-icon" />}
              className="menu-item-submit"
              active={activeItem === 1}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Visualizar entregas"
              index={2}
              icon={<IconEye className="menu-icon" />}
              className="menu-item"
              active={activeItem === 2}
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
