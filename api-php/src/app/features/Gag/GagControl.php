<?php
namespace Dunedin\Gag;

use Magrathea2\ConfigApp;
use Magrathea2\DB\Query;

class GagControl extends \Dunedin\Gag\Base\GagControlBase {

	public $itemsPerPage = 10;
	public function __construct() {
		$this->Initialize();
	}
	public function Initialize() {
		$this->itemsPerPage = ConfigApp::Instance()->GetInt("items_per_page", 20);
	}

	public function GetQuery($search) {
		$query = Query::Select()
			->Table("gags");
		$query->Where('content LIKE "%'.$search.'%" OR author LIKE "%'.$search.'%"');
		return $query;
	}

	public function IsHashThere($hash) {
		$query = Query::Select("COUNT(1) as ok")
			->Table("gags")
			->Where([ "gag_hash" => $hash ]);
		$rs = $this->QueryOne($query->SQL());
		return ($rs == 1);
	}

	public function Clean(string $q): string {
		return Query::Clean($q);
	}

	public function Search(string $q, int $page=0) {
		$search = $this->Clean($q);
		$query = $this->GetQuery($q);
		$total = 0;
		$rs = $this->RunPagination($query, $total, $page, $this->itemsPerPage);
		return [
			"query" => $q,
			"search" => $search,
			"total" => $total,
			"data" => $rs
		];
	}

	public function GetByAuthor($author, $page=0) {
		$search = $this->Clean($author);
		$query = Query::Select()
			->Table("gags")
			->Where(["author" => $search]);
		$rs = $this->RunPagination($query, $total, $page, $this->itemsPerPage);
		return [
			"query" => $author,
			"search" => $search,
			"total" => $total,
			"data" => $rs
		];
	}

}
