<?php
error_reporting(-1);

include_once("db.php");

class cliente
{
	
	private $librarianID = -1;

    public function checkPermission()
    {
        //Token: c38a7e02bfca0da201015ce51931b09d462080b7

        if ($_POST['authpass'] == "c38a7e02bfca0da201015ce51931b09d462080b7" || !isset($_POST['authpass'])) {
            unset($_POST['authpass']);
            return true;
        }
        ob_clean();
		http_response_code(401);
        echo(json_encode(["status" => "error", "message"=>"token de autenticação inválido/inexistente."]));
        die();
    }
	
	//
	// TODO: Fazer front end enviar o id da bibliotecaria, para registrar nas logs
	//
	
	//
	// TODO 2: fazer checkPermission + checar metodo de envio (GET ou POST) no index.php
	// exemplo= /alunos/alunos.php, pegar todas as verificações do POST e colocar no index
	//
	// ↓↓↓↓ ESTE CÓDIGO ↓, MENCIONADO ACIMA ↑↑↑↑↑↑↑
	// if(!(new cliente())->checkPermission())
	//     {
	//         echo(json_encode(["status" => "error", "message" => "Sem permissão!"]));
	//         die();
	// 		http_response_code(401);
	//     }
	//     if (empty($_POST)) {
	//         echo (json_encode(["status" => "error", "message" => "Nenhum argumento foi passado"]));
	//         die();
	// 		http_response_code(400);
	//     }
	// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	
	function getLibrarianID(){
		return $this->$librarianID;	
	}
	function setLibrarianID($value){
		$this->$librarianID = $value;
	}
	
	
}
