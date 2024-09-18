<?php
$com = "";
$rs = "";

switch ($action) {
    case 'listar':
        $com = "select * from cursos;";
        break;
}

echo((new DB())->query($com));
