<?php
$com = "";
$rs = "";

switch ($action) {
    default:
    case 'listar':
        $com = "SELECT coo.id AS coordenador_id, coo.nome AS nome, coo.telefone, cu.id AS id_curso, cu.ano, cu.curso, cu.periodo FROM coordenadores AS coo LEFT JOIN coordenador_cursos AS cou ON cou.id_coordenador = coo.id LEFT JOIN cursos AS cu ON cu.id = cou.id_curso;";
        break;
}

echo((new DB())->query($com));
