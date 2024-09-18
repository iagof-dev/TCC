<?php
$com = "SELECT lo.id, al.rm AS aluno_rm, al.nome AS aluno_nome, al.telefone AS aluno_telefone, lv.id AS livro_id, lv.titulo AS livro_titulo, at.id AS autor_id, at.nome AS autor_nome, lo.data_aluguel, av.id AS avaliacao_id, lo.prazo, SL.estado, lo.renovacao AS renovavel, av.avaliacao 
        FROM emprestimos AS lo 
        LEFT JOIN livros AS lv ON lo.id_livro = lv.id 
        LEFT JOIN alunos AS al ON lo.rm = al.rm 
        LEFT JOIN estado_emprestimos AS SL ON SL.id = lo.id_status_emprestimo 
        LEFT JOIN autores AS at ON lv.id_autor = at.id 
        LEFT JOIN (SELECT * FROM avaliacoes WHERE id IN (SELECT MAX(id) FROM avaliacoes GROUP BY id_emprestimo)) AS av ON av.id_emprestimo = lo.id ";


switch ($action) {
    case 'listar':
        switch($param){
            case 'id':
            case 'rm':
                $com .= " WHERE al.rm = $param2";
                break;
            case 'livro':
                $com .= " WHERE lo.id_livro = $param2";
                break;
            case 'status':
                $com .= " WHERE lo.id_status_emprestimo = $param2";
                break;    
            default:
                $com .= " ORDER BY CASE WHEN lo.id_status_emprestimo IN (1, 2) THEN 0 ELSE 1 END, lo.data_aluguel DESC, lo.id DESC";
                break;
        }
        break;
}

$com .= ";";


echo((new DB())->query($com));