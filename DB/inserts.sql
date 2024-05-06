-- INSERTS DE EXEMPLOS PARA TESTE DA API --
-- 100% ATUALIZADO, É RUIM DE ATURAR, VIROU MODA E TODO MUNDO QUER TESTAR --

INSERT INTO cursos (ano, curso, periodo) VALUES
(2023, 'Desenvolvimento de Sistemas', 'Matutino'),
(2023, 'Informatica', 'Vespertino'),
(2023, 'Enfermagem', 'Noturno'),
(2023, 'Mecatronica', 'Integral'),
(2023, 'Eletronica', 'Matutino'),
(2023, 'Administração', 'Vespertino'),
(2023, 'Edificações', 'Noturno');


INSERT INTO alunos (rm, nome, id_curso, telefone) VALUES
(2210001, 'João Silva', 1, '12345678901'),
(2210002, 'Maria Santos', 2, '23456789012'),
(2210003, 'Carlos Pereira', 3, '34567890123');

INSERT INTO bibliotecarias (nome) VALUES
('Ana Beatriz'),
('Laura Neves');

INSERT INTO editoras (editora) VALUES
('Editora Alpha'),
('Editora Beta');

INSERT INTO autores (autor) VALUES
('Carlos Drummond'),
('Clarice Lispector');

INSERT INTO livros (codigo, titulo, id_autor, id_editora, capa, volumes, sinopse) VALUES
('L001', 'Aprendendo SQL', 1, 1, 'Capa dura', 1, 'Um guia completo para aprender SQL do zero.'),
('L002', 'Dados Avançados', 2, 2, 'Capa mole', 2, 'Exploração avançada de bancos de dados.');

INSERT INTO generos (genero) VALUES
('Educação'),
('Tecnologia');

INSERT INTO livros_generos (id_livro, id_genero) VALUES
(1, 1),
(2, 2);


INSERT INTO emprestimos (rm_aluno, id_bibliotecaria, id_livro, data_aluguel, data_devolucao, status_livro, prazo) VALUES
(1, 1, 1, '2023-04-01', '2023-04-15', 'PENDENTE', 14),
(2, 2, 2, '2023-04-05', '2023-04-19', 'DEVOLVIDO', 14);

INSERT INTO notificacoes (id_aluno, id_emprestimo, data_envio, iteracao) VALUES
(1, 1, '2023-04-16', 1);

INSERT INTO coordenadores (nome, telefone) VALUES
('Roberto Carlos', '1122334455');

INSERT INTO curso_coordenadores (id_curso, id_coordenador) VALUES
(1, 1);

INSERT INTO avaliacoes (id_livro, id_aluno, avaliacao) VALUES
(1, 1, 4.5);

