<?php
$com = "";
$rs = "";

switch ($action) {
    default:
        $com = "SELECT * FROM generos;";
        break;
}
echo((new DB())->query($com));
