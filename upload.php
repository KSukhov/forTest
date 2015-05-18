<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('CLASS_DIR', 'class/');
set_include_path(get_include_path().PATH_SEPARATOR.CLASS_DIR);
spl_autoload_register();

$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);

if($action == 'init'){
	$app = new App();
	print $app->getNewOrder();
}
if($action == 'delete'){
	$order = filter_input(INPUT_GET, 'order', FILTER_SANITIZE_NUMBER_INT);
	$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
	$name = str_replace("/","",$name)
	$uploader = new ImageStore($order);
	print $uploader->deleteItem($name);
}

if($action == 'add'){
	$order = filter_input(INPUT_GET, 'order', FILTER_SANITIZE_NUMBER_INT);
	$uploader = new ImageStore($order);
	$uploader->uploadFile(new Image($_FILES["files"]));
	print $uploader->getFileInfo();
}

if($action == 'save'){
	$args = array(
    'order'   => FILTER_VALIDATE_INT,
    'format'     => FILTER_SANITIZE_STRING,
    'quantity' => FILTER_VALIDATE_INT,
    'paper_type' => FILTER_VALIDATE_INT,
	'autocor' => FILTER_VALIDATE_INT,
	'brims' => FILTER_VALIDATE_INT,
	'cost' => FILTER_VALIDATE_INT,
	'numberOfFiles' => FILTER_VALIDATE_INT,
	'phone'     => FILTER_SANITIZE_STRING
);
	$data = filter_input_array(INPUT_POST, $args);
	App::saveOrder($data);	
}