import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import ReactGA from "react-ga";
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RouteChangeTracker from "./components/RouteChangeTracker";

const initializeGA = async () => {
  const { data: trackingId } = await axios.get("api/ga");
  ReactGA.initialize(trackingId);
};

initializeGA();

<RouteChangeTracker />;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
