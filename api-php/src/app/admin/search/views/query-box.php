<?

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
?>

<div class="card mb-2">
	<div class="card-header">
		SQL Query
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-12">
				<?
				$elements->Input("disabled", "query", "Query:", $search);
				?>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-12">
				<pre class="code-light"><?=$sql?></pre>
			</div>
		</div>
	</div>
</div>

