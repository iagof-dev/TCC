<?php


//
//           'persistência transforma obstáculos em conquistas.' ~?????
//



header('Access-Control-Allow-Origin: *'); header('Content-type: application/json'); date_default_timezone_set("America/Sao_Paulo");header('Connection: close');


if (isset($_GET['path']) && $_GET['path'] !== "") { $path = explode("/", $_GET['path']); } else { echo json_encode(["status" => "error", "message" => "Sem parâmetros!"]); die(); } if (isset($path[0])) { $api = $path[0]; } if (isset($path[1])) { $action = $path[1]; } if (isset($path[2])) { $param = $path[2]; } if(isset($path[3])){ $param2 = $path[3]; } if ($api == '') { echo json_encode(["data" => "Especifique a função"]); }

//                $api   $action $param $param2
//    localhost/usuario/localizar/add/1

$method = $_SERVER['REQUEST_METHOD'];

//  Classes
include_once("classes/secret.php");include_once("classes/db.php");include_once("classes/usuario.php");

$db = (new DB());

//  API
include_once("./api/cursos/cursos.php");
include_once("./api/alunos/alunos.php");
include_once("./api/livros/livros.php");
include_once("./api/bibliotecarias/bibliotecarias.php");
include_once("./api/emprestimos/emprestimos.php");
include_once("./api/generos/generos.php");
include_once("./api/coordenadores/coordenadores.php");
include_once("./api/avaliacoes/avaliacoes.php");
include_once("./api/notificacoes/notificacoes.php");
include_once("./api/geral/geral.php");
include_once("./api/estado_emprestimos/estado_emprestimos.php");
include_once("./api/imagens/imagens.php");
include_once("./api/sinopse/sinopse.php");
include_once("./api/coordenador_cursos/coordenador_cursos.php");
include_once("./api/autores/autores.php");
include_once("./api/editoras/editoras.php");
include_once("./api/generos_livros/generos_livros.php");