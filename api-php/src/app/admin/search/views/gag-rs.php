<div class="card" id="import-result-card">
	<div class="card-header">
		Raw Result
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-12">
				<?
				foreach($rs as $i=>$gag) {
					echo $i;
					?>
					<pre class="code-light"><?=$gag?></pre>
					<?
				}
				?>
			</div>
		</div>
	</div>
</div>

