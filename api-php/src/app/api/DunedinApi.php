<?php

namespace Dunedin;

use Dunedin\Authentication\AuthApi;
use Dunedin\Gag\GagApi;
use Magrathea2\Config;
use Magrathea2\MagratheaApi;

class DunedinApi extends MagratheaApi {

	public $authApi = null;
	const OPEN = false;
	const LOGGED = "IsLogged";
	const ADMIN = "IsAdmin"; //

	
	public function __construct() {
		$this->Initialize();
	}
	public function Initialize() {
		\Magrathea2\MagratheaPHP::Instance()->StartDb();
		$this->AllowAll();
		$this->AddAcceptHeaders([
			"Authorization",
			"Access-Control-Allow-Origin",
			"cache-control",
			"x-requested-with",
			"content-type",
		]);
		$this->SetUrl();
		$this->SetAuth();
		$this->AddGags();
	}

	private function SetUrl() {
		$url = Config::Instance()->Get("app_url");
		$this->SetAddress($url);
	}

	private function SetAuth() {
		$authApi = new AuthApi();
		$this->BaseAuthorization($authApi, self::LOGGED);
		$this->Add("GET", "token", $authApi, "GetTokenInfo", self::LOGGED);
		$this->Add("POST", "login", $authApi, "Login", self::OPEN);
	}

	public function AddGags() {
		$gagApi = new GagApi();
		$this->Add("GET", "all", $gagApi, "GetAll", self::LOGGED);
		$this->Add("POST", "search", $gagApi, "Search", self::LOGGED);
		$this->Add("GET", "search", $gagApi, "Search", self::LOGGED);
		$this->Add("POST", "author", $gagApi, "Author", self::LOGGED);
		$this->Add("GET", "author", $gagApi, "Author", self::LOGGED);
	}


}
