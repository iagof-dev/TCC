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
}

echo((new DB())->insert($com));
