import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";

const { updateState }: any = recoilPersist();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <RecoilRoot initializeState={updateState}>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
