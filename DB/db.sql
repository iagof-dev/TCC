CREATE DATABASE IF NOT EXISTS sgbe;

USE sgbe;

CREATE TABLE
    IF NOT EXISTS alunos (
        rm INT (6) PRIMARY KEY AUTO_INCREMENT,
        nome mediumTEXT NOT NULL,
        id_curso INT NOT NULL,
        telefone char(12) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS cursos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        ano INT NOT NULL,
        curso TINYTEXT NOT NULL,
        periodo TINYTEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS bibliotecarias (id INT AUTO_INCREMENT PRIMARY KEY, nome TINYTEXT);

CREATE TABLE
    IF NOT EXISTS livros (
        id INT PRIMARY KEY AUTO_INCREMENT,
        codigo INT (32) NOT NULL unique,
        titulo mediumTEXT NOT NULL,
        autor mediumTEXT NOT NULL,
        capa VARCHAR(1),
        volumes INT NOT NULL,
        sinopse TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS generos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        genero VARCHAR(120) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS livro_generos (
        id_livro INT NOT NULL REFERENCES livros (id),
        id_genero INT NOT NULL REFERENCES generos (id)
    );

CREATE TABLE
    IF NOT EXISTS emprestimos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_aluno INT NOT NULL REFERENCES alunos (rm),
        id_livro INT NOT NULL REFERENCES livros (id),
        data_aluguel DATE NOT NULL,
        data_devolucao DATE NOT NULL,
        status_livro VARCHAR(20) NOT NULL -- PENDENTE, AO DEVOLVER, DEVOLVIDO
    );

CREATE TABLE
    IF NOT EXISTS c_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        autor TEXT NOT NULL,
        acao TINYTEXT NOT NULL,
        sujeito TINYTEXT NOT NULL,
        efetivado DATETIME NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS notificacoes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_aluno INT NOT NULL REFERENCES alunos (rm),
        id_emprestimo SMALLINT NOT NULL,
        data_envio DATETIME NOT NULL,
        iteracao INT (1) NOT NULL -- "Variavel de controle", Corresponde a quantidade de vezes de notificação enviadas ao pedido de devolução especifico
        -- Com o objetivo de manter o controle da ordem de envio das notificações.
        -- Exemplo: Foi enviada uma notificação hoje, valor: 1 para id de devolução #1234, amanhã será enviado outro
    );

CREATE TABLE
    IF NOT EXISTS coordenadores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome TINYTEXT NOT NULL,
        numero VARCHAR(12) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS curso_coordenadores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_curso INT REFERENCES cursos (id),
        id_coordenador INT REFERENCES coordenadores (id)
    );

CREATE TABLE
    IF NOT EXISTS avaliacoes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_livro INT NOT NULL REFERENCES livros (id),
        id_aluno INT NOT NULL REFERENCES alunos (rm),
        avaliacao float NOT NULL
    );


