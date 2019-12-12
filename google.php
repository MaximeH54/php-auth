<?php

session_start();

header('Content-Type: application/json');

require_once 'vendor/autoload.php';

$clientId = '798194073310-46u2j7i62dopv0l5jffmb7nubn0stmeu.apps.googleusercontent.com'; // Id Client Google'

$idToken = isset($_POST['id_token']) ? (string) $_POST['id_token'] : null;

if (!$idToken) {
  http_response_code(406);
  echo json_encode([
    'error' => "Le token n'existe pas !",
  ]);
  die;
}

$userId = $payload['sub'];

$_SESSION['uid'] = $userId;
$_SESSION['name'] = $payload['name'];
$_SESSION['email'] = $payload['email'];
$_SESSION['picture'] = $payload['picture'];

echo json_encode($payload);


$client = new Google_Client([
  'client_id' => $clientId
]);

try {
  $payload = $client->verifyIdToken($idToken);
} catch (Exception $e) {
  http_response_code(401);
  echo json_encode([
    'error' => "Token invalidé !",
  ]);
  die;
}

$userId = $payload['sub'];

echo json_encode($payload);

 ?>
