import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render, RenderResult, waitFor } from "../../test-utils";
import { LoggedOutRouter } from "../logged-out-router";

describe("<LoggedOutRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedOutRouter />
        </ApolloProvider>
      );
    });
  });

  it("should render", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Log In | Nuber-podcasts")
    );
  });
});
