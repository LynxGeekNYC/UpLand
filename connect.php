<?php

$url = 'https://api.upland.me/v1/collections/city/properties';
$params = array('limit' => 10, 'offset' => 0);

$access_token = 'YOUR_ACCESS_TOKEN';
$headers = array('Authorization: Bearer ' . $access_token);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url . '?' . http_build_query($params));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo json_encode(json_decode($response), JSON_PRETTY_PRINT);

?>
