<?php
$com = "";
$message = "";

switch ($action) {
    case 'adicionar':

        $verify = ["nome" => false];
        
        $com = "INSERT INTO autores (";
        foreach (array_keys($_POST) as $key) {

            if(array_key_exists($key, $verify)){
                $verify[$key] = true;
                $com .= $key . ",";
            }
            else{ echo(json_encode(["status" => "error", "message" => "um parâmetro inexistente foi enviado na requisição."])); die(); }
        }
        if (array_search(false, array_values($verify)) !== false) { echo(json_encode(["status" => "error", "message" => "um parâmetro obrigatório está faltando."])); die(); }


        $com = substr_replace($com, "", -1) . ") VALUES (";
        foreach (array_values($_POST) as $value) {
            $com .= "'" . $value . "',";
        }
        $com = substr_replace($com, "", -1) . ");";


        break;
}


echo((new db())->insert($com));