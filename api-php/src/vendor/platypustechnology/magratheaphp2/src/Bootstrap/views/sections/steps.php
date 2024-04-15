<?php

/* ADAPTED FROM https://codepen.io/erwinquita/pen/ZWzVRE */
function getClass($step) {
	global $stepActive;
	if ($step == $stepActive) return "current";
	if ($step < $stepActive) return "is-done";
}

function linkStepTo($step) {
	return \Magrathea2\Bootstrap\Start::Instance()->GetStepLink($step);
}

?>

<div class="wrapper">
	<ul class="StepProgress">
		<?php $s = 1; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Structure</a>
			<ul>
				<li>Checking the structure</li>
			</ul>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Configuration File</a>
			<ul>
				<li>Creating the file</li>
				<li>Writing the environments</li>
				<li>Filling up the basic configurations</li>
			</ul>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Logs / Debugging</a>
			<ul>
				<li>Log location</li>
				<li>Debug modes</li>
			</ul>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Database Connection</a>
			<ul>
				<li>Test Connection</li>
				<li>View Tables</li>
			</ul>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Database management</a>
			<ul>
				<li>Run queries</li>
				<li>Create tables from models</li>
			</ul>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Basic Code Generation</a>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Install Magrathea Admin</a>
		</li>
		<?php $s++; ?>
		<li class="StepProgress-item <?=getClass($s)?>">
			<a href="<?=linkStepTo($s)?>">Start Develop!</a>
		</li>
	</ul>
</div>