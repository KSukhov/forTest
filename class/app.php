<?php
class App{
    /**
     * @var int номер заказа
     */
	public $order;
    /**
     * базовая папка загрузки
     */
	const BASE = 'uploads/';

    /**
     * Создание записи о заказе
     * @param array $data массирв с данными заказа
     */
	public static function saveOrder($data)
	{
		$report = "Заказ № ".$data['order']."\n";
		$report .= "Формат ".$data['format']."\n";
		$report .= "Количество ".$data['quantity']."\n";
		$report .= "Телефон ".$data['phone']."\n";
		$report .= "Бумага ";
		$report .= ($data['paper_type'] == 2)?"глянцевая\n":"матовая\n";
		$report .= "Автокоррекция ";
		$report .= ($data['autocor'] == 2)?"без автокоррекции\n":"с автокоррекцией\n";
		$report .= ($data['brims'] == 0)?"с подрезкой\n":"с полями\n";
		$report .= "Стоимость ".$data['cost']."\n";
		$report .= "Общее количество ".$data['numberOfFiles']."\n";
		file_put_contents (self::BASE.$data['order']."/text.txt",$report);
	}

    /**
     * Создание нового заказа
     * Содается пака с именем номера заказа
     *
     * @return int номер заказа
     */
	public function getNewOrder()
	{
		$order = max(scandir(self::BASE));
		$order = (int)$order+1;
		$this->order = $order;
		mkdir(self::BASE.$order);
		return $order;
	}
}