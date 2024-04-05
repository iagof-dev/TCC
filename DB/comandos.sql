-- INSERTS DE EXEMPLOS PARA TESTE DA API --
-- 100% ATUALIZADO, É RUIM DE ATURAR, VIROU MODA E TODO MUNDO QUER TESTAR --
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
    al.id_curso = c.id;

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

INSERT INTO
    generos
values
    (DEFAULT, '');

-- LIVROS
SELECT
    *
FROM
    livros;

SELECT
    *
FROM
    livros
WHERE
    id = 1;

SELECT
    *
FROM
    livros
WHERE
    codigo = '1001';

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
    lo.id_aluno = al.rm
    and lo.id_livro = lv.id;

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
    lo.id_aluno = al.rm
    and lo.id_livro = lv.id
    and lo.id = 1;

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
    lo.id_aluno = al.rm
    and lo.id_livro = lv.id
    and lo.id_aluno = 221059;

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
    lo.id_aluno = al.rm
    and lo.id_livro = lv.id
    and lv.id = 3;

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
    lo.id_aluno = al.rm
    and lo.id_livro = lv.id
    and lv.codigo = 1003;

-- AVALIAÇÃO
SELECT
    COUNT(avalicoes) as avaliadores,
    SUM(avalicoes) as nota
FROM
    avalicoes
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
    *
FROM
    notificacoes
WHERE
    id_emprestimo = 1;

INSERT INTO
    notificacoes
VALUES
    (
        DEFAULT,
        id_aluno,
        id_emprestimo,
        data_atual,
        iteracao
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
