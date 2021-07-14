import React from "react";
import Layout from "./layout";
import RoutesContext from "./routeContext";

const App = ({ children, routes }) => {
  const props = {
    children,
  };
  return (
    <>
      <RoutesContext.Provider value={routes}>
        <Layout {...props} />
      </RoutesContext.Provider>
    </>
  );
};

export default App
