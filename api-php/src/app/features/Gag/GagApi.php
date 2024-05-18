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
		$page = @$_GET["page"] ?? 0;
		return $this->service->Search($query, $page);
	}

	public function Author($params) {
		$post = $this->GetPost();
		$query = @$post["author"] ?? @$_REQUEST["author"];
		if(empty($query)) {
			throw new MagratheaApiException("Author is empty");
		}
		$page = @$_GET["page"] ?? 0;
		return $this->service->GetByAuthor($query, $page);
	}

	public function Shared($params) {
		$q = $_GET["q"];
		$gags = explode(",", $q);
		$rs = [];
		foreach($gags as $g) {
			$pieces = explode('-', $g);
			$id = $pieces[0];
			$hash = @$pieces[1] ?? null;
			$gag = new Gag($id);
			if($hash == $gag->gag_hash) array_push($rs, $gag);
		}
		return $rs;
	}

}
