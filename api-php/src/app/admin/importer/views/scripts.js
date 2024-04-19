function importFile(el, fileName) {
	console.info("importing ", fileName);
	loadingImporter(true);
	$("#file-name").html(fileName);
	$("#import-result-card").slideDown("slow");
	executeImport(fileName);
}

function executeImport(fileName) {
	callFeature("ImporterAdmin", "Import", "POST", { file: fileName })
		.then(rs => importDone(rs));
}

function importDone(rs) {
	console.info("import rs: ", rs);
	$("#import-rs-pre").html(rs);
	loadingImporter(false);
}

function loadingImporter(show) {
	console.info("loading: ", show);
	if(show) {
		$(".btn-import").attr("disabled", "disabled");
		$("#import-loading").show();
	} else {
		$(".btn-import").attr("disabled", null);
		$("#import-loading").hide();
	}
}
