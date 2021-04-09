/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: subscribers
// ====================================================

export interface subscribers_subscribers_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface subscribers_subscribers {
  __typename: "SubscribersOutput";
  ok: boolean;
  error: string | null;
  subscribers: subscribers_subscribers_subscribers[] | null;
}

export interface subscribers {
  subscribers: subscribers_subscribers;
}

export interface subscribersVariables {
  input: PodcastInput;
}
