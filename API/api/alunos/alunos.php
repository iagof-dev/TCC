<?php


if ($api == 'alunos' && $method == 'GET') {
    include_once("get.php");
}
if ($api == 'alunos' && $method == 'POST') {
    if(!(new cliente())->checkPermission())
    {
        echo(json_encode(["status" => "error", "message" => "Sem permissão!"]));
        die();
		http_response_code(401);
    }
    if (empty($_POST)) {
        echo (json_encode(["status" => "error", "message" => "Nenhum argumento foi passado"]));
        die();
		http_response_code(400);
    }
    include_once("post.php");
}
