<?php

$com = "";
$message = "";

switch ($action) {
    case 'inserir':
        $com = "INSERT INTO generos_livros (";
        $values = "";
        foreach ($_POST as $key => $value) {
            $com .= $key . ",";
            $values .= "'" . $value . "',";
        }
        $com = rtrim($com, ',') . ") VALUES (";
        $values = rtrim($values, ',') . ");";
        $com .= $values;
        break;
    case 'remover':
        if(!isset($_POST['id_livro']) or !isset($_POST['id_genero'])){
            echo(json_encode(['status' => 'error', 'message' => 'Parametros necessários está faltando.']));
        }
        $com = "DELETE FROM generos_livros WHERE id_livro=". $_POST['id_livro'] . " AND id_genero=" . $_POST['id_genero'] . ';';
        break;
}

echo((new DB())->insert($com));
