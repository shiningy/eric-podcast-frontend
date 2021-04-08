/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcasts
// ====================================================

export interface searchPodcasts_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface searchPodcasts_searchPodcasts_podcasts_creator {
  __typename: "User";
  identity: string | null;
}

export interface searchPodcasts_searchPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface searchPodcasts_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: searchPodcasts_searchPodcasts_podcasts_category | null;
  coverImg: string | null;
  description: string;
  rating: number;
  creator: searchPodcasts_searchPodcasts_podcasts_creator;
  episodes: searchPodcasts_searchPodcasts_podcasts_episodes[] | null;
}

export interface searchPodcasts_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: searchPodcasts_searchPodcasts_podcasts[] | null;
}

export interface searchPodcasts {
  searchPodcasts: searchPodcasts_searchPodcasts;
}

export interface searchPodcastsVariables {
  input: SearchPodcastsInput;
}
