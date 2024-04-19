<?php

include("_inc.php");

use Dunedin\DunedinApi;
use Magrathea2\Debugger;
Debugger::Instance()
	->SetType(Debugger::LOG)
	->LogQueries(true);

$api = new DunedinApi();

if(@$_GET["debug"] == "true") {
	$api->Debug();
	die;
}
$api->Run();

