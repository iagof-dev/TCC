<?php


if ($api == 'imagens' && $method == 'GET') {
    include_once("get.php");
}
if ($api == 'imagens' && $method == 'POST') {
	echo (json_encode(["status" => "error", "message" => "Método apenas GET"]));
	die();
}
