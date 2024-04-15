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
			'origin'=> "twitter",
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

	function Clippings($file) {
		$fileName = __DIR__."/docs/".$file;
		$content = file_get_contents($fileName);
		$data = json_decode($content, true);
		return $data;
	}

	function MapTweet($tw) {
		$author = "paulovelho";
		$tweet = $tw['full_text'];
		if(substr($tweet, 0, 4) == "RT @") {
			preg_match('/RT @[^\s]+:/', $tweet, $author_str);
			$author = substr($author_str[0], 4, -1);
		}
		$location = "http://twitter.com/".$author."/status/".$tw["id"];
		$date = strtotime($tw["created_at"]);

		echo "<pre>";
		echo "=================================  ";
		echo $tweet." - from @".$author;
		echo "\n date: ".date("Y-m-d h:i:s", $date);
		echo "\n location: twitter.com/".$author."/status/".$tw["id"];
		echo "</pre>";

		insertGag($tweet, "@".$author, $location, $date);

	}




//	$content = Clippings("twitter/tweet.js");
	foreach ($content as $clipping) {
		MapTweet($clipping);
//		insertGag($clipping["full_text"],)
//		insertGag($clipping["content"], $clipping["author"], $clipping["location"]);
	}

	echo "twitter loading";


?>
