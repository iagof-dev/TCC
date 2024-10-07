<?php

$com = "";
$message = "";

switch ($action) {
    case 'inserir':

        if($_POST['id_genero'] == 0 || $_POST['id_livro'] == 0 || !isset($_POST['id_livro']) || !isset($_POST['id_genero'])){
            echo(json_encode(['status' => 'error', 'message' => 'Valor enviado inválido ou não correspondente']));
            die();
        }

        //SELECT * FROM generos_livros WHERE id_livro=32 AND id_genero=3;
        $verification = "SELECT * FROM generos_livros WHERE id_livro=" . $_POST['id_livro'] . ' AND id_genero=' .  $_POST['id_genero'] . ';';

        $result = json_decode((new DB())->query($verification));
        if($result->status == 'success'){
            echo(json_encode(['status' => 'error', 'message' => 'Genero já está atribuido a este livro.']));
            die();
        }


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
