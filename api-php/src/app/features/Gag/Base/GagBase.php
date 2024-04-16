<?php
## FILE GENERATED BY MAGRATHEA.
## This file was automatically generated and changes can be overwritten through the admin
## -- date of creation: [2024-04-16 03:59:08]

namespace Dunedin\Gag\Base;

use Magrathea2\iMagratheaModel;
use Magrathea2\MagratheaModel;

class GagBase extends MagratheaModel implements iMagratheaModel {

	public $id, $content, $author, $location, $hash, $origin, $date, $used_in;
	public $created_at, $updated_at;
	protected $autoload = null;

	public function __construct(  $id=0  ){ 
		$this->MagratheaStart();
		if( !empty($id) ){
			$pk = $this->dbPk;
			$this->$pk = $id;
			$this->GetById($id);
		}
	}
	public function MagratheaStart(){
		$this->dbTable = "gags";
		$this->dbPk = "id";
		$this->dbValues["id"] = "int";
		$this->dbValues["content"] = "text";
		$this->dbValues["author"] = "string";
		$this->dbValues["location"] = "string";
		$this->dbValues["hash"] = "string";
		$this->dbValues["origin"] = "string";
		$this->dbValues["date"] = "datetime";
		$this->dbValues["used_in"] = "string";
		$this->dbValues["created_at"] =  "datetime";
		$this->dbValues["updated_at"] =  "datetime";


	}

	public function GetControl() {
		return new \Dunedin\Gag\Base\GagControlBase();
	}

	// >>> relations:

}