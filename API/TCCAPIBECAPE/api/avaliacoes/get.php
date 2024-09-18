<?php
$com = "";
$rs = "";


switch ($action) {
    case 'media':
        if($param == null){
            echo(json_encode(["status" => "error", "message" => "Informe o id do livro para consultar a média."]));
            return;
        }
        $com = ("SELECT COUNT(avaliacao) as avaliadores, AVG(avaliacao) as nota FROM avaliacoes WHERE id_livro = $param;");
        break;
    case 'listar':
    default:
        $com = ("SELECT av.id, al.nome,av.avaliacao FROM avaliacoes as av LEFT JOIN alunos as al ON al.rm =av.rm_aluno;");
        break;
}

echo((new DB())->query($com));
