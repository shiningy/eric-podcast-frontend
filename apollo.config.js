module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nuber-podcasts-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://eric-podcast-backend.herokuapp.com/graphql"
          : "http://localhost:4000/graphql",
    },
  },
};
