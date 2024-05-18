<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();

$elements->Header("Search Debugger");

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<? include(__DIR__."/search-box.php"); ?>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col-12" id="search-query-rs">
		</div>
	</div>
</div>
