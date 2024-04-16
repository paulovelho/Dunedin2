<?php

namespace Dunedin;

use Dunedin\Gag\GagAdmin;
use Magrathea2\Admin\Admin;
use Magrathea2\Tests\TestsManager;
use Magrathea2\Admin\AdminMenu;
use Magrathea2\Admin\Features\ApiExplorer\ApiExplorer;
use Magrathea2\Admin\Features\AppConfig\AdminFeatureAppConfig;

class DunedinAdmin extends Admin implements \Magrathea2\Admin\iAdmin {

	private $features = [];

	public function Initialize() {
		$this->SetTitle("Dunedin");
		$this->SetPrimaryColor("#33cc33");
		$this->SetLogo("images/Dunedin_City_flag.png");
		$this->AddTests();
	}

	public function Auth($user): bool {
		return !empty($user->id);
	}

	public function SetFeatures() {
		parent::SetFeatures();
		$this->AddAppConfiguration();
		// $this->LoadApi();
		$this->LoadFeatures();
	}

	public function LoadFeatures() {
		$this->features["gags"] = new GagAdmin();
		$this->AddFeaturesArray($this->features);
	}

	// public function LoadApi() {
	// 	$api = new MagratheaCloudApi();
	// 	$apiFeature = new ApiExplorer();
	// 	$apiFeature->SetApi($api);
	// 	$this->features["api"] = $apiFeature;
	// 	$this->AddFeature($apiFeature);
	// }

	public function AddAppConfiguration() {
		$appConfig = new AdminFeatureAppConfig(true);
		$appConfig->featureName = "Settings";
		$appConfig->featureId = "AppConfigAppOnly";
		$this->features["appconfig"] = $appConfig;
		$this->AddFeature($appConfig);
	}

	public function BuildMenu(): AdminMenu {
		$menu = new AdminMenu();
		$menu
		->Add($this->features["appconfig"]->GetMenuItem())

		// ->Add($menu->CreateTitle("Api"))
		// ->Add($this->features["api"]->GetMenuItem())

		->Add($menu->CreateTitle("Features"))
		->Add($this->features["gags"]->GetMenuItem())

		->Add($menu->CreateSpace())
		->Add($menu->CreateSpace())

		->Add($menu->CreateTitle("Magrathea"));
		$this->AddMagratheaMenu($menu);

		$menu->Add($menu->GetLogoutMenuItem());
		return $menu;
	}

}

