<?php
$com = "SELECT * FROM editoras;";
$rs = "";


if($action != 'listar'){

    echo(json_encode(['status' => 'error', 'message' => 'Parametro não encontrado.']));
    die();
}

echo((new DB())->query($com));
