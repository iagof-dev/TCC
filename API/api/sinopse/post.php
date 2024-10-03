<?php

$com = "";
$message = "";

switch ($action) {
    default:
    case 'gerar':
        $verify = ["livro" => false, "autor" => false, 'caracteres' => false];
        $postvalue = ["livro" => '', "autor" => '', 'caracteres' => 0];
        foreach (array_keys($_POST) as $key) {
            if (array_key_exists($key, $verify)) {
                $verify[$key] = true;
                $postvalue[$key] = $_POST[$key];
            } else {
                echo (json_encode(["status" => "error", "message" => "um parâmetro inexistente foi enviado na requisição. [$key]"]));
                die();
            }
        }
        if (array_search(false, array_values($verify)) !== false) {
            echo (json_encode(["status" => "error", "message" => "um parâmetro obrigatório está faltando."]));
            die();
        }

        gerar:
		$gemini_api_key = "AIzaSyACpODdQcmGzh8tohEozvlpG722cw50NGg";
		$ai_model = "gemini-1.5-flash-latest";
		$url = 'https://generativelanguage.googleapis.com/v1beta/models/'. $ai_model .':generateContent?key=' . $gemini_api_key;
		$headers = ['Content-Type: application/json'];
		
		$data = [ "contents" => [ [ "parts" => [ [ "text" => "Você é um escritor de sinopses para livros, da nacionalidade brasileiro, você deverá criar uma sinopse detalhada sobre um livro que será especificado pelo usuário. sem sequências de escape ou formatação, sem palavras incompletas, respeitando a quantidade de caracteres dado pelo o usuário, você deve dar detalhes sobre o livro dizendo os personagens, etc. você deve entregar sinopse com continuidade, sem frases sem continuidade; Crie uma sinopse de '". $postvalue['livro'] ."' do autor '". $postvalue['autor'] ."' com ". $postvalue['caracteres'] ." caracteres." ] ] ] ] ];
		
		$ch = curl_init($url);
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		
		$response = curl_exec($ch);

		$responseData = json_decode($response, true);


        if(!isset($responseData['candidates']['0']['content'])){
            goto gerar;
        }

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            echo(json_encode(["status" => "error", "message" => "Houve erro na comunicação com API.", "details" => $error]));
            die();
        }
		if(!empty($responseData["error"])){
			echo (json_encode(['status' => 'error', 'message' => 'Houve um erro na resposta da API ('. $ai_model .')', 'total-used-tokens' => 0]));
			die();
		}

        echo(json_encode(['status' => 'success', 'ai_model' => $ai_model, 'message' => $responseData['candidates']['0']['content']['parts']['0']['text'], 'index' => $responseData['candidates']['0']['index'],'total-used-tokens' => $responseData['usageMetadata']['totalTokenCount']]));


        curl_close($ch);

    
        break;
}
