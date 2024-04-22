----------------------------------------------------------------------------
-- INSERTS DE EXEMPLOS PARA TESTE DA API --
-- 100% ATUALIZADO, É RUIM DE ATURAR, VIROU MODA E TODO MUNDO QUER TESTAR --
----------------------------------------------------------------------------

-- ALUNOS
SELECT
    al.rm,
    al.nome,
    al.telefone,
    c.ano,
    c.curso,
    c.periodo
FROM
    alunos as al
    INNER JOIN cursos as c
WHERE
    al.rm = c.id;

SELECT
    al.rm,
    al.nome,
    al.telefone,
    c.ano,
    c.curso,
    c.periodo
FROM
    alunos as al
    INNER JOIN cursos as c
WHERE
    al.id_curso = c.id
    and al.rm = '221021';

SELECT
    al.rm,
    al.nome,
    al.telefone,
    c.ano,
    c.curso,
    c.periodo
FROM
    alunos as al
    INNER JOIN cursos as c
WHERE
    al.id_curso = c.id
    and al.telefone = '149999999';

-- GENEROS
SELECT
    *
FROM
    generos;

-- LIVROS
SELECT
    l.id,
    l.codigo,
    l.titulo,
    a.autor,
    e.editora,
    g.genero
FROM
    livros as l
    inner join autores as a
    inner join editoras as e
    inner join livro_generos as lg
    inner join generos as g
WHERE
    l.id_autor = a.id
    and l.id_editora = e.id
    and lg.id_genero = g.id
    and lg.id_livro = l.id;

SELECT
    l.id,
    l.codigo,
    l.titulo,
    a.autor,
    e.editora,
    g.genero
FROM
    livros as l
    inner join autores as a
    inner join editoras as e
    inner join livro_generos as lg
    inner join generos as g
where
    l.id_autor = a.id
    and l.id_editora = e.id
    and lg.id_genero = g.id
    and lg.id_livro = l.id
    and lg.id_genero = '2';

SELECT
    l.id,
    l.codigo,
    l.titulo,
    a.autor,
    e.editora,
    g.genero
FROM
    livros as l
    inner join autores as a
    inner join editoras as e
    inner join livro_generos as lg
    inner join generos as g
where
    l.id_autor = a.id
    and l.id_editora = e.id
    and lg.id_genero = g.id
    and lg.id_livro = l.id
    and lg.codigo = '2';

UPDATE livros
SET
    titulo = 'Teste'
WHERE
    id = 1;

UPDATE livros
SET
    titulo = 'Teste'
WHERE
    codigo = '1213712';

DELETE FROM livros
WHERE
    id = 1;

DELETE FROM livros
WHERE
    codigo = '';

-- EMPRESTIMOS
SELECT
    lo.id,
    al.rm,
    lv.titulo,
    lo.data_aluguel,
    lo.data_devolucao,
    lo.status_livro
FROM
    emprestimos as lo
    INNER JOIN livros as lv
    INNER JOIN alunos as al
WHERE 
	lo.id_livro = lv.id
    AND lo.rm_aluno = al.rm;

SELECT
    lo.id,
    al.rm,
    lv.titulo,
    lo.data_aluguel,
    lo.data_devolucao,
    lo.status_livro
FROM
    emprestimos as lo
    INNER JOIN livros as lv
    INNER JOIN alunos as al
WHERE 
	lo.id_livro = lv.id
    AND lo.id_aluno = al.rm
    AND al.rm = 2210002;

SELECT
    lo.id,
    al.rm,
    lv.titulo,
    lo.data_aluguel,
    lo.data_devolucao,
    lo.status_livro
FROM
    emprestimos as lo
    INNER JOIN livros as lv
    INNER JOIN alunos as al
WHERE 
	lo.id_livro = lv.id
    AND lo.id_aluno = al.rm
    AND lo.id_livro = 2;

SELECT
    lo.id,
    al.rm,
    lv.titulo,
    lo.data_aluguel,
    lo.data_devolucao,
    lo.status_livro
FROM
    emprestimos as lo
    INNER JOIN livros as lv
    INNER JOIN alunos as al
WHERE 
	lo.id_livro = lv.id
    AND lo.rm_aluno = al.rm
    AND lo.status_livro = "PENDENTE";

-- AVALIAÇÃO
SELECT
    COUNT(avaliacao) as avaliadores,
    SUM(avaliacao) as nota
FROM
    avaliacoes
WHERE
    id_livro = 1;

INSERT INTO
    avalicoes
VALUES
    (DEFAULT, 'ID_LIVRO', '1-5', 'id_usuario');

UPDATE avalicoes
SET
    avalicao = 1
WHERE
    id_aluno = "1";

-- Notificação
SELECT
    n.id,
    n.data_envio,
    al.telefone,
    n.iteracao
FROM
    notificacoes as n
    INNER JOIN alunos as al
    INNER JOIN emprestimos as e
WHERE
    n.id_aluno = al.rm
    AND n.id_emprestimo = e.id;

INSERT INTO
    notificacoes
VALUES
    (
        DEFAULT,
        'id_aluno',
        'id_emprestimo',
        'data_atual',
        'iteracao'
    );

-- COORDENADORES
SELECT
    cor.*,
    cur.curso AS Curso,
    cur.periodo AS Periodo
FROM
    Coordenadores AS cor
    INNER JOIN curso_coordenadores AS cur_cor
    INNER JOIN cursos AS cur
WHERE
    id_coordenador = cor.id
    AND cur_cor.id_curso = cur.id;


-- LIVROS GENEROS

select li.id, li.codigo, li.titulo, li.capa,li.volumes, li.sinopse, g.genero from livro_generos as lg
		INNER JOIN livros as li
        INNER JOIN generos as g
        INNER JOIN autores as a
        INNER JOIN editoras as e
        WHERE lg.id_livro = li.id
        AND lg.id_genero = g.id
        AND li.id_autor = a.id
        AND li.id_editora = e.id;
