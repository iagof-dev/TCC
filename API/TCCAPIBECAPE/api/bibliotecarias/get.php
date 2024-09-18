<?php
$com = "";

switch ($action) {
    default:
        $com = "SELECT * FROM bibliotecarias;";
        break;
}

echo((new DB())->query($com));