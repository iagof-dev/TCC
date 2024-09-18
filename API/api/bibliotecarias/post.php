<?php
$com = "";
$message = "";

switch ($action) {
    case 'criar':
        $com = "INSERT INTO bibliotecarias (";
        $values = "";
        foreach ($_POST as $key => $value) {
            $com .= $key . ",";
            $values .= "'" . $value . "',";
        }
        $com = rtrim($com, ',') . ") VALUES (";
        $values = rtrim($values, ',') . ");";
        $com .= $values;
        break;

    default:
        echo(json_encode(["status" => "error", "message" => "função não definida."]));
        break;
}

echo((new DB())->insert($com));
