<?php
$com = "";
$message = "";

switch ($action) {
    case 'criar':
        echo(json_encode(['status' => 'error', 'message' => 'Método removido.']));
        die();
    case 'modificar':
        $verify = ['id' => false, 'avaliacao' => false];
        $com = "UPDATE avaliacoes SET ";
        $setClauses = [];
        
        foreach ($_POST as $key => $value) {
            if (array_key_exists($key, $verify)) {
                $verify[$key] = true;
                if ($key !== 'id') {
                    $setClauses[] = "$key = '" . addslashes($value) . "'";
                }
            } else {
                echo(json_encode(["status" => "error", "message" => "Um parâmetro inexistente foi enviado na requisição."]));
                die();
            }
        }
        
        if (in_array(false, $verify)) {
            echo(json_encode(["status" => "error", "message" => "Um parâmetro obrigatório está faltando."]));
            die();
        }
        
        $com .= implode(', ', $setClauses);
        $com .= ' WHERE id=' . intval($_POST['id']) . ';'; 

        break;


    default:
        echo(json_encode(["status" => "error", "message" => "função não definida."]));
        break;
}
echo((new DB())->insert($com));
