create database if not exists database_biblioteca;
use database_biblioteca;

create table if not exists alunos(
rm int(6) auto_increment,
nome varchar(40) not null,
ano int not null,
curso char(40) not null,
telefone char(11) not null unique, /*telefone tem o total de 11 números, inalteraveis*/
Primary key(rm)
);

create table if not exists bibliotecarias(
id int auto_increment,
funcionaria varchar(40),
primary key(id)
);

create table if not exists livros_info(
id int auto_increment,
codigo char(8) not null unique,
titulo varchar(40) not null,
autor varchar(40) not null,
capa_url text not null, /*atribua a URL da imagem*/
quantidade int not null,
sinopse text not null,
Primary key(id)
);

create table if not exists generos(
id int auto_increment,
tipo varchar(25) not null,
Primary key(id)
);

create table if not exists livro_com_generos(
id int auto_increment,
id_livro int not null,
id_genero int not null,
Primary key(id)
);

create table if not exists emprestimos_registros(
id int auto_increment,
id_aluno int not null,
id_livro int not null,
data_aluguel date not null,
data_devolucao date not null,
status_livro varchar(20) not null,
Primary key (id)
);
