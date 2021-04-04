import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { ME_QUERY } from "../../hooks/useMe";
import { render, RenderResult, wait, waitFor } from "../../test-utils";
import { LoggedInRouter } from "../logged-in-router";
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

describe("<LoggedInRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedInRouter />
        </ApolloProvider>
      );
    });
  });

  it("should render", async () => {
    const { getByText, container } = renderResult;
    await waitFor(() => {});
    getByText("Loading...");
    const mockedQueryResponse = jest.fn().mockResolvedValue({
      data: {
        me: {
          ok: true,
        },
      },
    });
    mockedClient.setRequestHandler(ME_QUERY, mockedQueryResponse);
    await wait();
    await waitFor(() => {});
    expect(container.firstChild).toHaveClass(
      "h-screen flex justify-center items-center"
    );
  });
});
