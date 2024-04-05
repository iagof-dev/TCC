-- LISTA DE COMANDOS PARA IMPLEMENTAR NA API --
-- (NÃO FINALIZADO, NÃO TESTADO) --


-- ALUNOS

SELECT al.rm, al.nome, al.telefone, c.ano, c.curso, c.periodo FROM alunos as al
			INNER JOIN cursos as c
            where al.id_curso = c.id;
            
SELECT al.rm, al.nome, al.telefone, c.ano, c.curso, c.periodo FROM alunos as al
			INNER JOIN cursos as c
            where al.id_curso = c.id
            and al.rm = '221001';

SELECT al.rm, al.nome, al.telefone, c.ano, c.curso, c.periodo FROM alunos as al
			INNER JOIN cursos as c
				where al.id_curso = c.id
				and al.telefone = '1439999';

-- GENEROS
SELECT * FROM generos;

INSERT INTO generos values (default, '');

-- LIVROS
SELECT * FROM livros;

SELECT * FROM livros WHERE id=1;
 
SELECT * FROM livros WHERE codigo='1001';

UPDATE livros SET titulo='Teste' WHERE id=1;

UPDATE livros SET titulo='Teste' WHERE codigo='1213712';

DELETE FROM livros where id=1;

DELETE FROM livros where codigo='';

-- EMPRESTIMOS

SELECT lo.id, al.rm, lv.titulo, lo.data_aluguel, lo.data_devolucao, lo.status_livro FROM emprestimos as lo
		INNER JOIN livros as lv
        INNER JOIN alunos as al
        where lo.id_aluno = al.rm
        and lo.id_livro = lv.id;

SELECT lo.id, al.rm, lv.titulo, lo.data_aluguel, lo.data_devolucao, lo.status_livro FROM emprestimos as lo
		INNER JOIN livros as lv
        INNER JOIN alunos as al
        where lo.id_aluno = al.rm
        and lo.id_livro = lv.id
        and lo.id = 1;
        
SELECT lo.id, al.rm, lv.titulo, lo.data_aluguel, lo.data_devolucao, lo.status_livro FROM emprestimos as lo
		INNER JOIN livros as lv
        INNER JOIN alunos as al
        where lo.id_aluno = al.rm
        and lo.id_livro = lv.id
        and lo.id_aluno = 221001;

SELECT lo.id, al.rm, lv.titulo, lo.data_aluguel, lo.data_devolucao, lo.status_livro FROM emprestimos as lo
		INNER JOIN livros as lv
        INNER JOIN alunos as al
        where lo.id_aluno = al.rm
        and lo.id_livro = lv.id
        and lv.id = 3;

SELECT lo.id, al.rm, lv.titulo, lo.data_aluguel, lo.data_devolucao, lo.status_livro FROM emprestimos as lo
		INNER JOIN livros as lv
        INNER JOIN alunos as al
        where lo.id_aluno = al.rm
        and lo.id_livro = lv.id
        and lv.codigo = 1003;


-- AVALIAÇÃO





select * from cursos;
