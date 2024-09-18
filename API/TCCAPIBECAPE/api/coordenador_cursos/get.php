<?php
$com = "";
$rs = "";

switch ($action) {
    default:
    case 'listar':
        $com = "select * from coordenador_cursos;";
        break;
}

echo((new DB())->query($com));
