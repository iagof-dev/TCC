<?php
$com = "";
$message = "";

switch ($action) {
    case 'modificar':
        $verify = ["id" => false, "id_status_emprestimo" => false];

        $com = "UPDATE emprestimos SET ";
        $setClauses = [];

        foreach ($_POST as $key => $value) {
            if (array_key_exists($key, $verify)) {
                $verify[$key] = true;
                if ($key !== 'id') {
                    $setClauses[] = "$key = '" . addslashes($value) . "'";
                }
            } else {
                echo (json_encode(["status" => "error", "message" => "Um parâmetro inexistente foi enviado na requisição."]));
                die();
            }
        }

        if (in_array(false, $verify)) {
            echo (json_encode(["status" => "error", "message" => "Um parâmetro obrigatório está faltando."]));
            die();
        }

        $com .= implode(', ', $setClauses);
        $com .= ' WHERE id=' . intval($_POST['id']) . ';';

        $estado_emprestimos = json_decode((new DB())->query('SELECT * FROM estado_emprestimos where ID="'. $_POST['id_status_emprestimo'] .'";'), true);
        if($estado_emprestimos['status'] != 'success'){
            echo(json_encode(['status' => 'error', 'message' => 'Estado de emprestimo não encontrado']));
            die();
        }

       
        if($estado_emprestimos['DATA']['0']['estado'] == 'devolvido'){
            $livros_data = json_decode((new DB())->query('SELECT lv.id as id_livro, lv.volumes_reservado FROM emprestimos AS lo INNER JOIN livros lv WHERE lv.id = lo.id_livro AND lo.id = '. $_POST['id'] .';'),true);
            $updated_value = $livros_data['DATA']['0']['volumes_reservado'] - 1;
            $com .= 'UPDATE livros SET volumes_reservado='. $updated_value . ' WHERE id=' . $livros_data['DATA']['0']['id_livro'] . ';';
        }

        break;

    case 'registrar':
        $verify = ["rm" => false, "id_livro" => false, "data_aluguel" => false, "id_status_emprestimo" => false, "prazo" => false];
        $temp_value = ["rm" => null, "id_livro" => null, "data_aluguel" => null, "id_status_emprestimo" => null, "prazo" => null];

        $com = "INSERT INTO emprestimos (";
        $valuesPart = "VALUES (";

        foreach ($_POST as $key => $value) {
            if (array_key_exists($key, $verify)) {
                $verify[$key] = true;
                $com .= $key . ",";
                $valuesPart .= "'" . $value . "',";
                $temp_value[$key] = $value;
            } else {
                echo json_encode(["status" => "error", "message" => "um parâmetro inexistente foi enviado na requisição."]);
                die();
            }
        }

        if (in_array(false, $verify)) {
            echo json_encode(["status" => "error", "message" => "um parâmetro obrigatório está faltando."]);
            die();
        }

        if($temp_value['data_aluguel'] == '0000-00-00'){
            echo(json_encode(['status' => 'error', 'message' => 'Data de Aluguel Inválida.']));
            die();
        }

        $com = rtrim($com, ",") . ") " . rtrim($valuesPart, ",") . ")";
        $com .= "; INSERT INTO avaliacoes values (default, LAST_INSERT_ID(),'". $temp_value['id_livro'] ."', '". $temp_value['rm'] ."', -1);";

        $verify_book = 'SELECT * FROM livros where id=' . $temp_value['id_livro'] . ';';
        $verify_data = json_decode((new DB())->query($verify_book), true);

        if($verify_data['status'] != 'success'){
            echo(json_encode(['status' => 'error', 'message' => 'Livro não encontrado']));
            die();
        }

        if($verify_data['DATA']['0']['volumes_reservado'] == $verify_data['DATA']['0']['volumes']){
            echo(json_encode(['status' => 'error', 'message' => 'Não há livros disponiveis']));
            die();
        }

        $new_value = $verify_data['DATA']['0']['volumes_reservado'] + 1;
        $com .= " UPDATE livros SET volumes_reservado = " . $new_value . " where ID=". $temp_value['id_livro'] . ";";
        break;
    case 'estender':
        if(empty($_POST['novo_prazo']) || empty($_POST['id_emprestimo'])){
            echo(json_encode(['status' => 'error', 'message' => 'Está faltando paramêtros necessários para concluir.']));
            die();
        }

        if($_POST['novo_prazo'] != 14){
            echo(json_encode(['status' => 'error', 'message' => 'Você não pode estender para ' . $_POST['novo_prazo'] . ' apenas poderá aumentar para 14.']));
            die();
        }

        $verification = 'SELECT * FROM emprestimos WHERE id=' . $_POST['id_emprestimo'] . ';';
        $isRenovavel = json_decode((new DB())->query($verification), true);
        if($isRenovavel['status'] != 'success'){
            echo(json_encode(['status' => 'error', 'message' => 'emprestimo não existe/encontrado.']));
            die();
        }

        if($isRenovavel['DATA']['0']['renovacao'] != 1){
            echo(json_encode(['status' => 'error', 'message' => 'Este emprestimo não é renovavel, necessita devolver.']));
            die();
        }

        $com = "UPDATE emprestimos SET prazo=". ($isRenovavel['DATA']['0']['prazo'] + $_POST['novo_prazo']) . ', renovacao=0 WHERE id=' . $_POST['id_emprestimo'] . ';';
        break;
}

echo ((new DB())->insert($com));