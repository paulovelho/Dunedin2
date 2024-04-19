<?php
namespace Dunedin\Gag;

use Magrathea2\Exceptions\MagratheaApiException;

class GagApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Gag());
		$this->service = new GagControl();
	}

	public function GetAll($params) {
		$rs = $this->service->GetAll();
		return $rs;
	}

	public function Search($params) {
		$post = $this->GetPost();
		$query = @$post["q"] ?? @$_REQUEST["q"];
		if(empty($query)) {
			throw new MagratheaApiException("Query is empty");
		}
		$page = @$_REQUEST["page"] ?? 0;
		return $this->service->Search($query, $page);
	}

	public function Author($params) {
		$post = $this->GetPost();
		$query = @$post["author"] ?? @$_REQUEST["author"];
		if(empty($query)) {
			throw new MagratheaApiException("Author is empty");
		}
		$page = @$_REQUEST["page"] ?? 0;
		return $this->service->GetByAuthor($query, $page);
	}

}
