<?php
class Image
{
	public $name;
	public $size;
	public $type;
	public $url;
	public $thumb;
	public $width; 
	public $height;
    /**
     * @var int тип файла определенный gd:
     * 1 - gif
     * 2 - jpg
     * 3 - png
     */
	public $gtype; 
	public $attr;
	public $thumbSize = 300;
	public $extentions = array('n/a','gif','jpg','png',);

    /**
     * @param array $data массив с данными  о загруженном изображении
     */
	function __construct($data)
	{
		$this->name = $data['name'][0];
		$this->size = $data['size'][0];
		$this->type = $data['name'][0];
		$this->url = $data['tmp_name'][0];
		list($this->width, $this->height, $this->gtype, $this->attr) = getimagesize($this->url);
	}

    /**
     * @return string расширение файла
     */
	public function getExtention()
	{
		return ".".$this->extentions[$this->gtype];
	}

    /**
     * @param string $prefix префкс для имени превьшки
     */
	public function makeThumb($prefix =""){
		if($this->gtype == 1)
			$src = imagecreatefromgif($this->url);
		elseif($this->gtype == 2)
			$src = imagecreatefromjpeg($this->url);
		elseif($this->gtype == 3)
			$src = imagecreatefrompng($this->url);

		$w_src = imagesx($src);
		$h_src = imagesy($src);
        $ratio = $w_src/$this->thumbSize;
        $w_dest = round($w_src/$ratio);
        $h_dest = round($h_src/$ratio);
        $dest = imagecreatetruecolor($w_dest,$h_dest);
        $white = imagecolorallocate($dest, 255, 255, 255);
        imagefill($dest,1,1,$white);
        imagecopyresampled($dest, $src, 0, 0, 0, 0, $w_dest, $h_dest, $w_src, $h_src); 
		$pref = ($prefix)?$prefix."_":"";
		$tumb = $pref.$this->name;
		switch ($this->gtype)
		{
			case 1: imagegif($dest, 'tumbs/'.$tumb); break;
			case 2: imagejpeg($dest, 'tumbs/'.$tumb, 80); break;
			case 3: imagepng($dest, 'tumbs/'.$tumb); break;
		}
		$this->thumb = $tumb;
	}

    /**
     * Получение пропорций изображения
     *
     * @return float
     */
	public function getFormat(){
		list($width, $height, $type, $attr) = getimagesize($this->url);
		$proporsion = ($width > $height)?$width/$height:$height/$width;
		return round($proporsion, 2);
		
	}
}
