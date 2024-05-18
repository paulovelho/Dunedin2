<?php

namespace Dunedin;

use GagImporter;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;

class ImporterAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Importer";
	public string $featureId = "ImporterAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/views/scripts.js");
		$this->AddCSS(__DIR__."/views/styles.css");
	}

	public function Index() {
		include('views/index.php');
	}

	public function Import() {
		$file = $_POST["file"];
		if(empty($file)) {
			die("incorrect file ".$file);
		}
		$service = new GagImporter();
		$rs = $service->ImportKindle($file);
		array_map(function($g) {
			echo $g;
			echo "====";
		}, $rs);
	}


}
