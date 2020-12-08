import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import history from "./history";
import MainLayout from "./layouts";
import "antd/dist/antd.css";
import globalDataReducer from "../reducer";

const DigiMallContext = React.createContext();

export const App = () => {
  const globalData = {
    apiData: {},
    cartData: {},
  };

  const [globalDataState, dispatch] = React.useReducer(
    globalDataReducer,
    globalData
  );

  return (
    <DigiMallContext.Provider value={{ globalData: globalDataState, dispatch }}>
      <>
        <Router history={history}>
          <MainLayout />
        </Router>
      </>
    </DigiMallContext.Provider>
  );
};

export default DigiMallContext;
