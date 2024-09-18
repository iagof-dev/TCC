<?php
$com = "SELECT al.rm, al.nome, al.telefone, c.id as id_curso, c.ano, c.curso, c.periodo FROM alunos as al LEFT JOIN cursos as c ON al.id_curso = c.id";

switch ($action) {
    default:
        $com .= ";";
        break;
    case 'rm':
        $com .= " WHERE al.rm='$param';";
        break;
    case 'telefone':
        $com .= " AND al.telefone ='$param';";
        break;
}

echo((new DB())->query($com));