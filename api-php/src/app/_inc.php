<?php

require "../vendor/autoload.php";
error_reporting(E_ALL ^ E_DEPRECATED);

try {
	Magrathea2\MagratheaPHP::Instance()
		->MinVersion("2.0")
		->AppPath(realpath(dirname(__FILE__)))
		->AddCodeFolder(__DIR__."/api/Authentication")
		->AddCodeFolder(
			"api",
			"api/Authentication",
			"admin",
			"admin/importer",
			"admin/search",
		)
		->AddFeature("Gag")
		->Load();
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
