<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\ConfigApp;
use Magrathea2\MagratheaHelper;

use function Magrathea2\p_r;

$elements = AdminElements::Instance();
$mediaFolder = ConfigApp::Instance()->Get("media_folder");

if(empty($mediaFolder)) {
	$elements->Alert("[media_folder] app config is empty", "danger");
	die;
}

$folder = realpath($mediaFolder);
if(!$folder || !is_dir($folder)) {
	$elements->Alert("media folder is a invalid path [".$mediaFolder."]", "danger");
	die;
}


function getFiles($directory) {
	$files = [];
	if (is_dir($directory)) {
		if ($handle = opendir($directory)) {
			while (($file = readdir($handle)) !== FALSE) {
				// Skip "." and ".."
				if ($file !== '.' && $file !== '..') {
					// Check if it's a file using is_file()
					if (is_file($directory . DIRECTORY_SEPARATOR . $file)) {
						$files[] = $file;
					}
				}
			}
			closedir($handle);
		}
	}
	return $files;
}

function getSize($size): string {
	if(empty($size)) return "-";
	$kb = $size / 1024;
	if($kb < 1024) return round($kb, 2, PHP_ROUND_HALF_UP)." KB";
	$mb = $kb / 1024;
	if($mb < 1024) return round($mb, 2, PHP_ROUND_HALF_UP)." MB";
	$gb = $mb / 1024;
	return round($gb, 2, PHP_ROUND_HALF_UP)." GB";
}


$files = getFiles($folder);

?>


<div class="card">
	<div class="card-header">
		Files (from <?=$mediaFolder?>)
	</div>
	<div class="card-body">
		<table class="table table-bordered import-files">
			<?php
			foreach($files as $f) {
				$filePath = MagratheaHelper::EnsureTrailingSlash($mediaFolder).$f;
				$size = filesize($filePath);
				?>
				<tr>
					<td><?=$f?></td>
					<td><?=getSize($size)?></td>
					<td>
						<?php
						$elements->Button(
							"import",
							"importFile(this, '".$f."')",
							["btn-primary", "mt-0", "btn-import"]
						);
						?>
					</td>
				</tr>
				<?
			}
			?>
		</table>
	</div>
</div>

