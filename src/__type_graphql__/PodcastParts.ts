/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_category {
  __typename: "Category";
  name: string;
}

export interface PodcastParts_creator {
  __typename: "User";
  identity: string;
}

export interface PodcastParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastParts_category | null;
  coverImg: string | null;
  description: string | null;
  rating: number;
  creator: PodcastParts_creator;
  episodes: PodcastParts_episodes[] | null;
}
