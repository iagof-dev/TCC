<?php
$com = "";

switch ($action) {
    default:
    case 'listar':
        $com = "select nt.id, nt.rm_aluno, nt.data_envio, nt.iteracao, lo.data_aluguel, lo.data_devolucao, lo.prazo, li.codigo, li.titulo, al.nome as aluno_nome, al.telefone, lost.estado, cs.curso from notificacoes as nt LEFT JOIN emprestimos as lo LEFT JOIN livros as li LEFT JOIN alunos as al LEFT JOIN estado_emprestimos as lost LEFT JOIN cursos as cs WHERE nt.rm_aluno = al.rm AND nt.id_emprestimo = lo.id AND lo.id_livro = li.id AND al.id_curso = cs.id AND lo.id_status_livro = lost.id";
        if($param == 'numero'){
            $com .= ' AND al.telefone = ' . $param2 . ';';
        }
        if($param == 'rm'){
            $com .= ' AND al.rm = ' . $param2 . ';';
        }
        else{
            $com .= ';';
        }
        $rs = $db->prepare($com);
        break;
}

echo((new DB())->query($com));