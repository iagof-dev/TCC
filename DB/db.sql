create database if not exists sgbe;

use sgbe;

create table
    if not exists alunos (
        rm int (6) primary key auto_increment,
        nome mediumtext not null,
        id_curso int not null,
        telefone char(12) not null
    );

create table
    if not exists cursos (
        id int primary key auto_increment,
        ano int not null,
        curso tinytext not null,
        periodo tinytext not null
    );

create table
    if not exists bibliotecarias (id int auto_increment primary key, nome tinytext);

create table
    if not exists livros (
        id int primary key auto_increment,
        codigo int (32) not null unique,
        titulo mediumtext not null,
        autor mediumtext not null,
        capa varchar(1),
        volumes int not null,
        sinopse text not null
    );

create table
    if not exists generos (
        id int primary key auto_increment,
        genero varchar(120) not null
    );

create table
    if not exists livro_generos (
        id_livro int not null REFERENCES livros (id),
        id_genero int not null REFERENCES generos (id)
    );

create table
    if not exists emprestimos (
        id int auto_increment primary key,
        id_aluno int not null references alunos (rm),
        id_livro int not null references livros (id),
        data_aluguel date not null,
        data_devolucao date not null,
        status_livro varchar(20) not null -- PENDENTE, AO DEVOLVER, DEVOLVIDO
    );

create table
    if not exists c_logs (
        id int auto_increment primary key,
        autor text not null,
        acao tinytext not null,
        sujeito tinytext not null,
        efetivado datetime not null
    );

create table
    if not exists notificacoes (
        id int primary key auto_increment,
        numero varchar(20) not null,
        id_emprestimo smallint not null,
        data_envio datetime not null,
        iteracao int (1) not null -- "Variavel de controle", Corresponde a quantidade de vezes de notificação enviadas ao pedido de devolução especifico
        -- Com o objetivo de manter o controle da ordem de envio das notificações.
        -- Exemplo: Foi enviada uma notificação hoje, valor: 1 para id de devolução #1234, amanhã será enviado outro
    );

create table
    if not exists coordenadores (
        id int primary key auto_increment,
        nome tinytext not null,
        numero varchar(12) not null,
    );

create table
    if not exists curso_coordenadores (
        id int primary key auto_increment,
        id_curso int REFERENCES cursos (id),
        id_coordenador int REFERENCES coordenadores (id)
    );

create table
    if not exists avaliacoes (
        id int primary key auto_increment,
        id_livro int not null REFERENCES livros (id),
        id_aluno int not null REFERENCES alunos (rm),
        avaliacao float not null
    );
