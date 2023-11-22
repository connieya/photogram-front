import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ChakraProvider } from "@chakra-ui/react";

const { updateState }: any = recoilPersist();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <RecoilRoot initializeState={updateState}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </BrowserRouter>
);
