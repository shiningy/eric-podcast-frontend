import { render, waitFor } from "../../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ALLPODCASTS_QUERY, Podcasts } from "../podcasts";
import "@testing-library/jest-dom/extend-expect";

describe("<Podcasts />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Podcasts />
        </ApolloProvider>
      );
    });
  });
  it("should renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Home | Nuber-podcasts");
    });
  });
  it("renders OK with props", async () => {
    const podcastProps = {
      id: "1",
      title: "name",
      coverImg: "lala",
      category: "category",
    };
    const mockedQueryResponse = jest.fn().mockResolvedValue({
      data: {
        getAllPodcasts: {
          ok: true,
          error: "query-error",
          podcasts: [podcastProps],
        },
      },
    });
    mockedClient.setRequestHandler(ALLPODCASTS_QUERY, mockedQueryResponse);
    const { getByText, container } = render(
        <ApolloProvider client={mockedClient}>
          <Podcasts />
        </ApolloProvider>
      );
    await waitFor(async () => {})
    expect(mockedQueryResponse).toBeCalledTimes(1);

  });
});
