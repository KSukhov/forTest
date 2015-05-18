<?php
 class ImageStore{
	private $order;
	private $file;
	private $dir;
	private $base = 'uploads/';	
	private $extens = array();

     /**
      * @param int $order номер заказа
      */
	public function __construct($order)
	{
		if(!file_exists($this->base.$order)){
			mkdir($this->base.$order);
		}
		$this->order = $order; 
		$this->dir = $this->base.$order."/";
	}

     /**
      * Загрузка файла
      *
      * @param Image $file
      */
	public function uploadFile($file)
	{
		$this->file = $file;
		$this->file->name = $this->getFileName();
		$path = $this->dir.$this->file->name;
		copy($this->file->url, $path);	
		$this->fle->url=  $path;
	}

     /**
      * Генерирует униркальное я файла
      *
      * @return string имя файла
      */
	private function getFileName()
	{
		$name = substr(md5(microtime()), -12, 12); 
		return $name.$this->file->getExtention();
	}

     /**
      * Удааление фийла из заказа
      *
      * @param $name имя фийла
      * @return bool
      */
	public function deleteItem($name){
		return unlink($this->dir.$name);
	}

     /**
      * Возвращает информацию о загруженном изображении
      *
      * @return string информацию о изображении (json)
      */
	public function getFileInfo(){
		$this->file->makeThumb($this->order); 
		return '{"files":[{"name":"'.$this->file->name.'","format":"'.$this->file->getFormat().'","size":'.$this->file->size.',"type":"image\/jpeg","url":"'.$this->file->name.'","thumbnailUrl":"'.$this->file->thumb.'","deleteUrl":"'.$this->file->name.'","deleteType":"DELETE","order":"'.$this->order.'"}]}';
	} 
	
} 
