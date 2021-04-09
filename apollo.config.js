module.exports = {
	client: {
		includes: ["./src/**/*.{tsx,ts}"],
		tagName: "gql",
		service: {
			name: "nuber-podcasts-backend",
			url: "https://eric-podcast-backend.herokuapp.com/graphql",
		},
	},
};
