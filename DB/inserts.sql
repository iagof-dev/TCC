-- ======================================================================== --
--                   INSERTS DE EXEMPLOS PARA TESTE DA API                  --
-- 100% ATUALIZADO, É RUIM DE ATURAR, VIROU MODA E TODO MUNDO QUER TESTAR   --
-- ======================================================================== --

INSERT INTO alunos values (221001, 'Iago Fragnan', 3, '1499299'), (221020, 'Alexsandro Rodrighero', 6, '1439999'), (221021, 'Rodolfo', 7, '149999999');

insert into cursos values 
(default, 1, 'Desenvolvimento de Sistemas', 'Integral'),
(default, 2, 'Desenvolvimento de Sistemas', 'Integral'),
(default, 3, 'Desenvolvimento de Sistemas', 'Integral'),
(default, 1, 'Mecatronica', 'Integral'),
(default, 2, 'Mecatronica', 'Integral'),
(default, 3, 'Mecatronica', 'Integral'),
(default, 1, 'Administração', 'Integral'),
(default, 2, 'Administração', 'Integral')
;

INSERT INTO generos (genero) VALUES
('Ficção Científica'),
('Fantasia'),
('Romance'),
('Terror'),
('Mistério'),
('História'),
('Biografia'),
('Autoajuda'),
('Desenvolvimento Pessoal'),
('Educação'),
('Saúde'),
('Culinária'),
('Viagem'),
('Tecnologia'),
('Negócios e Economia');


INSERT INTO livro_generos (id_livro, id_genero) VALUES
(1, 2), -- 'As Crônicas de Nárnia' é Fantasia
(2, 1), -- 'Fundação' é Ficção Científica
(3, 3), -- 'Orgulho e Preconceito' é Romance
(4, 4), -- 'Drácula' é Terror
(5, 2); -- 'O Nome do Vento' é Fantasia


INSERT INTO livros (codigo, titulo, autor, capa, volumes, sinopse) VALUES
(1001, 'As Crônicas de Nárnia', 'C.S. Lewis', 'S', 7, 'Uma série de sete romances de fantasia.'),
(1002, 'Fundação', 'Isaac Asimov', 'N', 3, 'Uma série de ficção científica sobre o declínio e queda de um império galáctico.'),
(1003, 'Orgulho e Preconceito', 'Jane Austen', 'N', 1, 'Um romance sobre maneiras, casamento e moral na Inglaterra do século XIX.'),
(1004, 'Drácula', 'Bram Stoker', 'S', 1, 'A história original do famoso vampiro Conde Drácula.'),
(1005, 'O Nome do Vento', 'Patrick Rothfuss', 'S', 2, 'A vida de um aventureiro e músico chamado Kvothe.');


INSERT INTO emprestimos (id_aluno, id_livro, data_aluguel, data_devolucao, status_livro) VALUES
(101, 1, '2023-09-01', '2023-09-15', 'a devolver'), -- Aluno 101 tem 'As Crônicas de Nárnia' para devolver
(102, 2, '2023-09-05', '2023-09-19', 'devolvido'), -- Aluno 102 já devolveu 'Fundação'
(103, 3, '2023-10-01', '2023-10-15', 'pendente'), -- Aluno 103 acabou de pegar 'Orgulho e Preconceito', ainda não está na data de devolver
(104, 4, '2023-08-12', '2023-08-26', 'devolvido'), -- Aluno 104 já devolveu 'Drácula'
(105, 5, '2023-09-15', '2023-09-29', 'a devolver'); -- Aluno 105 tem 'O Nome do Vento' para devolver


INSERT INTO avaliacao (id_livro, avaliacao) VALUES
(1, 4.5), -- 'As Crônicas de Nárnia' recebe uma avaliação de 4.5
(2, 4.7), -- 'Fundação' recebe uma avaliação de 4.7
(3, 4.8), -- 'Orgulho e Preconceito' recebe uma avaliação de 4.8
(4, 4.4), -- 'Drácula' recebe uma avaliação de 4.4
(5, 4.9); -- 'O Nome do Vento' recebe uma avaliação de 4.9
