<?php

include("_inc.php");
include("admin/DunedinAdmin.php");

use Magrathea2\Admin\AdminManager;

try {
	AdminManager::Instance()->Start(new Dunedin\DunedinAdmin());
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
