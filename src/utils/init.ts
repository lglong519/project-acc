if (!localStorage.getItem("gitData")) {
	localStorage.setItem(
		"gitData",
		JSON.stringify({
			entryDate: 0,
			repos: [],
			commits: {
				total: 0,
				today: 0,
				week: [0, 0, 0, 0, 0, 0, 0],
				list: {},
			},
		})
	);
}
