<?

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();

?>

<div class="card">
	<div class="card-header">
		Search
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-9">
				<?
				$elements->Input("text", "q", "Search:");
				?>
			</div>
			<div class="col-3">
				<?
				$elements->Button("Search", "search()", ["w-100", "btn-success"]);
				?>
			</div>
		</div>
	</div>
</div>
