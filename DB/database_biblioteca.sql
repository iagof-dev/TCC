create database if not exists sgbe;

use sgbe;

create table
    if not exists alunos (
        rm int (6) primary key auto_increment,
        nome tinytext not null,
        id_curso int not null,
        telefone char(12) not null unique
    );

create table
    if not exists cursos (
        id int primary key auto_increment,
        ano int not null,
        curso varchar(80) not null,
        periodo tinytext not null
    );

create table
    if not exists bibliotecarias (
    id int auto_increment primary key,
    nome tinytext not null
    );

create table
    if not exists livros (
        id int primary key auto_increment,
        codigo char(8) not null unique,
        titulo tinytext not null,
        autor tinytext not null,
        capa varchar(1) not null,
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
        id_livro int not null 
            REFERENCES livros (id),
        id_genero int not null 
            REFERENCES generos (id)
    );

create table
    if not exists emprestimos (
        id int auto_increment primary key,
        id_aluno int not null 
            REFERENCES alunos (rm),
        id_livro int not null 
            REFERENCES livros (id),
        data_aluguel date not null,
        data_devolucao date not null,
        status_livro varchar(60) not null
    );

create table
    if not exists c_logs (
        id int auto_increment primary key,
        autor tinytext not null,
        acao tinytext not null,
        sujeito tinytext not null,
        efetivado datetime not null
    );

create table
    if not exists notificacoes (
        id int primary key auto_increment,
        numero char(12) not null,
        id_emprestimo int not null,
        data_envio datetime not null,
        interacao int (1) not null -- Corresponde a quantidade de vezes de notificação enviadas ao pedido de devolução especifico
                                  -- Com o objetivo de manter o controle da ordem de envio das notificações.
                                  -- Exemplo: Foi enviada uma notificação hoje, valor: 1 para id de devolução #1234, amanhã será enviado outro
    );

create table
    if not exists coordenadores (
        id int primary key auto_increment,
        nome tinytext not null,
        numero char(12) not null unique,
    );

create table
    if not exists curso_coordenadores (
        id int primary key auto_increment,
        id_curso int REFERENCES cursos (id),
        id_coordenador int REFERENCES coordenadores (id)
    );

create table
    if not exists avaliacao (
        id int primary key auto_increment,
        id_livro int not null REFERENCES livros (id),
        avaliacao float not null
    );

