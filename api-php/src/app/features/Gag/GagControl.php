<?php
namespace Dunedin\Gag;

use Magrathea2\DB\Query;

class GagControl extends \Dunedin\Gag\Base\GagControlBase {

	public $itemsPerPage = 20;

	public function IsHashThere($hash) {
		$query = Query::Select("COUNT(1) as ok")
			->Table("gags")
			->Where([ "gag_hash" => $hash ]);
		$rs = $this->QueryOne($query->SQL());
		return ($rs == 1);
	}

	public function Search($q, $page=0) {
		$search = Query::Clean($q);
		$query = Query::Select()
			->Table("gags");
		$query->Where('content LIKE "%'.$search.'%" OR author LIKE "%'.$search.'%"');
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
		$search = Query::Clean($author);
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
