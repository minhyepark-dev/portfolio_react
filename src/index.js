import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { Persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="/portfolio_react">
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
