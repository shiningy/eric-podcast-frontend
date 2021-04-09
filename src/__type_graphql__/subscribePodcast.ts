/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: subscribePodcast
// ====================================================

export interface subscribePodcast_subscribePodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface subscribePodcast_subscribePodcast {
  __typename: "Episode";
  title: string;
  description: string;
  podcast: subscribePodcast_subscribePodcast_podcast | null;
}

export interface subscribePodcast {
  subscribePodcast: subscribePodcast_subscribePodcast;
}
