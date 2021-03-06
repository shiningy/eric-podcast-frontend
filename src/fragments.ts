import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    category {
      name
    }
    coverImg
    description
    rating
    creator {
      identity
    }
    episodes {
      id
      title
      description
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    podcastCount
    podcasts {
      title
    }
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    title
    description
    category
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewParts on Review {
    id
    creator {
      email
    }
    title
    text
  }
`;