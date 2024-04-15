<?php

require "../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->AppPath(realpath(dirname(__FILE__)))
		->AddCodeFolder(__DIR__."/api/Authentication")
		->Load();
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
