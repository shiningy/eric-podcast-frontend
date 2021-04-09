import React from 'react'
import ReactDOM, { render } from "react-dom";

import App from "./components/App";
import { ApolloProvider } from "@apollo/client";
import "./styles/styles.css";
import { client } from "./apollo";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);