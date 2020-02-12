import React from "react";
import { Provider } from "react-redux";

import Nav from "./components/Nav";
import LandingPage from "./pages/landing-page/LandingPage";

import store from "./store";

const style = {
  backgroundColor: "#f7f7f7",
  width: "100vw",
  height: "100vh"
};

function App() {
  return (
    <Provider store={store}>
      <Nav />
      <LandingPage />
    </Provider>
  );
}

export default App;
