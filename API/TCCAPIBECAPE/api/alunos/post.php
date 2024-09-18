<?php

$com = "";

switch ($action) {
    case 'criar':
        $com = "INSERT INTO alunos (";
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

echo((new db())->insert($com));
