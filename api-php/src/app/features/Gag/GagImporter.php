<?php

use Dunedin\Gag\Gag;
use Dunedin\Gag\GagControl;
use Magrathea2\ConfigApp;
use Magrathea2\MagratheaHelper;

include_once(__DIR__."/Base/GagBase.php");

class GagImporter {

	private $control;

	public function __construct() {
		$this->control = new GagControl();
	}

	private function cleanContent($content) {
		return preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $content);
	}

	private function parseKindleGag($content) {
		if($content==null) return;
		if(empty(trim($content))) return;
		$data = preg_split('/\r\n|\r|\n/', $content);

		if (empty($data[0])) {
			$data = array_splice($data, 1);
		}

		$gag = new Gag();
		try {
			$gag->author = $this->cleanContent($data[0]);
			$gag->origin = "kindle";
			$gag->content = $data[3];
	
			$loc = explode(' | Added on ', $data[1]);
			$location = substr($loc[0], 2);
			$gag->location = $location;
		
			$date = new DateTime($loc[1]);
			$gag->highlight_date = $date->format('Y-m-d H:i:s');
			// $gag->date = date('Y-m-d H:i:s', $loc[1]);
		
			$gag->CreateHash();
			if($this->control->IsHashThere($gag->gag_hash)) {
				return $gag;
			} else {
				$gag->Insert();
			}
		} catch(\Exception $ex) {
			echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-";
			echo "import error: ".$ex->getMessage();
			echo $content;
			echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-";
			throw $ex;
		}
		echo $gag;
		return $gag;
	}
	private function parseKindleFile($file) {
		$txtContent = file_get_contents($file);
		$highlights = explode('==========', $txtContent);

		$parsed = [];
		foreach ($highlights as $gagContent) {
			array_push($parsed, $this->parseKindleGag($gagContent));
		}
		return $parsed;
	}

	public function ImportKindle($fileName) {
		$mediaFolder = ConfigApp::Instance()->Get("media_folder");
		$filePath = MagratheaHelper::EnsureTrailingSlash($mediaFolder).$fileName;
		if($filePath == false) throw new Exception("File not found", 500);
		$parse = $this->parseKindleFile($filePath);

		return $parse;
	}



	private function parseTwitterGag($tweet) {
		// $gag = new Gag();
		// $gag->location = $tweet->id;
		// $gag->origin = "twitter";
		// $date = new DateTime($tweet->created_at);
		// $gag->date = $date->format('Y-m-d H:i:s');

		// $text = $tweet->full_text;
		// if ( substr( $text, 0, 4 ) === "RT @" ) {
		// 	$textData = explode(':', $text, 2);
		// 	$authorData = explode('@', $textData[0]);
		// 	$gag->author = $authorData[1];
		// 	$gag->content = $textData[1];
		// } else {
		// 	$gag->author = "@paulovelho";
		// 	$gag->content = $text;
		// }

		// $gag->CreateHash()->ClearEmojis();
		// $gag = $gag->Insert();

		// return $gag;
	}


	public function ImportTwitter($fileName) {
		$mediaFolder = ConfigApp::Instance()->Get("media_folder");
		$twitterFile = MagratheaHelper::EnsureTrailingSlash($mediaFolder).$fileName;
		$twitterContent = file_get_contents($twitterFile);
		$twitterData = json_decode($twitterContent);

		$parsed = [];
		foreach ($twitterData as $tweet) {
			array_push($parsed, $this->parseTwitterGag($tweet));
		}
		return $parsed;
	}


}

