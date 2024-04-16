<?php

//die;

require "../vendor/autoload.php";
use Magrathea2\Debugger;

Debugger::Instance()->SetDev();

Magrathea2\MagratheaPHP::Instance()
	->AppPath(realpath(dirname(__FILE__)))
	->Dev()
	->Load();
Magrathea2\Bootstrap\Start::Instance()->Load();
