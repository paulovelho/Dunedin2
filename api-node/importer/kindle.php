<?php

	$host = "mongodb://localhost:27017/dunedin";
	$manager = new MongoDB\Driver\Manager($host);

	function insertGag($content, $author, $location, $date) {
		global $manager;
		$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);

		$insRec = new MongoDB\Driver\BulkWrite;
		$insRec->insert([
			'content' => $content, 
			'author'=> $author,
			'hash' => md5($content),
			'origin'=> "kindle",
			'location' => $location,
			'date' => $date,
		]);

		try {
			$result = $manager->executeBulkWrite('dunedin.Gags', $insRec, $writeConcern);
		} catch(Exception $ex) {
			echo "<br/><br/>ERROR =================== ";
			print_r($ex);
		}
	}

	function MapClipping($clip) {
		if(!$clip) return;
		$clipping = explode("\n\n", $clip);

		try {
			$origin = $clipping[0];
			$content = $clipping[1];

			$origin = explode("\n", $origin);
			$author = $origin[0];
			$locationArr = explode(" | ", $origin[1]);
			if(count($locationArr) == 3) {
				$location = $locationArr[0]." - ".$locationArr[1];
				$added = $locationArr[2];
			} else {
				$location = $locationArr[0];
				$added = $locationArr[1];
			}

			$added = ltrim($added, 'Added on ');
			$date = strtotime($added);

		} catch(Exception $ex) {

			if(count($clipping) == 0) {
				echo "INCORRECT CLIPPING: ".$clip."\n\n==================";
				return;
			}

		}

		return [
			'author' => $author,
			'location' => $location,
			'content' => $content,
			'added' => date("Y-m-d h:i:s", $date),
		];
	}

	function Clippings($file) {
		$fileName = __DIR__."/docs/".$file;
		$content = file_get_contents($fileName);
		$clips = explode("==========\n", $content);
		$clips = array_map('MapClipping', $clips);
		return $clips;
	}




	$content = Clippings("clippings.txt");
	foreach ($content as $clipping) {
//		insertGag($clipping["content"], $clipping["author"], $clipping["location"], $clipping["added"]);
	}
	echo "<pre>";
	print_r($content);
	echo "</pre>";

	echo "kindle loading";


?>
