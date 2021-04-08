/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  description: string;
  podcastId: number;
  categoryName: string;
}

export interface CreatePodcastInput {
  title: string;
  coverImg?: string | null;
  description: string;
  categoryName: string;
}

export interface CreateReviewInput {
  title: string;
  text: string;
  podcastId: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  identity?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastInput {
  podcastId: number;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  query: string;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  title?: string | null;
  category?: string | null;
  description?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  description?: string | null;
  rating?: number | null;
  categoryName?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
