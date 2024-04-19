<?php
namespace Dunedin\Gag;

use DateTime;

class Gag extends \Dunedin\Gag\Base\GagBase {

	public function __construct($id=0){
		parent::__construct($id);
//		$this->AdjustDate();
	}

	private function AdjustDate() {
		if(!$this->highlight_date || empty($this->highlight_date)) return;
		$d = new DateTime($this->highlight_date);
		$this->highlight_date = $d->format('Y-m-d H:i:s');
	}

	public function StripEmojis(string $text): string {
		$text = iconv('UTF-8', 'ISO-8859-15//IGNORE', $text);
		$text = preg_replace('/\s+/', ' ', $text);
		return iconv('ISO-8859-15', 'UTF-8', $text);
		}

	public function ClearEmojis() {
		$this->content = $this->StripEmojis($this->content);
		return $this;
	}

	public function CreateHash() {
		if ($this->origin == "twitter") {
			$this->gag_hash = "tweet-".$this->location;
		} else {
			$this->gag_hash = md5($this->author."-".$this->location);
		}
		return $this;
	}

}
