<?php


if ($api == 'cursos' && $method == 'GET') {
    include_once("get.php");
}
if ($api == 'cursos' && $method == 'POST') {
        echo(json_encode(["status" => "error", "message" => "neste parametro apenas existe metodo GET"]));
        die();
}
