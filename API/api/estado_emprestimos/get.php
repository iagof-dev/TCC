<?php
$com = "SELECT * FROM estado_emprestimos";
$rs = "";

switch ($action) {
	case 'listar':
    default:
        $com .= ";";
        break;
}

$rs = $db->prepare($com);

echo((new DB())->query($com));
