<?php
$com = "SELECT * FROM autores;";
$rs = "";


if($action != 'listar'){

    echo(json_encode(['status' => 'error', 'message' => 'Parametro não encontrado.']));
    die();
}

echo((new db())->query($com));