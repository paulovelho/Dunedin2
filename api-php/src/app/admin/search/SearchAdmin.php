<?php

namespace Dunedin;

use Dunedin\Gag\GagControl;
use GagImporter;
use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;

class SearchAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Search";
	public string $featureId = "SearchAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/views/scripts.js");
		$this->AddCSS(__DIR__."/views/styles.css");
	}

	public function Index() {
		include('views/index.php');
	}

	public function Search() {
		$q = $_POST["q"];
		if(empty($q)) {
			AdminElements::Instance()->Alert("Query is empty", "danger");
		}
		$gagControl = new GagControl();
		$search = $gagControl->Clean($q);
		$query = $gagControl->GetQuery($search);
		$sql = $query->SQL();
		include('views/query-box.php');
		$rs = $gagControl->Run($query);
		include('views/gag-rs.php');
		include('views/search-rs.php');
	}

}
