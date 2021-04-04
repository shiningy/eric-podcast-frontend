import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from '@testing-library/react';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../header';

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider>
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    })
  });
})