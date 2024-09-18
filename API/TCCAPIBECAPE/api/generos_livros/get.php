<?php
$com = "";
$rs = "";

if(empty($param)){
	echo(json_encode(['status' => 'error', 'message'=>'Informe o campo ID']));
	die();
}

$com = 'SELECT GLI.id_livro, GLI.id_genero, li.titulo, g.genero FROM generos_livros AS GLI LEFT JOIN generos AS g ON GLI.id_genero = g.id LEFT JOIN livros AS li ON GLI.id_livro = li.id WHERE li.id = '.$param.';';


echo((new DB())->query($com));
