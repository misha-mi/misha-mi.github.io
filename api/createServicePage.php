<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Если это запрос типа OPTIONS, завершите выполнение без обработки.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$_POST = json_decode( file_get_contents("php://input"), true );
$newFile = "../service-pages/" . $_POST["name"] . ".html";

if (file_exists($newFile)) {
    header("HTTP/1.0 400 Bad Request");
} else {
    fopen($newFile, "w");
}