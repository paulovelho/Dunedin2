function search() {
	const q = $("#q").val();
	console.info("searching for ", q);
	callFeature("SearchAdmin", "Search", "POST", {q})
		.then(rs => showOn("#search-query-rs", rs));
}
