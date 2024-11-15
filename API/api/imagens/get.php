<?php


$search = $param . ' Livro Capa Alta qualidade';
$api_key = '';
$url = 'https://serpapi.com/search.json?q='. urlencode($search) .'&engine=google_images&ijn=0&api_key=' . $api_key;


if($action == 'buscar'){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$response = curl_exec($ch);
	curl_close($ch);
	$data = json_decode($response, true);
	
	if(empty($data) || empty($param)){
		echo(json_encode(['status' => 'error', 'message' => 'Parametro incorreto ou Erro na API']));
		die();
	}
	
	echo json_encode(['status' => 'success', 'message' => ['imagens' => [$data['images_results']['0']['original'], $data['images_results']['1']['original'], $data['images_results']['2']['original']]]]);
	
	die();
}
else{
	echo(json_encode(['status' => 'error', 'message' => 'Metodo não encontrado']));	
	die();
}




