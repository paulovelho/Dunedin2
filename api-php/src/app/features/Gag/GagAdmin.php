<?php
namespace Dunedin\Gag;

class GagAdmin extends \Magrathea2\Admin\Features\CrudObject\AdminCrudObject {
	public string $featureName = "Gag CRUD";

	public function Initialize() {
		$this->SetObject(new Gag());
	}
}
