/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subscriptionsQuery
// ====================================================

export interface subscriptionsQuery_subscriptions_category {
  __typename: "Category";
  name: string;
}

export interface subscriptionsQuery_subscriptions {
  __typename: "Podcast";
  title: string;
  description: string;
  category: subscriptionsQuery_subscriptions_category | null;
  rating: number;
  id: number;
  coverImg: string | null;
}

export interface subscriptionsQuery {
  subscriptions: subscriptionsQuery_subscriptions[];
}
