<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();

$elements->Header("Gag Importer");

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<? include(__DIR__."/file-selector.php"); ?>
		</div>
	</div>

	<div class="row">
		<div class="col-12">
			<? include(__DIR__."/import-rs.php"); ?>
		</div>
	</div>
</div>
