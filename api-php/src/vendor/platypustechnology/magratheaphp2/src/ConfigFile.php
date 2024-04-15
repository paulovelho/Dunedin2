<?php

namespace Magrathea2;
use Magrathea2\Exceptions\MagratheaConfigException;

/**
* Magrathea Config loads and saves information in config files.
* 
*/
class ConfigFile { 
	private $path = __DIR__;
	private $configFileName = "magrathea.conf";
	private $configs = null;

	public function __construct(){
		$this->configs = null;
	}

	/**
	*	Set the path to the confi file
	*	@param 	string 	$p 		Path to be set
	*	@return 	ConfigFile
	*/
	public function SetPath($p){
		$this->path = rtrim($p, '/').'/';
		return $this;
	}
	/**
	 * gets config file path
	 * @return string 		full path
	 */
	public function GetPath(): string {

		return $this->path.$this->configFileName;
	}
	/**
	*	Sets the config information
	*	@param 	array 	$c 		Config to be set
	*	@return 	ConfigFile
	*/
	public function SetConfig($c){
		$this->configs = $c;
		return $this;
	}
	/**
	*	Sets the name of the config file
	*	@param 	string 	$filePath 	Name of the config file
	*	@return 	ConfigFile
	*/
	public function SetFile($filePath){
		$this->configFileName = $filePath;
		return $this;
	}
	/**
	*	Loads the configuration file
	*/
	private function LoadFile(){
		if(!file_exists($this->GetPath())){
			throw new MagratheaConfigException("Config file could not be found - ".$this->GetPath());
		}
	}
	/**
	*	Creates the configuration file if it doesn't exists. And saves it.
	*	@return 	boolean	 	True if the file exists; Return of `Save()` function if it doesn't
	*/
	public function CreateFileIfNotExists(){
		$file = $this->GetPath();
		if(!file_exists($file)){
			return file_put_contents($file, '') === false;
		} else return true;
	}
	/**
	*	Gets configuration
	*	@param 	string 	$config_name 	Configuration to be got. If empty, returns all the configuration into the file
	*									If an acceptable config name, returns its value
	*	@return 	string|int|array	If `$config_name` is empty, returns all the configuration. Otherwise, 
	*   @todo 	exception 704 on key does not exists
	*/
	public function GetConfig($config_name="") {
		if( is_null($this->configs) ){
			$this->loadFile();
			$this->configs = @parse_ini_file($this->GetPath(), true);
		}
		if( empty($config_name) ){
			return $this->configs;
		} else {
			$c_split = explode("/", $config_name);
			return ( count($c_split) == 1 ? $this->configs[$config_name] : $this->configs[$c_split[0]][$c_split[1]] );
		}
	}
	/**
	*	Gets a full config section
	*
	*	@param 	string 	$section_name 	Name of the section to be shown
	*
	*	@return 	array	 	All the values of the given section
	*   @todo 	exception 704 on key does not exists
	*/
	public function GetConfigSection($section_name){
		$this->loadFile();
		$configSection = @parse_ini_file($this->GetPath(), true);
		if( empty($configSection ) ) return null;
		if( !$configSection ){
			throw new MagratheaConfigException("There was an error trying to load the config file. No section [".$configSection."]<br/>");
		}
		return $configSection[$section_name];
	}

	/**
	*	Sets the correct format for the value
	*	@param 		any 		$value to be saved
	*	@return 	string 		formatted value to be saved on config file
	*/
	private function SaveValueOnConfig($value) {
		if (in_array($value, array("true", "1", "yes"), true)) return "true";
		if (in_array($value, array("false", "0", "no"), true)) return "false";
		return "\"".$value."\"";
	}

	/**
	*	Saves the config file
	*	@param 		boolean 	$save_sections 		A flag indicating if the sections should be saved also.
	*												Default: `true`
	*	@return 	boolean	 	True if the saved succesfully. False if got any error in the process
	*/
	public function Save($save_sections=true) { 
		$content = "// generated by Magrathea at ".@date("Y-m-d h:i:s")."\n";
		$data = $this->configs;
		if( $data == null ) $data = array();
		if ($save_sections) { 
			foreach ($data as $key=>$elem) { 
				$content .= "\n[".$key."]\n"; 
				if(!is_array($elem)){
					throw new MagratheaConfigException("Hey, you! If you are gonna save a config file with sections, all the configs must be inside one section...", 1);
					
				}
				foreach ($elem as $key2=>$elem2) { 
					if(is_array($elem2)) { 
						for($i=0;$i<count($elem2);$i++) { 
							$content .= "\t".$key2."[] = ".$this->SaveValueOnConfig($elem2[$i])."\n";
						} 
					} else if($elem2=="") $content .= "\t".$key2." = \n";
					else $content .= "\t".$key2." = ".$this->SaveValueOnConfig($elem2)."\n";
				}
			}
		} else {
			foreach ($data as $key=>$elem) { 
				if(is_array($elem)) { 
					for($i=0;$i<count($elem);$i++) { 
						$content .= $key."[] = ".$this->SaveValueOnConfig($elem[$i])."\n";
					}
				} else if($elem=="") $content .= $key." = \n";
				else $content .= $key." = ".$this->SaveValueOnConfig($elem)."\n";
			} 
		} 
		if(!is_writable($this->path)){
			throw new MagratheaConfigException("Permission denied on path: ".$this->path);
		}
		$file = $this->GetPath();
		if(file_exists($file)){
			@unlink($file);
		}
		if (!$handle = fopen($file, 'w')) { 
			throw new MagratheaConfigException("Oh noes! Could not open File: ".$file);
		} 
		if (!fwrite($handle, $content)) { 
			throw new MagratheaConfigException("Oh noes! Could not save File: ".$file);
		} 
		fclose($handle); 
		return true; 
	}	
}

?>