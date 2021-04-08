/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewParts
// ====================================================

export interface ReviewParts_creator {
  __typename: "User";
  email: string;
}

export interface ReviewParts {
  __typename: "Review";
  id: number;
  creator: ReviewParts_creator;
  title: string;
  text: string;
}
