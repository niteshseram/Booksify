import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RouteChangeTracker from "./components/RouteChangeTracker";

ReactGA.initialize(process.env.TRACKING_ID);
<RouteChangeTracker />;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
