import { render, RenderResult, wait, waitFor } from "../../../test-utils";
import React from "react";
import { Episodes, GET_EPISODES_QUERY } from "../episodes";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { getEpisodes, getEpisodesVariables } from "../../../__type_graphql__/getEpisodes";

describe("<Episodes />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  // beforeEach(async () => {
  //   await waitFor(() => {
  //     mockedClient = createMockClient();
  //     renderResult = render(
  //       <ApolloProvider client={mockedClient}>
  //         <Episodes />
  //       </ApolloProvider>
  //     );
  //   });
  // });
  it("should renders OK", async () => {
    const mockedQueryResponse = jest.fn().mockResolvedValue({
      data: {
        getEpisodes: {
          ok: true,
          error: "query-error",
          episodes: [],
        },
      },
    });

    await waitFor(() => {
      mockedClient = createMockClient();
      mockedClient.setRequestHandler(GET_EPISODES_QUERY, mockedQueryResponse);
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Episodes />
        </ApolloProvider>
      );
    });
    await wait();
    await waitFor(() => {
      expect(document.title).toBe("Episode List | Nuber-podcasts");
    });
  });
  it("renders OK with props", async () => {
    const podcastProps = {
      __typename: "Podcast",
      id: "1",
      title: "name",
      coverImg: "lala",
      category: "category",
    };

    const mockedQueryResponse = jest.fn().mockResolvedValue({
      loading: false,
      data: {
        getPodcast: {
          ok: true,
          error: "query-error",
          podcasts: [podcastProps],
        },
      },
    });

    await waitFor(() => {
      mockedClient = createMockClient();
      mockedClient.setRequestHandler(GET_EPISODES_QUERY, mockedQueryResponse);
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Episodes />
        </ApolloProvider>
      );
    })
    await wait(1000);
    await waitFor(async () => {});
    const { getByText } = renderResult;
    expect(mockedQueryResponse).toBeCalledTimes(1);
    getByText("Loading...");

  });
});
