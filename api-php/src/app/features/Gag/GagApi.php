<?php
namespace Dunedin\Gag;

class GagApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Gag());
		$this->service = new GagControl();
	}

}
