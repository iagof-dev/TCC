<?php

$com = "";
$message = "";

switch ($action) {
    case 'criar':
        $com = "INSERT INTO coordenador_cursos (";
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
